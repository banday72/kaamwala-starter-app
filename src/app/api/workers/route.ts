import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const worker = await prisma.workerProfile.findUnique({
    where: { userId },
  });

  return NextResponse.json({ worker });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { skillSlugs, isAvailable } = body;

  if (!Array.isArray(skillSlugs) || skillSlugs.length === 0) {
    return NextResponse.json(
      { error: "At least one skill must be selected" },
      { status: 400 }
    );
  }

  const worker = await prisma.workerProfile.upsert({
    where: { userId },
    create: {
      userId,
      skillSlugs,
      isAvailable: isAvailable ?? false,
    },
    update: {
      skillSlugs,
      isAvailable: isAvailable ?? undefined,
    },
  });

  return NextResponse.json({ worker });
}
