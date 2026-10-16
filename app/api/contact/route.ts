import { NextRequest, NextResponse } from "next/server";
import { getDb, saveDb, ContactMessage } from "@/lib/server/db";
import {
  sanitizeInput,
  checkRateLimit,
  isValidPhone,
  isValidEmail,
} from "@/lib/server/security";

export async function GET() {
  const db = getDb();
  return NextResponse.json({
    success: true,
    count: db.contacts.length,
    messages: db.contacts,
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait 1 minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const name = sanitizeInput(body.name);
    const phone = sanitizeInput(body.phone);
    const email = sanitizeInput(body.email);
    const subject = sanitizeInput(body.subject || "Campus Visit & General Inquiry");
    const message = sanitizeInput(body.message);

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, Mobile Contact, and Message are required." },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile contact number." },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const referenceNo = `MSG-SAS-${Math.floor(100 + Math.random() * 900)}`;
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      referenceNo,
      name,
      phone,
      email,
      subject,
      message,
      status: "Unread",
      createdAt: new Date().toISOString(),
    };

    const db = getDb();
    db.contacts.unshift(newMsg);
    saveDb(db);

    return NextResponse.json(
      {
        success: true,
        referenceNo,
        message: "Your message has been delivered to the administrative office at Auro Mandir Parisar.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { error: "Internal server error processing contact submission." },
      { status: 500 }
    );
  }
}
