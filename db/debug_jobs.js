const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' }
  });
  console.log(JSON.stringify(jobs.map(j => ({ id: j.id, status: j.status, contractorId: j.contractorId, desc: j.description })), null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
