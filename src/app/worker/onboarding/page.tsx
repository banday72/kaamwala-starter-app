"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/categories";

export default function WorkerOnboarding() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      setError("Select at least one skill");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillSlugs: selectedSkills, isAvailable: true }),
      });
      if (!res.ok) throw new Error("Failed to save skills");
      router.push("/worker/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function toggleSkill(slug: string) {
    setSelectedSkills((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-medium mb-2" style={{ color: "var(--navy)" }}>
        Welcome, worker! 🔧
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        Select the services you can provide
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((c) => (
            <label
              key={c.slug}
              className="rounded-lg border p-3 cursor-pointer transition"
              style={{
                borderColor: selectedSkills.includes(c.slug) ? "var(--amber)" : "var(--border)",
                background: selectedSkills.includes(c.slug) ? "var(--amber-light)" : "var(--card)",
              }}
            >
              <input
                type="checkbox"
                value={c.slug}
                checked={selectedSkills.includes(c.slug)}
                onChange={() => toggleSkill(c.slug)}
                className="mr-2"
              />
              <span className="text-sm" style={{ color: "var(--navy)" }}>
                {c.name}
              </span>
            </label>
          ))}
        </div>

        {error && (
          <p className="text-sm" style={{ color: "#B3261E" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || selectedSkills.length === 0}
          className="w-full rounded-lg py-2.5 text-sm font-medium"
          style={{ background: "var(--navy)", color: "#fff", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Saving..." : "Continue to Dashboard"}
        </button>
      </form>
    </div>
  );
}
