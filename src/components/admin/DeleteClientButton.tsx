"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteClientButton({
  id,
  businessName,
  redirectTo,
}: {
  id: string;
  businessName: string;
  /** If provided, navigate here after a successful delete (used on the detail page). */
  redirectTo?: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (
      !confirm(
        `Delete the submission from "${businessName || "this business"}"? This cannot be undone.`
      )
    ) {
      return;
    }

    setDeleting(true);
    const res = await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
    setDeleting(false);

    if (!res.ok) {
      alert("Failed to delete submission. Please try again.");
      return;
    }

    if (redirectTo) {
      router.push(redirectTo);
    }
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="p-2 rounded-lg text-[#64748B] hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50 cursor-pointer"
      title="Delete"
      aria-label="Delete submission"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
}
