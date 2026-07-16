"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["requested", "accepted", "in_progress", "completed"];

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [current, setCurrent] = useState(status);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    setCurrent(newStatus);
    setSaving(true);
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={saving}
      className="text-xs px-2 py-1 rounded-full border cursor-pointer"
      style={{ borderColor: "var(--border)", color: "var(--navy)", background: "var(--card)" }}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
