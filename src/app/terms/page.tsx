import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Active FrontDesk",
  description:
    "The terms for using Active FrontDesk — what you're buying, how the subscription works, and what's included.",
};

const sections = [
  {
    heading: "About these terms",
    body: [
      "These terms govern your use of the Active FrontDesk service, provided by Active FrontDesk (ABN 95 639 679 926). By engaging our service, you agree to these terms. We've written them in plain language so it's clear what you're getting.",
    ],
  },
  {
    heading: "What you're buying",
    body: [
      "Active FrontDesk is a personalised AI receptionist built specifically for your business. You are not buying generic software — you're buying a solution configured around your business: your greeting, your Australian voice, your calendar, your services, your service areas, and how you want calls handled.",
      "The service is provided on a subscription basis, made up of two parts:",
    ],
    lists: [
      {
        title: "One-off setup — $2,000",
        items: [
          "We build and configure your custom receptionist end to end: voice setup, call handling, calendar and booking integration, customer record keeping, and your business knowledge.",
          "You're typically live within a week of providing the details we need.",
        ],
      },
      {
        title: "Monthly subscription — $399/month",
        items: [
          "Ongoing operation of your receptionist — answering calls, booking jobs, and capturing customer details, 24/7.",
          "All maintenance, updates, and adjustments your setup needs over time are included at no additional cost. If something needs changing or tuning, we handle it as part of your subscription.",
          "No lock-in contract. You can cancel at any time.",
        ],
      },
    ],
  },
  {
    heading: "Maintenance and support included",
    body: [
      "Your subscription covers the upkeep of your service. If your hours change, you add a service, your greeting needs updating, or your setup needs adjusting or fixing, we take care of it — you won't be charged extra for reasonable maintenance and support required to keep your receptionist working for you.",
    ],
  },
  {
    heading: "Your responsibilities",
    body: [
      "To get the most from the service, you agree to give us accurate business information during setup, forward your calls to us as arranged, and keep your account and billing details up to date. You're responsible for how you use the bookings and customer information the service provides to you.",
    ],
  },
  {
    heading: "Billing and cancellation",
    body: [
      "The setup fee is charged once, upfront. The subscription is billed monthly. Because there's no lock-in, you can cancel at any time — your service continues until the end of the current billing period. Setup fees are non-refundable once configuration work has begun.",
    ],
  },
  {
    heading: "Service availability",
    body: [
      "We work hard to keep your receptionist running around the clock, and it relies on trusted third-party telephony, voice, and calendar providers to do so. While we aim for continuous availability, we can't guarantee the service will be entirely uninterrupted or error-free, and we aren't liable for outages caused by those third-party providers or events outside our reasonable control.",
    ],
  },
  {
    heading: "Your data and your customers' data",
    body: [
      "The customer and call information generated for your business belongs to you. We treat it as confidential and use it only to deliver your service, as described in our Privacy Policy. Please review that policy — it forms part of your agreement with us.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "You agree to use the service lawfully and only for legitimate business purposes. You must not use it to mislead callers, or in any way that breaches Australian law or the rights of others.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the extent permitted by law, our liability for any claim relating to the service is limited to the fees you've paid us in the three months before the claim arose. Nothing in these terms excludes any rights you have under the Australian Consumer Law that cannot be excluded.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The date below shows the current version, and we'll take reasonable steps to notify clients of any significant change.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of Victoria, Australia, and any dispute will be handled by the courts of that state.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      "Questions about these terms or what's included? Email us at hello@activefrontdesk.com.au.",
    ],
  },
];

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest mb-3">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Terms of Service
            </h1>
            <p className="text-[#94A3B8] text-sm">Last updated: 26 July 2026</p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-[#475569] leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {section.lists?.map((list) => (
                    <div key={list.title}>
                      <p className="font-semibold text-[#0F172A] mt-4 mb-2">
                        {list.title}
                      </p>
                      <ul className="space-y-2">
                        {list.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-[#475569] leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
