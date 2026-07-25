"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "How does Active FrontDesk work?",
    answer:
      "You forward your business number to us. When a customer calls, our AI picks up in under 2 seconds using your business name, with a real Australian accent. It finds out what they need, checks your live calendar, and books the job on the spot. You get a notification. The customer gets a confirmation. No voicemail. No missed leads.",
  },
  {
    question: "Does it actually sound like a real person?",
    answer:
      "Yes. We use premium Australian voice technology - not a robotic menu. Callers hear a natural, friendly voice that introduces itself by name and speaks the way an Australian receptionist would. Most callers don't realise they're talking to an AI.",
  },
  {
    question: "What happens if the AI can't answer a question?",
    answer:
      "It transfers the call straight to your mobile. If someone asks something outside the knowledge base - like a specific technical question or wants to speak to the owner - the AI recognises this and routes the call to you immediately. You're always the fallback.",
  },
  {
    question: "Can it handle emergencies?",
    answer:
      "Absolutely. If a caller mentions a burst pipe, gas leak, flooding, or any emergency keywords, the AI transfers the call to your mobile instantly. No delay, no hold music.",
  },
  {
    question: "Does it work with my existing phone number?",
    answer:
      "Yes. We set up a simple call forward from your current number. Your customers still call the same number they always have - they just get an answer every time now.",
  },
  {
    question: "Do I need any technical knowledge?",
    answer:
      "Zero. We handle everything: voice setup, calendar connection, CRM, business hours, service areas, pricing info. You give us 15 minutes on a call and we do the rest. You're live in 48 hours.",
  },
  {
    question: "Is there a lock-in contract?",
    answer:
      "No. Month-to-month. If it's not working for you, cancel anytime. We don't lock you in because we don't need to - the results speak for themselves.",
  },
  {
    question: "How long does setup take?",
    answer:
      "48 hours. We have a streamlined onboarding process: one 15-minute call with you, and we configure everything. Voice, greeting, calendar, CRM, business knowledge. Most clients are live the next business day.",
  },
  {
    question: "What industries do you support?",
    answer:
      "Plumbers, electricians, builders, HVAC techs, restaurants, cafes, medical and dental practices - any service business where a missed call means a lost customer. If your revenue depends on answering the phone, we're built for you.",
  },
  {
    question: "How is this different from an answering service?",
    answer:
      "Answering services take messages. We book jobs. Our AI checks your real calendar, finds available slots, creates confirmed appointments, logs the customer's details in your CRM, and can even send SMS confirmations. An answering service costs $800+/month and still can't do any of that.",
  },
];

export default function FAQ() {
  const ref = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="fade-in-section pt-16 md:pt-24 pb-24 md:pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Common questions.
          </h2>
          <p className="text-[#475569] text-lg">
            Everything you need to know before we set it up.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden border transition-colors ${
                openIndex === index
                  ? "border-[#2563EB]/40 bg-white shadow-sm"
                  : "border-[#E2E8F0] bg-white"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <span className="font-semibold text-[#0F172A] text-sm sm:text-base">
                  {faq.question}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    openIndex === index
                      ? "bg-[#2563EB] text-white rotate-180"
                      : "bg-[#F1F5F9] text-[#94A3B8]"
                  }`}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
