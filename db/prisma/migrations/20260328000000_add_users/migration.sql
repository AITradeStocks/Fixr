-- CreateTable: User
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Add userId to Job (nullable, existing rows unaffected)
ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "userId" TEXT;

-- Add userId to PricingEvent
ALTER TABLE "PricingEvent" ADD COLUMN IF NOT EXISTS "userId" TEXT;

-- FK: Job -> User
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
