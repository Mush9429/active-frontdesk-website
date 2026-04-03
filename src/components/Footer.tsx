import { CALENDLY_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[#1E293B] pt-16 pb-8 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1E293B]">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <span className="text-white font-bold text-base">Active FrontDesk</span>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
              Your calls answered. Your calendar booked. Your customers followed up. 24/7, across Australia.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#94A3B8] text-xs font-semibold uppercase tracking-wider mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Features", href: "/#features" },
                { label: "Industries", href: "/#industries" },
                { label: "Pricing", href: "/#pricing" },
                { label: "FAQ", href: "/#faq" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#CBD5E1] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#94A3B8] text-xs font-semibold uppercase tracking-wider mb-4">
              Contact
            </p>
            <a
              href="mailto:hello@activefrontdesk.com.au"
              className="text-[#CBD5E1] hover:text-white text-sm transition-colors block mb-5"
            >
              hello@activefrontdesk.com.au
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#3B82F6] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              Book a Demo
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-xs">
            &copy; 2026 Active FrontDesk. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-[#64748B] hover:text-white text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-[#64748B] hover:text-white text-xs transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
