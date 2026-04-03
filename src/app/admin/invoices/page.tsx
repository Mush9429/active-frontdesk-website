export default function AdminInvoices() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Invoices</h1>
        <p className="text-[#64748B] text-sm mt-1">
          Track billing, payments, and revenue.
        </p>
      </div>

      <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">Coming Soon</h2>
        <p className="text-[#94A3B8] text-sm max-w-md mx-auto mb-4">
          Create and track invoices, monitor monthly recurring revenue, and export
          financial reports. Connect Supabase to get started.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {["Generate invoices", "Payment tracking", "MRR dashboard", "PDF export"].map((feature) => (
            <span key={feature} className="text-xs bg-[#1E293B] text-[#64748B] px-3 py-1.5 rounded-full">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
