"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AvailabilityToggle({ initialState }: { initialState: boolean }) {
  const [isAvailable, setIsAvailable] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    try {
      await fetch("/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !isAvailable, skillSlugs: [] }),
      });
      setIsAvailable(!isAvailable);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="px-4 py-2 rounded-lg font-medium text-sm transition"
      style={{
        background: isAvailable ? "var(--navy)" : "var(--muted)",
        color: "#fff",
        opacity: loading ? 0.7 : 1,
      }}
    >
      {isAvailable ? "🟢 Online" : "⚪ Offline"}
    </button>
  );
}
