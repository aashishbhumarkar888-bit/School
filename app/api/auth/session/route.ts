import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/server/security";
import { getDb } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const studentCookie = req.cookies.get("sas_student_session")?.value;
    const adminCookie = req.cookies.get("sas_admin_session")?.value;

    let studentData = null;
    let adminData = null;

    if (studentCookie) {
      const payload = verifyToken<{ type: string; scholarId: string }>(studentCookie);
      if (payload && payload.type === "student") {
        const db = getDb();
        const found = db.students.find(
          (s) => s.scholarId.toLowerCase() === payload.scholarId.toLowerCase()
        );
        if (found) {
          studentData = {
            scholarId: found.scholarId,
            rollNumber: found.rollNumber,
            name: found.name,
            classSection: found.classSection,
            house: found.house,
            attendance: found.attendance,
            overallScore: found.overallScore,
            dob: found.dob,
            termMarks: found.termMarks,
            feeStatus: found.feeStatus,
            libraryBooks: found.libraryBooks,
            assignments: found.assignments,
          };
        }
      }
    }

    if (adminCookie) {
      const payload = verifyToken<{ type: string; username: string; role: string; name: string }>(adminCookie);
      if (payload && payload.type === "admin") {
        adminData = {
          username: payload.username,
          role: payload.role,
          name: payload.name,
        };
      }
    }

    return NextResponse.json({
      authenticated: Boolean(studentData || adminData),
      student: studentData,
      admin: adminData,
    });
  } catch (err) {
    console.error("Session check error:", err);
    return NextResponse.json({ authenticated: false, student: null, admin: null });
  }
}
