import { NextRequest, NextResponse } from "next/server";
import { getDb, saveDb, StudentRecord } from "@/lib/server/db";
import {
  sanitizeInput,
  checkRateLimit,
  hashSecret,
  generateToken,
} from "@/lib/server/security";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait 1 minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const name = sanitizeInput(body.name);
    const scholarId = sanitizeInput(body.scholarId).toUpperCase();
    const classSection = sanitizeInput(body.classSection);
    const house = sanitizeInput(body.house).toLowerCase() as
      | "teresa"
      | "amartya"
      | "tagore"
      | "raman";
    const dob = sanitizeInput(body.dob); // YYYY-MM-DD
    const password = sanitizeInput(body.password);

    if (!name || !scholarId || !classSection || !house || !dob || !password) {
      return NextResponse.json(
        { error: "All registration fields are required." },
        { status: 400 }
      );
    }

    if (!["teresa", "amartya", "tagore", "raman"].includes(house)) {
      return NextResponse.json(
        { error: "Invalid house selection. Must be Teresa, Amartya, Tagore, or Raman." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const db = getDb();
    const existing = db.students.find(
      (s) => s.scholarId.toLowerCase() === scholarId.toLowerCase()
    );

    if (existing) {
      return NextResponse.json(
        { error: "Scholar ID is already registered. Please sign in directly." },
        { status: 409 }
      );
    }

    const rollNo = scholarId.replace(/\D/g, "").slice(-4) || `${Math.floor(1000 + Math.random() * 9000)}`;

    const newStudent: StudentRecord = {
      scholarId,
      rollNumber: rollNo,
      dob,
      passwordHash: hashSecret(password),
      name,
      classSection,
      house,
      attendance: 98.2,
      overallScore: 92.5,
      termMarks: {
        term1: { total: 460, max: 500, percentage: 92.0 },
        term2: { total: 465, max: 500, percentage: 93.0 },
        term3: { total: 462, max: 500, percentage: 92.4 },
      },
      feeStatus: { term1: "Paid", term2: "Paid", term3: "Paid" },
      libraryBooks: [
        { title: "Savitri — Sri Aurobindo", issueDate: "2026-10-01", dueDate: "2026-10-25" },
      ],
      assignments: [
        { title: "Science Working Model Project", subject: "Integrated Science", status: "Submitted", dueDate: "2026-10-30" },
      ],
      createdAt: new Date().toISOString(),
    };

    db.students.push(newStudent);
    saveDb(db);

    const token = generateToken({
      type: "student",
      scholarId: newStudent.scholarId,
      name: newStudent.name,
      house: newStudent.house,
      classSection: newStudent.classSection,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    const response = NextResponse.json({
      success: true,
      authenticated: true,
      student: {
        scholarId: newStudent.scholarId,
        rollNumber: newStudent.rollNumber,
        name: newStudent.name,
        classSection: newStudent.classSection,
        house: newStudent.house,
        attendance: newStudent.attendance,
        overallScore: newStudent.overallScore,
        dob: newStudent.dob,
        termMarks: newStudent.termMarks,
        feeStatus: newStudent.feeStatus,
        libraryBooks: newStudent.libraryBooks,
        assignments: newStudent.assignments,
      },
    });

    response.cookies.set("sas_student_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err) {
    console.error("Student registration error:", err);
    return NextResponse.json(
      { error: "Internal server error during account activation." },
      { status: 500 }
    );
  }
}
