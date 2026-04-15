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
        telephone: "+15125550148",
        email: "daniel@example.com",
        headline: "Licensed plumber with 12 years experience",
        about: "Specialising in residential plumbing, leak repairs, and general maintenance across the Austin area.",
        trade: "plumbing,general",
        businessType: "Independent",
        zipCodes: ["78704", "78701", "78703"],
        postcode: "78704",
        location: "Austin, TX",
        address: "42 Oak St, Austin, TX",
        abn: "12 345 678 901",
        licenses: ["PL-12345"],
        status: "activated",
        rating: 4.9,
        insuranceUploaded: true,
        isLicensed: true,
        isVerified: true,
      },
      {
        name: "Ava Chen",
        telephone: "+15125550149",
        email: "ava@example.com",
        headline: "Master electrician — residential & commercial",
        about: "Certified master electrician. Fast, reliable, and safety-first approach to all electrical work.",
        trade: "electrical,handyman",
        businessType: "Independent",
        zipCodes: ["78704", "78702", "78701"],
        postcode: "78702",
        location: "Austin, TX",
        address: "18 Elm Ave, Austin, TX",
        abn: "98 765 432 109",
        licenses: ["EC-67890"],
        status: "activated",
        rating: 4.8,
        insuranceUploaded: true,
        isLicensed: true,
        isVerified: true,
      },
      {
        name: "Marcus Johnson",
        telephone: "+15125550150",
        email: "marcus@example.com",
        headline: "HVAC & electrical specialist — 24/7 callouts",
        about: "Running Johnson & Co since 2015. We handle HVAC installs, repairs, and emergency electrical work.",
        trade: "hvac,electrical,general",
        businessType: "Company",
        zipCodes: ["78701", "78702", "78703", "78704"],
        postcode: "78701",
        location: "Austin, TX",
        address: "9 Commerce Blvd, Austin, TX",
        owner: "Marcus Johnson",
        abn: "55 123 456 789",
        licenses: ["HVAC-001", "EC-99001"],
        status: "activated",
        rating: 4.7,
        insuranceUploaded: true,
        isLicensed: true,
        isVerified: true,
      },
      {
        name: "Sarah Kim",
        telephone: "+15125550151",
        email: "sarah@example.com",
        headline: "Interior painter & handyperson",
        about: "Detail-focused painter and carpenter. Happy to take on small jobs and renovations.",
        trade: "painting,carpentry,handyman",
        businessType: "Independent",
        zipCodes: ["78704", "78705"],
        postcode: "78705",
        location: "Austin, TX",
        address: "3 Park Ln, Austin, TX",
        licenses: [],
        status: "onboarded",
        rating: null,
        insuranceUploaded: false,
        isLicensed: false,
        isVerified: true,
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