import { prisma } from "@/lib/prisma";
import { categories } from "@/lib/categories";
import StatusSelect from "./status-select";

export const dynamic = "force-dynamic"; // always fetch fresh data, never cache this page

function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name || slug;
}

export default async function AdminPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-medium mb-1" style={{ color: "var(--navy)" }}>
        Bookings
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        {bookings.length} total · newest first
      </p>

      {bookings.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No bookings yet. Go make one from the homepage.</p>
      ) : (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--navy)" }}>Service</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--navy)" }}>Address</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--navy)" }}>Status</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: "var(--navy)" }}>Price</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--navy)" }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-4 py-3" style={{ color: "var(--navy)" }}>{categoryName(b.categorySlug)}</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>{b.address}</td>
                    <td className="px-4 py-3">
                      <StatusSelect id={b.id} status={b.status} />
                    </td>
                    <td className="px-4 py-3 text-right" style={{ color: "var(--navy)" }}>
                      Rs. {b.suggestedPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                      {new Date(b.createdAt).toLocaleString("en-PK", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
