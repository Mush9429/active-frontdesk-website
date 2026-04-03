import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { pin } = await request.json();
  const adminPin = process.env.ADMIN_PIN || "1234";

  if (pin === adminPin) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
}
