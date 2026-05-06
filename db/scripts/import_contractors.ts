import { PrismaClient } from '../prisma/generated-client/index.js';
import csvParser from 'csv-parser';

const prisma = new PrismaClient();

const CSV_URL = 'https://docs.google.com/spreadsheets/d/1uWppjftRfwfhgJ7lsHW06Cgih8_xFQdwnDwVd-mN8Hk/export?format=csv';

async function importContractors() {
  console.log('Fetching CSV from Google Sheets...');
  const response = await fetch(CSV_URL);
  
  if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);
  if (!response.body) throw new Error('Response body is null');

  const { Readable } = await import('stream');
  const stream = Readable.fromWeb(response.body as any);

  const contractors: any[] = [];
  await new Promise((resolve, reject) => {
    stream.pipe(csvParser())
      .on('data', (data) => contractors.push(data))
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`Parsed ${contractors.length} records. Preparing for bulk insert...`);

  const contractorData: any[] = [];
  const phonesMap: Map<string, any> = new Map();

  for (const row of contractors) {
    const businessName = row.business_name?.trim();
    if (!businessName) continue;

    const licenses = row.licence_number ? [row.licence_number.trim()] : [];

    contractorData.push({
      name: businessName,
      passwordHash: 'not_set',
      trade: 'Unknown',
      businessType: 'Unknown',
      status: 'Active',
      location: row.full_location?.trim() || null,
      suburb: row.suburb_name?.trim() || null,
      postcode: row.postcode?.trim() || null,
      abn: row.abn_number?.trim() || null,
      licenses: licenses,
      rating: row.rating ? parseFloat(row.rating) : null,
      reviewCount: row.review_count ? parseInt(row.review_count, 10) : 0,
      hiredCount: row.hired_count ? parseInt(row.hired_count, 10) : 0,
      recommendations: row.recommendations ? parseInt(row.recommendations, 10) : 0,
      website: row.website?.trim() || null,
      isVerified: row.verified?.toLowerCase() === 'true' || row.verified === '1' || row.verified === 'yes',
      logo_url: row.logo?.trim() || null,
      profileUrl: row.profile_url?.trim() || null,
    });

    if (row.phone) {
      phonesMap.set(businessName, {
        number: row.phone.trim(),
        type: 'Business',
        isVerified: row.verified?.toLowerCase() === 'true' || row.verified === '1' || row.verified === 'yes'
      });
    }
  }

  console.log('Inserting contractors...');
  await prisma.contractor.createMany({
    data: contractorData,
    skipDuplicates: true
  });

  console.log('Fetching inserted contractors to link phones...');
  const allContractors = await prisma.contractor.findMany({
    select: { id: true, name: true }
  });

  const phonesToInsert: any[] = [];
  for (const c of allContractors) {
    const phoneData = phonesMap.get(c.name);
    if (phoneData) {
      phonesToInsert.push({
        contractorId: c.id,
        number: phoneData.number,
        type: phoneData.type,
        isVerified: phoneData.isVerified
      });
    }
  }

  console.log(`Inserting ${phonesToInsert.length} phones...`);
  await prisma.contractorPhone.createMany({
    data: phonesToInsert,
    skipDuplicates: true
  });

  console.log('Import completed successfully!');
}

importContractors()
  .catch((err) => {
    console.error('Import script failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
