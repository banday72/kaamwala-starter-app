"use client";

import { useState } from "react";
import type { Category } from "@/lib/categories";
import type { Booking } from "@prisma/client";

export default function BookingForm({ category }: { category: Category }) {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) {
      setError("Enter an address so a worker can find you.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categorySlug: category.slug,
          address,
          description,
          baseRate: category.baseRate,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || "Something went wrong.");
      setBooking(data.booking);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't create the booking. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (booking) {
    return (
      <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <p className="text-sm font-medium mb-1" style={{ color: "var(--amber)" }}>Request sent</p>
        <p className="mb-4" style={{ color: "var(--navy)" }}>
          Looking for a nearby {category.name.toLowerCase()} for you at {booking.address}.
        </p>
        <div className="flex items-center justify-between rounded-lg px-4 py-3 mb-4" style={{ background: "var(--amber-light)" }}>
          <span className="text-sm" style={{ color: "var(--navy)" }}>Suggested price</span>
          <span className="font-medium" style={{ color: "var(--navy)" }}>Rs. {booking.suggestedPrice.toLocaleString()}</span>
        </div>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Booking ID: {booking.id} · This demo doesn&apos;t dispatch to real workers yet — that&apos;s the next
          piece to wire up (Socket.io + a worker app), per the roadmap in your PRD.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1" style={{ color: "var(--navy)" }}>Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="House 12, Street 4, G-10, Islamabad"
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
          style={{ borderColor: "var(--border)" }}
        />
      </div>
      <div>
        <label className="block text-sm mb-1" style={{ color: "var(--navy)" }}>What needs fixing? (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Kitchen tap is leaking"
          rows={3}
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
          style={{ borderColor: "var(--border)" }}
        />
      </div>
      {error && <p className="text-sm" style={{ color: "#B3261E" }}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg py-2.5 text-sm font-medium"
        style={{ background: "var(--navy)", color: "#fff", opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Sending request…" : "Request a worker now"}
      </button>
    </form>
  );
}
