"use client";

import { useEffect, useRef, useState } from "react";

interface CallExample {
  name: string;
  jobType: string;
  day: string;
  time: string;
}

const EXAMPLES: CallExample[] = [
  { name: "Sarah Mitchell", jobType: "Blocked drain", day: "Thu", time: "2:00 PM" },
  { name: "James Whitfield", jobType: "Hot water system", day: "Fri", time: "9:30 AM" },
  { name: "Chloe Nguyen", jobType: "Aircon service", day: "Mon", time: "11:00 AM" },
];

type Phase = "waiting" | "collecting" | "booked";

const PHASE_DURATIONS: Record<Phase, number> = {
  waiting: 1800,
  collecting: 2000,
  booked: 2600,
};

const SWAP_FADE_MS = 250;

const PHASE_LABEL: Record<Phase, string> = {
  waiting: "Waiting for calls…",
  collecting: "Collecting details…",
  booked: "Job booked ✓",
};

function BadgeIcon({ phase }: { phase: Phase }) {
  if (phase === "waiting") {
    return (
      <div className="flex items-end gap-1 h-6">
        {[9, 16, 22, 14, 19, 11].map((h, i) => (
          <span
            key={i}
            className="w-1 bg-white rounded-full animate-pulse"
            style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    );
  }

  if (phase === "collecting") {
    return (
      <div className="flex items-center gap-1.5">
        {[0, 150, 300].map((delay, i) => (
          <span
            key={i}
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    );
  }

  return (
    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function HeroCallAnimation() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("waiting");
  const [swapping, setSwapping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setPhase("booked"), 0);
      return () => clearTimeout(t);
    }

    function schedule(p: Phase) {
      timeoutRef.current = setTimeout(() => {
        if (p === "waiting") {
          setPhase("collecting");
          schedule("collecting");
        } else if (p === "collecting") {
          setPhase("booked");
          schedule("booked");
        } else {
          setSwapping(true);
          timeoutRef.current = setTimeout(() => {
            setIndex((i) => (i + 1) % EXAMPLES.length);
            setPhase("waiting");
            setSwapping(false);
            schedule("waiting");
          }, SWAP_FADE_MS);
        }
      }, PHASE_DURATIONS[p]);
    }

    schedule("waiting");
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const current = EXAMPLES[index];
  const booked = phase === "booked";

  return (
    <div className="w-full max-w-sm select-none" aria-hidden="true">
      {/* Incoming call card */}
      <div
        className="bg-white rounded-2xl border border-[#E2E8F0] shadow-lg shadow-[#2563EB]/5 p-5 transition-opacity duration-300"
        style={{ opacity: swapping ? 0 : 1 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-[#0F172A] text-sm">{current.name}</p>
            <p className="text-xs text-[#94A3B8]">New enquiry</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          <span className="text-xs font-medium text-[#475569]">Call answered</span>
        </div>
      </div>

      {/* Connector + phase badge (waiting → collecting → booked) */}
      <div className="flex flex-col items-center py-3">
        <div className="w-px h-6 bg-[#E2E8F0]" />
        <div className="relative flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full blur-md transition-colors duration-300 ${
              booked ? "bg-emerald-400/40" : "bg-[#2563EB]/30"
            }`}
          />
          <div
            className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
              booked ? "bg-emerald-500 shadow-emerald-500/30" : "bg-[#2563EB] shadow-[#2563EB]/30"
            }`}
          >
            <BadgeIcon phase={phase} />
          </div>
        </div>
        <p className={`text-sm font-bold mt-2 transition-colors duration-300 ${booked ? "text-emerald-600" : "text-[#2563EB]"}`}>
          {PHASE_LABEL[phase]}
        </p>
        <div className="w-px h-6 bg-[#E2E8F0]" />
      </div>

      {/* Booking confirmation card — appears once the job is booked */}
      <div
        className="bg-white rounded-2xl border border-[#E2E8F0] shadow-lg shadow-[#2563EB]/5 p-5 transition-opacity duration-300"
        style={{ opacity: booked && !swapping ? 1 : 0 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-[#0F172A] text-sm">{current.name}</p>
            <p className="text-xs text-[#94A3B8]">{current.jobType}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm border-t border-[#E2E8F0] pt-3">
          <div className="flex justify-between">
            <span className="text-[#94A3B8]">Date</span>
            <span className="font-medium text-[#0F172A]">
              {current.day}, {current.time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#94A3B8]">Status</span>
            <span className="font-medium text-emerald-600">Confirmed</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#E2E8F0]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-[#475569]">Booked into calendar</span>
        </div>
      </div>
    </div>
  );
}
