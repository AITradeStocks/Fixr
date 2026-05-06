import { PrismaClient } from '../prisma/generated-client/index.js';

const prisma = new PrismaClient();

async function fixStatus() {
  console.log("Updating contractor status from 'Active' to 'activated'...");
  const result = await prisma.contractor.updateMany({
    where: { status: 'Active' },
    data: { status: 'activated' },
  });
  console.log(`Updated ${result.count} contractors successfully.`);
}

fixStatus()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
