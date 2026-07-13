-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "categorySlug" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'requested',
    "suggestedPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
