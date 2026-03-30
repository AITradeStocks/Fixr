import { prisma } from "../db/prisma.js";

export async function createContractor(input: {
  name: string;
  phone: string;
  email?: string;
  trade: string;
  businessType: string;
  zipCodes: string[];
}) {
  return prisma.contractor.create({
    data: {
      ...input,
      status: "onboarded"
    }
  });
}

export async function listContractors() {
  return prisma.contractor.findMany({ orderBy: { createdAt: "desc" } });
}
