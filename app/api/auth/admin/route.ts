import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/server/db";
import {
  sanitizeInput,
  checkRateLimit,
  verifySecret,
  generateToken,
} from "@/lib/server/security";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many admin sign-in attempts. Please wait 1 minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const emailOrUsername = sanitizeInput(body.emailOrUsername);
    const password = sanitizeInput(body.password);

    if (!emailOrUsername || !password) {
      return NextResponse.json(
        { error: "Administrator ID/Email and Passcode are required." },
        { status: 400 }
      );
    }

    const db = getDb();
    const admin = db.admins.find(
      (a) =>
        a.username.toLowerCase() === emailOrUsername.toLowerCase() ||
        a.email.toLowerCase() === emailOrUsername.toLowerCase()
    );

    if (!admin) {
      return NextResponse.json(
        { error: "Administrator credential not recognized." },
        { status: 401 }
      );
    }

    const isValid = verifySecret(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid administrative security passcode." },
        { status: 401 }
      );
    }

    const token = generateToken({
      type: "admin",
      username: admin.username,
      role: admin.role,
      name: admin.name,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    const response = NextResponse.json({
      authenticated: true,
      admin: {
        username: admin.username,
        email: admin.email,
        role: admin.role,
        name: admin.name,
      },
    });

    // Set HttpOnly, SameSite=Strict admin cookie
    response.cookies.set("sas_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (err) {
    console.error("Admin auth error:", err);
    return NextResponse.json(
      { error: "Internal server error during admin authentication." },
      { status: 500 }
    );
  }
}
