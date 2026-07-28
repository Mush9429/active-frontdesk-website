"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CALENDLY_URL } from "@/lib/constants";
import HeroCallAnimation from "./HeroCallAnimation";

export default function Hero() {
  const ref = useScrollAnimation();

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background glow */}
      <div className="hero-glow absolute inset-0 pointer-events-none" />

      {/* Slow-drifting wave lines — decorative, respects prefers-reduced-motion (see globals.css) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="hero-wave hero-wave-1"
          d="M-100,120 C 200,50 400,190 700,120 S 1100,50 1540,120"
          stroke="#2563EB"
          strokeOpacity="0.10"
          strokeWidth="1.5"
        />
        <path
          className="hero-wave hero-wave-2"
          d="M-100,220 C 250,290 450,150 750,220 S 1150,290 1540,220"
          stroke="#059669"
          strokeOpacity="0.08"
          strokeWidth="1.5"
        />
        <path
          className="hero-wave hero-wave-3"
          d="M-100,330 C 200,260 500,400 800,330 S 1200,260 1540,330"
          stroke="#2563EB"
          strokeOpacity="0.07"
          strokeWidth="1.5"
        />
        <path
          className="hero-wave hero-wave-4"
          d="M-100,430 C 300,360 500,500 800,430 S 1200,360 1540,430"
          stroke="#059669"
          strokeOpacity="0.06"
          strokeWidth="1.5"
        />
      </svg>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={ref} className="fade-in-section text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F8FAFC] text-[#475569] text-xs font-medium px-4 py-2 rounded-full mb-8 border border-[#E2E8F0]">
              <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-pulse"></span>
              Now serving tradies and hospitality across Australia
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-[#0F172A] leading-[1.05] tracking-tight mb-6">
              Never miss a<br />
              <span className="text-[#2563EB]">job again.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-[#475569] leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 lg:max-w-lg">
              Your own AI receptionist - answers every call, books the job, follows up after.
              24/7, in your business, with a voice that actually sounds human.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1D4ED8] transition-all text-base shadow-lg shadow-[#2563EB]/20 cursor-pointer"
              >
                Book a Demo
              </a>
              <a
                href="#listen"
                className="inline-flex items-center justify-center gap-2 border border-[#E2E8F0] text-[#475569] font-semibold px-8 py-4 rounded-xl hover:border-[#2563EB] hover:text-[#2563EB] transition-all text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Listen to a Demo Call
              </a>
            </div>
          </div>

          {/* Animated call → job booked → confirmed card stack */}
          <div className="flex justify-center lg:justify-end">
            <HeroCallAnimation />
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-6 justify-center mt-14">
          {["Australian Built", "24/7 AI Receptionist", "No Lock-in Contracts", "Setup in 48 Hours"].map(
            (badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 text-sm text-[#94A3B8]"
              >
                <svg
                  className="w-4 h-4 text-[#2563EB]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span>{badge}</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
