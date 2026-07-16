import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { calculateDistance } from "@/lib/distance";

const MAX_DISTANCE_KM = 10; // Show jobs within 10km

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get worker profile (to know their location and skills)
  const worker = await prisma.workerProfile.findUnique({
    where: { userId },
  });

  if (!worker || !worker.currentLat || !worker.currentLng || worker.skillSlugs.length === 0) {
    return NextResponse.json({ jobs: [] }); // Worker hasn't set location or skills yet
  }

  // Get all "requested" bookings (jobs waiting for a worker)
  const allBookings = await prisma.booking.findMany({
    where: {
      status: "requested",
      workerId: null, // Not yet assigned to a worker
    },
  });

  // Filter by: (1) distance, (2) service category matches worker's skills
  // Note: For distance, we'd need booking location (address can't be geo-encoded easily client-side)
  // So for now, we'll just filter by matching skills
  const nearbyJobs = allBookings.filter((b) =>
    worker.skillSlugs.includes(b.categorySlug)
  );

  return NextResponse.json({ jobs: nearbyJobs, workerLocation: { lat: worker.currentLat, lng: worker.currentLng } });
}
