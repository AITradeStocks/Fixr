import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      passwordHash,
      name: "Test Customer",
      phone: "+15125550100",
    },
  });

  await prisma.contractor.createMany({
    data: [
      {
        name: "Daniel Walsh",
        phone: "+15125550148",
        email: "daniel@example.com",
        trade: "plumbing,general",
        businessType: "Independent",
        zipCodes: ["78704", "78701", "78703"],
        status: "activated",
        rating: 4.9,
        insuranceUploaded: true,
        licenseUploaded: true,
        identityUploaded: true,
      },
      {
        name: "Ava Chen",
        phone: "+15125550149",
        email: "ava@example.com",
        trade: "electrical,handyman",
        businessType: "Independent",
        zipCodes: ["78704", "78702", "78701"],
        status: "activated",
        rating: 4.8,
        insuranceUploaded: true,
        licenseUploaded: true,
        identityUploaded: true,
      },
      {
        name: "Marcus Johnson",
        phone: "+15125550150",
        email: "marcus@example.com",
        trade: "hvac,electrical,general",
        businessType: "Company",
        zipCodes: ["78701", "78702", "78703", "78704"],
        status: "activated",
        rating: 4.7,
        insuranceUploaded: true,
        licenseUploaded: true,
        identityUploaded: true,
      },
      {
        name: "Sarah Kim",
        phone: "+15125550151",
        email: "sarah@example.com",
        trade: "painting,carpentry,handyman",
        businessType: "Independent",
        zipCodes: ["78704", "78705"],
        status: "onboarded",
        rating: null,
        insuranceUploaded: false,
        licenseUploaded: false,
        identityUploaded: true,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.contractorLead.createMany({
    data: [
      { name: "Tom Brady", phone: "+15125550200", tradeType: "plumbing", suburbOrZip: "78701", source: "google_maps", status: "new_lead" },
      { name: "Lisa Park", phone: "+15125550201", tradeType: "electrical", suburbOrZip: "78704", source: "yelp", status: "contacted" },
      { name: "James Wu", phone: "+15125550202", tradeType: "handyman", suburbOrZip: "78702", source: "craigslist", status: "interested" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed complete.");
  console.log("Test customer: customer@example.com / password123");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });