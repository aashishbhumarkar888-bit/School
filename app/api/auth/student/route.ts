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
        { error: "Too many authentication attempts. Please wait 1 minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const identifier = sanitizeInput(body.identifier);
    const secret = sanitizeInput(body.secret);

    if (!identifier || !secret) {
      return NextResponse.json(
        { error: "Scholar ID / Roll No and Password / DOB are required." },
        { status: 400 }
      );
    }

    const db = getDb();
    const student = db.students.find(
      (s) =>
        s.scholarId.toLowerCase() === identifier.toLowerCase() ||
        s.rollNumber === identifier
    );

    if (!student) {
      return NextResponse.json(
        { error: "Scholar ID or Roll Number not found in campus directory." },
        { status: 401 }
      );
    }

    // Verify against password hash OR plain Date of Birth (YYYY-MM-DD)
    const isPasswordValid = verifySecret(secret, student.passwordHash);
    const isDobValid = student.dob === secret;

    if (!isPasswordValid && !isDobValid) {
      return NextResponse.json(
        { error: "Incorrect password or Date of Birth. Format for DOB: YYYY-MM-DD" },
        { status: 401 }
      );
    }

    // Generate signed session token
    const token = generateToken({
      type: "student",
      scholarId: student.scholarId,
      name: student.name,
      house: student.house,
      classSection: student.classSection,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const response = NextResponse.json({
      authenticated: true,
      student: {
        scholarId: student.scholarId,
        rollNumber: student.rollNumber,
        name: student.name,
        classSection: student.classSection,
        house: student.house,
        attendance: student.attendance,
        overallScore: student.overallScore,
        dob: student.dob,
        termMarks: student.termMarks,
        feeStatus: student.feeStatus,
        libraryBooks: student.libraryBooks,
        assignments: student.assignments,
      },
    });

    // Set HttpOnly, SameSite=Lax session cookie
    response.cookies.set("sas_student_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err) {
    console.error("Student login error:", err);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
