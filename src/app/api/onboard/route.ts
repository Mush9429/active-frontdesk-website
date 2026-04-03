import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const required = ["businessName", "contactName", "contactEmail", "contactPhone", "businessPhone", "industry"];
    const missing = required.filter((field) => !data[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // Save submission to /content/onboarding/ as JSON
    const submissionsDir = path.join(process.cwd(), "content", "onboarding");
    await mkdir(submissionsDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const slug = data.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const filename = `${slug}-${timestamp}.json`;

    await writeFile(
      path.join(submissionsDir, filename),
      JSON.stringify(
        {
          ...data,
          submittedAt: new Date().toISOString(),
          status: "pending",
        },
        null,
        2
      )
    );

    return NextResponse.json({
      success: true,
      message: "Onboarding form submitted successfully.",
      reference: filename,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process submission." },
      { status: 500 }
    );
  }
}
