"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const voices = [
  { name: "Jess", region: "NSW", active: true },
  { name: "Ryan", region: "QLD", active: false },
  { name: "Chloe", region: "VIC", active: false },
  { name: "Sam", region: "WA", active: false },
];

const offHoursCalls = [
  { time: "1:52 am", number: "+61 402 ··· 771" },
  { time: "3:18 am", number: "+61 415 ··· 640" },
  { time: "6:07 am", number: "+61 438 ··· 293" },
  { time: "11:41 pm", number: "+61 421 ··· 809" },
];

function WaveformBars({ active }: { active: boolean }) {
  const bars = [4, 7, 5, 9, 6, 8, 5, 3];
  return (
    <div className="flex items-center gap-[2px] h-5 flex-shrink-0">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full ${active ? "bg-white" : "bg-[#CBD5E1]"}`}
          style={{ height: `${h * 2}px` }}
        />
      ))}
    </div>
  );
}

function VoicePickerMockup() {
  return (
    <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-3 space-y-2">
      {voices.map((voice) => (
        <div
          key={voice.name}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            voice.active ? "bg-[#2563EB]" : "bg-white border border-[#E2E8F0]"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              voice.active ? "bg-white/20 text-white" : "bg-[#EFF6FF] text-[#2563EB]"
            }`}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span
            className={`text-sm font-semibold flex-1 ${
              voice.active ? "text-white" : "text-[#0F172A]"
            }`}
          >
            {voice.name}
          </span>
          <span
            className={`text-xs font-mono ${
              voice.active ? "text-white/70" : "text-[#94A3B8]"
            }`}
          >
            {voice.region}
          </span>
          <WaveformBars active={voice.active} />
        </div>
      ))}
    </div>
  );
}

function CallLogMockup() {
  return (
    <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-3 space-y-2">
      {offHoursCalls.map((call) => (
        <div
          key={call.time}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#E2E8F0]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="text-[11px] font-mono text-[#94A3B8] w-14 flex-shrink-0">
            {call.time}
          </span>
          <span className="text-[11px] font-mono text-[#475569] flex-1 truncate">
            {call.number}
          </span>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex-shrink-0">
            BOOKED
          </span>
        </div>
      ))}
    </div>
  );
}

function CalendarMockup() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const hours = ["9", "10", "11", "12", "1", "2", "3", "4"];
  const filled: Record<string, boolean> = { "0-1": true, "4-3": true, "3-5": true };
  const booked = "2-2";

  return (
    <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-4">
      <div className="grid grid-cols-8 gap-1 mb-2">
        <div />
        {days.map((d, i) => (
          <div key={i} className="text-[9px] text-center font-semibold text-[#94A3B8]">
            {d}
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {hours.map((h, hi) => (
          <div key={h} className="grid grid-cols-8 gap-1 items-center">
            <div className="text-[9px] text-[#94A3B8] text-right pr-1">{h}</div>
            {days.map((_, di) => {
              const key = `${di}-${hi}`;
              const isBooked = key === booked;
              const isFilled = filled[key];
              return (
                <div
                  key={key}
                  className={`h-2.5 rounded-sm ${
                    isBooked
                      ? "bg-[#2563EB]"
                      : isFilled
                      ? "bg-[#BFDBFE]"
                      : "bg-white border border-[#E2E8F0]"
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-[#475569] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
        Wed 1pm booked automatically
      </p>
    </div>
  );
}

function SMSMockup() {
  return (
    <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-4 space-y-2">
      <div className="bg-[#2563EB] text-white text-[11px] leading-relaxed rounded-2xl rounded-bl-sm px-3 py-2 max-w-[90%]">
        <p className="opacity-70 text-[9px] mb-0.5">Active FrontDesk · 2:41 pm</p>
        Hi Tom, you&apos;re booked for tomorrow 9am. 14 Fraser St, Preston. Reply STOP to cancel.
      </div>
      <div className="bg-white border border-[#E2E8F0] text-[#0F172A] text-[11px] rounded-2xl rounded-br-sm px-3 py-2 max-w-[65%] ml-auto">
        Perfect, thank you!
      </div>
    </div>
  );
}

const features = [
  {
    title: "Australian Voice & Accent",
    description:
      "Pick from a curated set of natural Australian voices. Real accent, real warmth - not a robotic menu.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
        />
      </svg>
    ),
    mockup: <VoicePickerMockup />,
  },
  {
    title: "24/7 Availability",
    description:
      "Captures the 2am emergency and the Sunday enquiry. Active FrontDesk never clocks off.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    mockup: <CallLogMockup />,
  },
  {
    title: "Smart Scheduling",
    description:
      "Reads your real calendar and books only when you're free. No double-bookings, ever.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
        />
      </svg>
    ),
    mockup: <CalendarMockup />,
  },
  {
    title: "Instant SMS Follow-up",
    description:
      "Every caller gets a text confirmation with the details, right after they hang up.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    ),
    mockup: <SMSMockup />,
  },
];

export default function FeatureShowcase() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="fade-in-section py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest mb-3">
            See It In Action
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
            This is what your customers actually experience.
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            Not a description of the product - the real voice, the real calendar, the real
            follow-up.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-all flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-[#0F172A] text-base mb-2">{feature.title}</h3>
              <p className="text-sm text-[#475569] leading-relaxed mb-4">
                {feature.description}
              </p>
              <div className="mt-auto">{feature.mockup}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
