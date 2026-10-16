import { NextRequest, NextResponse } from "next/server";
import { getDb, saveDb, AdmissionEnquiry } from "@/lib/server/db";
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
    count: db.enquiries.length,
    enquiries: db.enquiries,
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many enquiry submissions. Please wait 1 minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parentName = sanitizeInput(body.parentName);
    const phone = sanitizeInput(body.phone);
    const email = sanitizeInput(body.email);
    const childName = sanitizeInput(body.childName || body.studentName);
    const dob = sanitizeInput(body.dob || "2022-01-01");
    const targetClass = sanitizeInput(body.targetClass || "Nursery");
    const notes = sanitizeInput(body.notes || body.message);

    if (!parentName || !phone || !childName) {
      return NextResponse.json(
        { error: "Parent Name, Mobile Contact, and Child Name are mandatory." },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Please provide a valid Indian 10-digit mobile contact number." },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNo = `SAS-ADM-2026-${randomSuffix}`;

    const newEnquiry: AdmissionEnquiry = {
      id: `enq-${Date.now()}`,
      referenceNo,
      studentName: childName,
      dob,
      targetClass,
      parentName,
      phone,
      email,
      status: "New Enquiry",
      notes: notes || "Submitted via Online Admission Concierge",
      createdAt: new Date().toISOString(),
    };

    const db = getDb();
    db.enquiries.unshift(newEnquiry);
    saveDb(db);

    return NextResponse.json(
      {
        success: true,
        referenceNo,
        message: "Enquiry logged successfully. School Office will contact during 8:00 AM – 1:00 PM.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Enquiries POST error:", err);
    return NextResponse.json(
      { error: "Internal server error processing admission enquiry." },
      { status: 500 }
    );
  }
}
