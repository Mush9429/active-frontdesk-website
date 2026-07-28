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
          d="M -320,120 Q -240,84 -160,120 T 0,120 T 160,120 T 320,120 T 480,120 T 640,120 T 800,120 T 960,120 T 1120,120 T 1280,120 T 1440,120 T 1600,120 T 1760,120 T 1920,120"
          stroke="#2563EB"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
        <path
          className="hero-wave hero-wave-2"
          d="M -320,220 Q -240,190 -160,220 T 0,220 T 160,220 T 320,220 T 480,220 T 640,220 T 800,220 T 960,220 T 1120,220 T 1280,220 T 1440,220 T 1600,220 T 1760,220 T 1920,220"
          stroke="#059669"
          strokeOpacity="0.10"
          strokeWidth="1.5"
        />
        <path
          className="hero-wave hero-wave-3"
          d="M -320,330 Q -240,290 -160,330 T 0,330 T 160,330 T 320,330 T 480,330 T 640,330 T 800,330 T 960,330 T 1120,330 T 1280,330 T 1440,330 T 1600,330 T 1760,330 T 1920,330"
          stroke="#2563EB"
          strokeOpacity="0.09"
          strokeWidth="1.5"
        />
        <path
          className="hero-wave hero-wave-4"
          d="M -320,430 Q -240,404 -160,430 T 0,430 T 160,430 T 320,430 T 480,430 T 640,430 T 800,430 T 960,430 T 1120,430 T 1280,430 T 1440,430 T 1600,430 T 1760,430 T 1920,430"
          stroke="#059669"
          strokeOpacity="0.08"
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
