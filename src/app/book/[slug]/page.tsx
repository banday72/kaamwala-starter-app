import { notFound } from "next/navigation";
import { getCategory } from "@/lib/categories";
import BookingForm from "./booking-form";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return notFound();

  return (
    <div className="mx-auto max-w-lg px-6 py-12">
      <p className="text-sm mb-1" style={{ color: "var(--amber)" }}>{category.icon} {category.name}</p>
      <h1 className="text-2xl font-medium mb-6" style={{ color: "var(--navy)" }}>
        Where do you need this done?
      </h1>
      <BookingForm category={category} />
    </div>
  );
}
