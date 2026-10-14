import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // In production, send via email provider (e.g. Resend / SendGrid) or log to database
    console.log(`[Contact Form Received] From: ${name} <${email}> | Subject: ${subject || "General"}`);
    console.log(`[Contact Message]: ${message}`);

    return NextResponse.json({
      success: true,
      message:
        "Thank you for contacting us! We have received your inquiry and our team will get back to you within 24 hours.",
    });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email support@atsresumebuilder.com directly." },
      { status: 500 }
    );
  }
}
