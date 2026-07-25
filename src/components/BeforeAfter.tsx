"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function BeforeAfter() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="fade-in-section py-24 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest mb-3">
            The Difference
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
            Without us vs. with us.
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            See what changes when every call gets answered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Without */}
          <div className="bg-white rounded-2xl border border-red-200 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-400" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg">Without Active FrontDesk</h3>
                <p className="text-xs text-red-500 font-medium">How most businesses operate today</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { time: "9:14 AM", event: "Customer calls while you're on a job", status: "missed" },
                { time: "9:14 AM", event: "Phone rings out. No voicemail left.", status: "missed" },
                { time: "9:15 AM", event: "Customer calls your competitor instead", status: "lost" },
                { time: "11:30 AM", event: "You see the missed call. No number saved.", status: "missed" },
                { time: "11:32 AM", event: "Try to call back. No answer.", status: "lost" },
                { time: "End of day", event: "$350 job lost. You never knew about it.", status: "lost" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-mono text-[#94A3B8] w-16 block">{item.time}</span>
                  </div>
                  <div className="flex-1 flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      item.status === "lost" ? "bg-red-400" : "bg-orange-400"
                    }`} />
                    <p className="text-sm text-[#475569]">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-red-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#475569]">Revenue recovered</span>
                <span className="text-lg font-bold text-red-500">$0</span>
              </div>
            </div>
          </div>

          {/* With */}
          <div className="bg-white rounded-2xl border border-green-200 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-green-500" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg">With Active FrontDesk</h3>
                <p className="text-xs text-green-600 font-medium">Every call answered, every job booked</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { time: "9:14 AM", event: "Customer calls. AI picks up in 2 seconds.", status: "answered" },
                { time: "9:14 AM", event: '"Hi, thanks for calling Smith Plumbing..."', status: "answered" },
                { time: "9:15 AM", event: "AI checks calendar, finds slot for tomorrow 10am", status: "booked" },
                { time: "9:16 AM", event: "Appointment confirmed. Customer details saved to CRM.", status: "booked" },
                { time: "9:16 AM", event: "You get a notification: new booking + customer info", status: "booked" },
                { time: "End of day", event: "$350 job booked. You didn't lift a finger.", status: "booked" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-mono text-[#94A3B8] w-16 block">{item.time}</span>
                  </div>
                  <div className="flex-1 flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      item.status === "booked" ? "bg-green-500" : "bg-[#2563EB]"
                    }`} />
                    <p className="text-sm text-[#475569]">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-green-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#475569]">Revenue recovered</span>
                <span className="text-lg font-bold text-green-600">$350</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-[#94A3B8] mt-6">
          This happens 5-10 times a week for the average tradie. That&apos;s $1,750 - $3,500 in lost revenue every single week.
        </p>
      </div>
    </section>
  );
}
