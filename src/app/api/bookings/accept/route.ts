import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { bookingId } = body;

  if (!bookingId) {
    return NextResponse.json({ error: "bookingId is required" }, { status: 400 });
  }

  // Check if booking exists and is still "requested"
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  if (booking.status !== "requested" || booking.workerId) {
    return NextResponse.json(
      { error: "Booking is no longer available (already accepted or completed)" },
      { status: 400 }
    );
  }

  // Update booking: assign worker and change status to "accepted"
  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      workerId: userId,
      status: "accepted",
    },
  });

  return NextResponse.json({ booking: updated });
}
