"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkerLocation } from "@/lib/use-worker-location";
import { categories } from "@/lib/categories";

interface Job {
  id: string;
  categorySlug: string;
  address: string;
  suggestedPrice: number;
  createdAt: string;
}

function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name || slug;
}

export default function AvailableJobs() {
  const { location, error: locationError, loading: locationLoading } = useWorkerLocation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptingJobId, setAcceptingJobId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch jobs whenever location updates
  useEffect(() => {
    if (!location) return;

    async function fetchJobs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/workers/nearby-jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [location]);

  async function handleAccept(jobId: string) {
    setAcceptingJobId(jobId);
    try {
      const res = await fetch("/api/bookings/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: jobId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to accept job");
      }

      router.refresh();
      setJobs(jobs.filter((j) => j.id !== jobId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error accepting job");
    } finally {
      setAcceptingJobId(null);
    }
  }

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium" style={{ color: "var(--navy)" }}>
          📍 Available Jobs Near You
        </h2>
        {location && (
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--navy)", color: "#fff" }}>
            GPS On
          </span>
        )}
      </div>

      {locationLoading && (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          📍 Getting your location...
        </p>
      )}

      {locationError && (
        <p className="text-sm" style={{ color: "#B3261E" }}>
          ⚠️ Location: {locationError}
        </p>
      )}

      {loading && !locationLoading && (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Loading jobs...
        </p>
      )}

      {error && (
        <p className="text-sm" style={{ color: "#B3261E" }}>
          Error: {error}
        </p>
      )}

      {jobs.length === 0 && !loading && !locationLoading && !locationError && (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          No jobs available in your area right now. Check back soon!
        </p>
      )}

      <div className="space-y-2 mt-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="rounded-lg border p-3 flex items-center justify-between"
            style={{ borderColor: "var(--border)", background: "#fff" }}
          >
            <div className="flex-1">
              <p className="font-medium text-sm" style={{ color: "var(--navy)" }}>
                {categoryName(job.categorySlug)}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {job.address}
              </p>
              <p className="text-xs font-medium mt-1" style={{ color: "var(--amber)" }}>
                Rs. {job.suggestedPrice.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleAccept(job.id)}
              disabled={acceptingJobId === job.id}
              className="ml-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap"
              style={{
                background: "var(--navy)",
                color: "#fff",
                opacity: acceptingJobId === job.id ? 0.6 : 1,
              }}
            >
              {acceptingJobId === job.id ? "..." : "Accept"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
