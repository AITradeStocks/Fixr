import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedJobs() {
  console.log("Creating test jobs...");
  
  await prisma.job.create({
    data: {
      description: "Leaking pipe under the kitchen sink",
      location: "Sydney, NSW",
      address: "42 Wallaby Way",
      postcode: "2000",
      urgency: "urgent now",
      category: "plumbing",
      problemType: "leak",
      severity: "high",
      estimatedTimeMinutes: 60,
      partsRequired: true,
      quotedPrice: 150,
      quotedPriceMin: 120,
      quotedPriceMax: 180,
      confidence: "high",
      status: "priced"
    }
  });

  await prisma.job.create({
    data: {
      description: "Replace circuit breaker",
      location: "Melbourne, VIC",
      address: "100 Flinders St",
      postcode: "3000",
      urgency: "flexible",
      category: "electrical",
      problemType: "wiring",
      severity: "medium",
      estimatedTimeMinutes: 90,
      partsRequired: true,
      quotedPrice: 200,
      quotedPriceMin: 180,
      quotedPriceMax: 250,
      confidence: "high",
      status: "priced"
    }
  });

  console.log("Jobs created successfully!");
}

seedJobs()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
