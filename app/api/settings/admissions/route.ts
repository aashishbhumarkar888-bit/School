import { NextRequest, NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/server/db";
import { sanitizeText } from "@/lib/server/security";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    return NextResponse.json({
      success: true,
      settings: db.admissionSettings,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch admission settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { activeSession, registrationOpenDate, officeHours, locationText, midSessionStatusNotice, proformaFee } = body;

    const db = getDb();
    db.admissionSettings = {
      activeSession: sanitizeText(activeSession || db.admissionSettings.activeSession),
      registrationOpenDate: sanitizeText(registrationOpenDate || db.admissionSettings.registrationOpenDate),
      officeHours: sanitizeText(officeHours || db.admissionSettings.officeHours),
      locationText: sanitizeText(locationText || db.admissionSettings.locationText),
      midSessionStatusNotice: sanitizeText(midSessionStatusNotice || db.admissionSettings.midSessionStatusNotice),
      proformaFee: sanitizeText(proformaFee || db.admissionSettings.proformaFee),
    };

    saveDb(db);
    return NextResponse.json({ success: true, settings: db.admissionSettings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update admission settings" }, { status: 500 });
  }
}
