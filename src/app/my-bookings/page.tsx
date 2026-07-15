import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { categories } from "@/lib/categories";

export const dynamic = "force-dynamic";

function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name || slug;
}

export default async function MyBookingsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const bookings = await prisma.booking.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-medium mb-6" style={{ color: "var(--navy)" }}>
        My bookings
      </h1>

      {bookings.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>
          You haven&apos;t booked anything yet. Head to the homepage to request a worker.
        </p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border p-4 flex items-center justify-between"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <div>
                <p className="font-medium" style={{ color: "var(--navy)" }}>{categoryName(b.categorySlug)}</p>
                <p className="text-sm" style={{ color: "var(--muted)" }}>{b.address}</p>
              </div>
              <div className="text-right">
                <p className="font-medium" style={{ color: "var(--navy)" }}>Rs. {b.suggestedPrice.toLocaleString()}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{b.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
