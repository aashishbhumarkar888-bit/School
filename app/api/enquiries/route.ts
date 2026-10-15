import { NextResponse } from "next/server";

// In-memory persistent queue for the running server instance
let ENQUIRIES_STORE: any[] = [
  {
    id: "SAS-ADM-2026-1042",
    parentName: "Sanjay Verma",
    phone: "9826011223",
    email: "sanjay.verma@example.com",
    childName: "Ananya Verma",
    targetClass: "KG-1",
    message: "Enquiring about admission proforma and bus transport routes near Shivaji Nagar.",
    submittedAt: "2026-10-12T10:30:00.000Z",
    status: "new",
  },
  {
    id: "SAS-ADM-2026-1043",
    parentName: "Dr. Meenakshi Sharma",
    phone: "9425098765",
    email: "meenakshi.s@example.com",
    childName: "Ishaan Sharma",
    targetClass: "Class I",
    message: "Candidate has completed UKG and will be 5.5 years in June.",
    submittedAt: "2026-10-13T14:15:00.000Z",
    status: "scheduled",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: ENQUIRIES_STORE.length,
    enquiries: ENQUIRIES_STORE,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { parentName, phone, email, childName, targetClass, message } = body;

    // Strict validation
    if (!parentName?.trim() || !phone?.trim() || !childName?.trim()) {
      return NextResponse.json(
        { error: "Parent Name, Mobile Phone, and Child Name are mandatory." },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile contact number." },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const enquiryId = `SAS-ADM-2026-${randomSuffix}`;

    const newEnquiry = {
      id: enquiryId,
      parentName: parentName.trim(),
      phone: cleanPhone,
      email: email?.trim() || "",
      childName: childName.trim(),
      targetClass: targetClass || "Nursery",
      message: message?.trim() || "",
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    ENQUIRIES_STORE.unshift(newEnquiry);

    return NextResponse.json(
      {
        success: true,
        enquiryId,
        message: "Enquiry logged successfully. School Office will contact during 8:00 AM – 1:00 PM.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error processing admission enquiry." },
      { status: 500 }
    );
  }
}
