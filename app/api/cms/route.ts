import { NextRequest, NextResponse } from "next/server";
import { getDb, saveDb, FeeScheduleItem, AdmissionSettings, NoticeRecord, EventRecord, GalleryItemRecord, AchievementItemRecord } from "@/lib/server/db";
import { checkRateLimit, sanitizeText } from "@/lib/server/security";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    return NextResponse.json({
      success: true,
      data: {
        feeSchedule: db.feeSchedule,
        admissionSettings: db.admissionSettings,
        notices: db.notices,
        events: db.events,
        galleryItems: db.galleryItems,
        achievements: db.achievements,
        housePoints: db.housePoints,
        enquiries: db.enquiries,
        contacts: db.contacts,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch CMS data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    if (!checkRateLimit(`cms-write:${ip}`, 100, 60000)) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again shortly." }, { status: 429 });
    }

    const body = await req.json();
    const { action, payload } = body;

    const db = getDb();

    switch (action) {
      // 1. Fee Schedule Manager
      case "update_fee": {
        const { id, registrationFee, admissionFee, tuitionFee, annualCharges, transportCharges, verificationStatus } = payload;
        const index = db.feeSchedule.findIndex((f) => f.id === id);
        if (index === -1) {
          return NextResponse.json({ error: "Fee item not found" }, { status: 404 });
        }
        db.feeSchedule[index] = {
          ...db.feeSchedule[index],
          registrationFee: sanitizeText(registrationFee || db.feeSchedule[index].registrationFee),
          admissionFee: sanitizeText(admissionFee || db.feeSchedule[index].admissionFee),
          tuitionFee: sanitizeText(tuitionFee || db.feeSchedule[index].tuitionFee),
          annualCharges: sanitizeText(annualCharges || db.feeSchedule[index].annualCharges),
          transportCharges: sanitizeText(transportCharges || db.feeSchedule[index].transportCharges),
          verificationStatus: verificationStatus || db.feeSchedule[index].verificationStatus,
          updatedAt: new Date().toISOString().split("T")[0],
        };
        saveDb(db);
        return NextResponse.json({ success: true, item: db.feeSchedule[index] });
      }

      // 2. Admission Dates & Session Settings
      case "update_admission_settings": {
        const { activeSession, registrationOpenDate, officeHours, locationText, midSessionStatusNotice, proformaFee } = payload;
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
      }

      // 3. Notices & Circulars
      case "create_notice": {
        const { title, category, date, priority, body: noticeBody, pinned } = payload;
        const newNotice: NoticeRecord = {
          id: `not-${Date.now()}`,
          code: `SAS/CIR/${new Date().getFullYear()}/${db.notices.length + 1}`,
          title: sanitizeText(title),
          category: category || "General",
          date: date || new Date().toISOString().split("T")[0],
          priority: priority || "Normal",
          body: sanitizeText(noticeBody),
          pinned: !!pinned,
        };
        db.notices.unshift(newNotice);
        saveDb(db);
        return NextResponse.json({ success: true, notice: newNotice });
      }

      case "update_notice": {
        const { id, title, category, date, priority, body: noticeBody, pinned } = payload;
        const index = db.notices.findIndex((n) => n.id === id);
        if (index === -1) return NextResponse.json({ error: "Notice not found" }, { status: 404 });
        db.notices[index] = {
          ...db.notices[index],
          title: sanitizeText(title || db.notices[index].title),
          category: category || db.notices[index].category,
          date: date || db.notices[index].date,
          priority: priority || db.notices[index].priority,
          body: sanitizeText(noticeBody || db.notices[index].body),
          pinned: pinned !== undefined ? !!pinned : db.notices[index].pinned,
        };
        saveDb(db);
        return NextResponse.json({ success: true, notice: db.notices[index] });
      }

      case "delete_notice": {
        const { id } = payload;
        db.notices = db.notices.filter((n) => n.id !== id);
        saveDb(db);
        return NextResponse.json({ success: true });
      }

      // 4. Events & Three-Term Calendar
      case "create_event": {
        const { title, date, term, location, summary } = payload;
        const newEvent: EventRecord = {
          id: `evt-${Date.now()}`,
          title: sanitizeText(title),
          date: sanitizeText(date),
          term: term || "First Term",
          location: sanitizeText(location || "Campus Parisar"),
          summary: sanitizeText(summary),
        };
        db.events.push(newEvent);
        saveDb(db);
        return NextResponse.json({ success: true, event: newEvent });
      }

      case "update_event": {
        const { id, title, date, term, location, summary } = payload;
        const index = db.events.findIndex((e) => e.id === id);
        if (index === -1) return NextResponse.json({ error: "Event not found" }, { status: 404 });
        db.events[index] = {
          ...db.events[index],
          title: sanitizeText(title || db.events[index].title),
          date: sanitizeText(date || db.events[index].date),
          term: term || db.events[index].term,
          location: sanitizeText(location || db.events[index].location),
          summary: sanitizeText(summary || db.events[index].summary),
        };
        saveDb(db);
        return NextResponse.json({ success: true, event: db.events[index] });
      }

      case "delete_event": {
        const { id } = payload;
        db.events = db.events.filter((e) => e.id !== id);
        saveDb(db);
        return NextResponse.json({ success: true });
      }

      // 5. Gallery & Media Manager
      case "create_gallery": {
        const { title, category, imageUrl, caption, featured } = payload;
        const newGal: GalleryItemRecord = {
          id: `gal-${Date.now()}`,
          title: sanitizeText(title),
          category: category || "Campus & Parisar",
          imageUrl: imageUrl || "/images/official/society.jpg",
          caption: sanitizeText(caption),
          featured: !!featured,
        };
        db.galleryItems.push(newGal);
        saveDb(db);
        return NextResponse.json({ success: true, item: newGal });
      }

      case "update_gallery": {
        const { id, title, category, imageUrl, caption, featured } = payload;
        const index = db.galleryItems.findIndex((g) => g.id === id);
        if (index === -1) return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
        db.galleryItems[index] = {
          ...db.galleryItems[index],
          title: sanitizeText(title || db.galleryItems[index].title),
          category: category || db.galleryItems[index].category,
          imageUrl: imageUrl || db.galleryItems[index].imageUrl,
          caption: sanitizeText(caption || db.galleryItems[index].caption),
          featured: featured !== undefined ? !!featured : db.galleryItems[index].featured,
        };
        saveDb(db);
        return NextResponse.json({ success: true, item: db.galleryItems[index] });
      }

      case "delete_gallery": {
        const { id } = payload;
        db.galleryItems = db.galleryItems.filter((g) => g.id !== id);
        saveDb(db);
        return NextResponse.json({ success: true });
      }

      // 6. House Points & Achievements
      case "update_house_points": {
        const { teresa, amartya, tagore, raman } = payload;
        db.housePoints = {
          teresa: Number(teresa) || db.housePoints.teresa,
          amartya: Number(amartya) || db.housePoints.amartya,
          tagore: Number(tagore) || db.housePoints.tagore,
          raman: Number(raman) || db.housePoints.raman,
        };
        saveDb(db);
        return NextResponse.json({ success: true, housePoints: db.housePoints });
      }

      case "create_achievement": {
        const { title, category, yearOrTerm, description, verifiedStatus } = payload;
        const newAch: AchievementItemRecord = {
          id: `ach-${Date.now()}`,
          title: sanitizeText(title),
          category: category || "Institutional Milestone",
          yearOrTerm: sanitizeText(yearOrTerm || "Academic Session"),
          description: sanitizeText(description),
          verifiedStatus: sanitizeText(verifiedStatus || "Confirmed by SAEC Office"),
        };
        db.achievements.push(newAch);
        saveDb(db);
        return NextResponse.json({ success: true, achievement: newAch });
      }

      case "delete_achievement": {
        const { id } = payload;
        db.achievements = db.achievements.filter((a) => a.id !== id);
        saveDb(db);
        return NextResponse.json({ success: true });
      }

      // 7. Admission Enquiries Management
      case "update_enquiry_status": {
        const { id, status, notes } = payload;
        const index = db.enquiries.findIndex((e) => e.id === id);
        if (index === -1) return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
        db.enquiries[index].status = status;
        if (notes !== undefined) db.enquiries[index].notes = sanitizeText(notes);
        saveDb(db);
        return NextResponse.json({ success: true, enquiry: db.enquiries[index] });
      }

      case "delete_enquiry": {
        const { id } = payload;
        db.enquiries = db.enquiries.filter((e) => e.id !== id);
        saveDb(db);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err: any) {
    console.error("CMS API error:", err);
    return NextResponse.json({ error: err.message || "Failed to process CMS request" }, { status: 500 });
  }
}
