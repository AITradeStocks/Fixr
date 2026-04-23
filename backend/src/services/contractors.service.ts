import { prisma } from "../db/prisma.js";

export async function createContractor(input: {
  name: string;
  passwordHash: string; // Required now
  trade: string;
  businessType: string;
  zipCodes: string[];
  // Extended profile
  headline?: string;
  location?: string;
  website?: string;
  owner?: string;
  abn?: string;
  licenses?: string[];
  postcode?: string;
  about?: string;
  logo_url?: string;
  address?: string;
}) {
  return prisma.contractor.create({
    data: {
      ...input,
      licenses: input.licenses ?? [],
      status: "onboarded"
    }
  });
}


export async function listContractors() {
  return prisma.contractor.findMany({ orderBy: { createdAt: "desc" } });
}
