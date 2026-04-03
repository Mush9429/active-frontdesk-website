import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Active FrontDesk | Never Miss a Call Again",
  description:
    "Active FrontDesk answers every call, books every job, and follows up every lead — 24/7. Built for tradies, restaurants, and service businesses across Australia.",
  keywords:
    "call answering service, missed call recovery, tradie booking system, restaurant call answering, 24/7 receptionist, virtual receptionist Australia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth`}>
      <body className="min-h-screen antialiased bg-[#0A0A0B] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
