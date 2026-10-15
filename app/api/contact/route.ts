import { NextResponse } from "next/server";

let CONTACT_STORE: any[] = [
  {
    id: "MSG-SAS-901",
    name: "Rajesh Soni",
    phone: "9826112233",
    email: "rajesh.soni@example.com",
    subject: "Alumni Connection",
    message: "Alumnus of Class of 2004 requesting school archive visit.",
    submittedAt: "2026-10-10T09:00:00.000Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    messages: CONTACT_STORE,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, Mobile Phone, and Message are required." },
        { status: 400 }
      );
    }

    const messageId = `MSG-SAS-${Math.floor(100 + Math.random() * 900)}`;
    const newMsg = {
      id: messageId,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || "",
      subject: subject || "General Enquiry",
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    CONTACT_STORE.unshift(newMsg);

    return NextResponse.json(
      {
        success: true,
        messageId,
        message: "Your message has been delivered to the school administration.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error processing contact submission." },
      { status: 500 }
    );
  }
}
