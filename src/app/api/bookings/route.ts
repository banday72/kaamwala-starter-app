import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ bookings });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { categorySlug, address, description, baseRate } = body;

  if (!categorySlug || !address) {
    return NextResponse.json(
      { error: { code: "INVALID_INPUT", message: "categorySlug and address are required." } },
      { status: 400 }
    );
  }

  const suggestedPrice = Math.round((baseRate || 1000) * (0.9 + Math.random() * 0.3));

  const booking = await prisma.booking.create({
    data: {
      categorySlug,
      address,
      description: description || "",
      suggestedPrice,
    },
  });

  return NextResponse.json({ booking }, { status: 201 });
}
