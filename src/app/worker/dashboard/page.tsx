import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { categories } from "@/lib/categories";
import AvailabilityToggle from "./availability-toggle";
import AvailableJobs from "./available-jobs";

export const dynamic = "force-dynamic";

function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name || slug;
}

export default async function WorkerDashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  let worker = await prisma.workerProfile.findUnique({
    where: { userId },
  });

  // If worker doesn't have a profile yet, redirect to onboarding
  if (!worker) {
    redirect("/worker/onboarding");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-medium mb-1" style={{ color: "var(--navy)" }}>
        Worker Dashboard
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        Manage your availability and skills
      </p>

      <div className="space-y-6">
        {/* Availability Toggle */}
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium" style={{ color: "var(--navy)" }}>
                Availability
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {worker.isAvailable ? "You're online and accepting jobs" : "You're offline"}
              </p>
            </div>
            <AvailabilityToggle initialState={worker.isAvailable} />
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <p className="font-medium mb-3" style={{ color: "var(--navy)" }}>
            Your Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {worker.skillSlugs.map((slug) => (
              <span
                key={slug}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: "var(--navy)", color: "#fff" }}
              >
                {categoryName(slug)}
              </span>
            ))}
          </div>
          <a
            href="/worker/onboarding"
            className="text-xs mt-3 inline-block hover:underline"
            style={{ color: "var(--amber)" }}
          >
            Edit skills →
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <p className="text-sm" style={{ color: "var(--muted)" }}>Jobs completed</p>
            <p className="text-2xl font-medium" style={{ color: "var(--navy)" }}>
              {worker.totalJobsCompleted}
            </p>
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <p className="text-sm" style={{ color: "var(--muted)" }}>Rating</p>
            <p className="text-2xl font-medium" style={{ color: "var(--navy)" }}>
              {worker.avgRating.toFixed(1)} ⭐
            </p>
          </div>
        </div>

        {/* Available Jobs */}
        <AvailableJobs />
      </div>
    </div>
  );
}
