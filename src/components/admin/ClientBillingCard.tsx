"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = ["new", "in-progress", "live", "churned"];

function formatAUD(n: number) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

/** Full calendar months elapsed since joinDate, plus the current (already-billed) month. Min 1. */
function monthsBilled(joinDate: Date, today: Date): number {
  let months = (today.getFullYear() - joinDate.getFullYear()) * 12 + (today.getMonth() - joinDate.getMonth());
  if (today.getDate() < joinDate.getDate()) months -= 1;
  return Math.max(0, months) + 1;
}

function nextBillingDate(joinDate: Date, billedMonths: number): Date {
  const next = new Date(joinDate);
  next.setMonth(next.getMonth() + billedMonths);
  return next;
}

export default function ClientBillingCard({
  id,
  initialStatus,
  initialJoinDate,
  initialMonthlyFee,
  initialSetupFee,
}: {
  id: string;
  initialStatus: string;
  initialJoinDate: string | null;
  initialMonthlyFee: number;
  initialSetupFee: number;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus || "new");
  const [joinDate, setJoinDate] = useState(initialJoinDate || "");
  const [monthlyFee, setMonthlyFee] = useState(String(initialMonthlyFee ?? 399));
  const [setupFee, setSetupFee] = useState(String(initialSetupFee ?? 2000));
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState("");

  const computed = useMemo(() => {
    if (!joinDate) return null;
    const join = new Date(`${joinDate}T00:00:00`);
    if (Number.isNaN(join.getTime())) return null;

    const today = new Date();
    const billed = monthsBilled(join, today);
    const nextBill = nextBillingDate(join, billed);
    const fee = Number(monthlyFee) || 0;
    const setup = Number(setupFee) || 0;
    const ltv = setup + fee * billed;

    return {
      monthsBilled: billed,
      nextBillingDate: nextBill,
      ltv,
    };
  }, [joinDate, monthlyFee, setupFee]);

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/clients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          join_date: joinDate || null,
          monthly_fee: Number(monthlyFee) || 0,
          setup_fee: Number(setupFee) || 0,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Failed to save.");
        return;
      }
      setSavedAt(Date.now());
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-[#111113] border border-[#1E293B] rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[#1E293B]">
        <h2 className="text-sm font-semibold text-white">Client & Billing</h2>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#64748B] uppercase tracking-wider mb-1.5">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white capitalize focus:outline-none focus:border-[#2563EB]"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-[#64748B] uppercase tracking-wider mb-1.5">Join date</label>
            <input
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2563EB] [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#64748B] uppercase tracking-wider mb-1.5">Monthly fee (AUD)</label>
            <input
              type="number"
              min="0"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#64748B] uppercase tracking-wider mb-1.5">Setup fee (AUD)</label>
            <input
              type="number"
              min="0"
              value={setupFee}
              onChange={(e) => setSetupFee(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1E293B]">
          <div>
            <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Next billing date</p>
            <p className="text-sm font-medium text-white">
              {computed
                ? computed.nextBillingDate.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })
                : "— set a join date"}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Estimated lifetime value</p>
            <p className="text-sm font-medium text-white">
              {computed ? formatAUD(computed.ltv) : "—"}
              {computed && (
                <span className="text-[#64748B] font-normal"> · {computed.monthsBilled} mo billed</span>
              )}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#475569]">
          Estimated from join date and fees — not synced to a payment processor yet.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 cursor-pointer"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {savedAt && !error && <span className="text-xs text-emerald-400">Saved</span>}
          {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
      </div>
    </div>
  );
}
