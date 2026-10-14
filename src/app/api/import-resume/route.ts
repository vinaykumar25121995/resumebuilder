import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  extractTextFromPDF,
  extractTextFromDOCX,
  parseResumeWithAI,
} from "@/lib/resume-parser";

export const runtime = "nodejs";
export const maxDuration = 60;

// Max file size: 15MB
const MAX_SIZE = 15 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const fileName = file.name.toLowerCase();
    const isPDF = fileName.endsWith(".pdf");
    const isDOCX = fileName.endsWith(".docx") || fileName.endsWith(".doc");

    if (!isPDF && !isDOCX) {
      return NextResponse.json(
        { error: "Unsupported file format. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum file size is 15MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Create a pending import record
    const importRecord = await prisma.resumeImport.create({
      data: {
        userId: session.user.id,
        originalFileName: file.name,
        fileType: isPDF ? "pdf" : "docx",
        fileSize: file.size,
        status: "pending",
      },
    });

    // Extract raw text
    let rawText = "";
    let pageCount = 1;
    let isImageBased = false;

    try {
      if (isPDF) {
        const extracted = await extractTextFromPDF(buffer);
        rawText = extracted.text;
        pageCount = extracted.pageCount;
        isImageBased = extracted.isImageBased;
      } else {
        const extracted = await extractTextFromDOCX(buffer);
        rawText = extracted.text;
      }
    } catch (err: any) {
      // Handle specific errors
      if (err.message === "PDF_PASSWORD_PROTECTED") {
        await prisma.resumeImport.update({
          where: { id: importRecord.id },
          data: {
            status: "failed",
            errorMessage: "This PDF is password-protected. Please upload an unlocked version.",
          },
        });
        return NextResponse.json(
          { error: "This PDF is password-protected. Please upload an unlocked version." },
          { status: 422 }
        );
      }
      await prisma.resumeImport.update({
        where: { id: importRecord.id },
        data: {
          status: "failed",
          errorMessage: "Could not read the document. The file may be corrupted or in an unsupported format.",
        },
      });
      return NextResponse.json(
        { error: "Could not read the document. The file may be corrupted or in an unsupported format." },
        { status: 422 }
      );
    }

    // Verify we have sufficient text
    if (!rawText || rawText.trim().length < 50) {
      await prisma.resumeImport.update({
        where: { id: importRecord.id },
        data: {
          status: "failed",
          errorMessage: isImageBased
            ? "This resume appears to contain scanned/image-based content. Please upload a text-based PDF."
            : "The document appears to be empty or contains very little text.",
        },
      });
      return NextResponse.json(
        {
          error: isImageBased
            ? "This resume appears to contain scanned/image-based content. Please upload a text-based PDF or DOCX."
            : "The document appears to be empty or contains very little extractable text.",
          isImageBased,
        },
        { status: 422 }
      );
    }

    // AI structured extraction
    let extracted;
    try {
      extracted = await parseResumeWithAI(rawText);
    } catch (err: any) {
      await prisma.resumeImport.update({
        where: { id: importRecord.id },
        data: {
          status: "failed",
          errorMessage: "AI extraction failed. Please try again.",
        },
      });
      return NextResponse.json(
        { error: "AI extraction failed. Please try again." },
        { status: 500 }
      );
    }

    // Save completed import record
    await prisma.resumeImport.update({
      where: { id: importRecord.id },
      data: {
        extractedText: rawText.substring(0, 50000), // Store first 50k chars
        extractedData: JSON.stringify(extracted),
        qualityScore: extracted.qualityScore,
        status: "completed",
      },
    });

    return NextResponse.json({
      importId: importRecord.id,
      extracted,
      pageCount,
      isImageBased,
      fileName: file.name,
      qualityScore: extracted.qualityScore,
    });
  } catch (err: any) {
    console.error("Resume import error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const imports = await prisma.resumeImport.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      originalFileName: true,
      fileType: true,
      fileSize: true,
      qualityScore: true,
      status: true,
      errorMessage: true,
      createdAt: true,
    },
  });

  return NextResponse.json(imports);
}
