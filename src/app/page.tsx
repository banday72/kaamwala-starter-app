import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="py-14 sm:py-20">
        <p className="text-sm font-medium mb-3" style={{ color: "var(--amber)" }}>
          Islamabad · Rawalpindi
        </p>
        <h1 className="text-3xl sm:text-4xl font-medium max-w-xl leading-tight" style={{ color: "var(--navy)" }}>
          A skilled worker, at your door, within the hour.
        </h1>
        <p className="mt-4 max-w-lg" style={{ color: "var(--muted)" }}>
          Verified masons, electricians, plumbers, and more. Pick a service, share your location,
          and track your worker live — same as booking a ride.
        </p>
      </section>

      <section className="pb-20">
        <h2 className="text-lg font-medium mb-4" style={{ color: "var(--navy)" }}>
          What do you need done?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/book/${c.slug}`}
              className="rounded-xl border p-4 flex flex-col items-start gap-2 transition hover:shadow-sm"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="text-sm font-medium" style={{ color: "var(--navy)" }}>{c.name}</span>
              <span className="text-xs" style={{ color: "var(--muted)" }}>from Rs. {c.baseRate.toLocaleString()}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
