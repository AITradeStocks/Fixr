import { prisma } from "../db/prisma.js";

export async function getSupplyAnalytics() {
  const [totalLeads, onboarded, activated, retained] = await Promise.all([
    prisma.contractorLead.count(),
    prisma.contractor.count({ where: { status: "onboarded" } }),
    prisma.contractor.count({ where: { status: "activated" } }),
    prisma.contractor.count({ where: { status: "retained" } })
  ]);

  return { totalLeads, onboarded, activated, retained };
}
