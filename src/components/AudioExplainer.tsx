"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AudioDemo from "./AudioDemo";

export default function AudioExplainer() {
  const ref = useScrollAnimation();

  return (
    <section id="listen" ref={ref} className="fade-in-section py-24 md:py-32 border-t border-[#E2E8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#3B82F6] font-semibold text-sm uppercase tracking-widest mb-3">
          Hear It Yourself
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
          Listen to a real call.
        </h2>
        <p className="text-[#475569] text-lg mb-10 max-w-2xl mx-auto">
          From greeting to booked job. This is what your customers hear.
        </p>

        <AudioDemo />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Inbound call handling", "Availability check & booking", "Missed call follow-up", "Emergency transfer"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-4 py-2 text-sm text-[#475569] font-medium"
              >
                <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full"></div>
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
