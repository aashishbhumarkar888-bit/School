import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    return NextResponse.json({
      success: true,
      registrationFee: "₹100 (Verified)",
      schedule: db.feeSchedule,
      settings: db.admissionSettings,
      disclaimer:
        "In strict compliance with school guidelines, only confirmed figures are published. Class-wise tuition and admission fees are governed by the approved attached schedule issued at the School Office (8:00 AM – 1:00 PM).",
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch fee schedule" }, { status: 500 });
  }
}
