-- Rename phone -> telephone (only if phone still exists)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='Contractor' AND column_name='phone') THEN
    ALTER TABLE "Contractor" RENAME COLUMN "phone" TO "telephone";
  END IF;
END $$;

-- Rename identityUploaded -> isVerified (only if it still exists)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='Contractor' AND column_name='identityUploaded') THEN
    ALTER TABLE "Contractor" RENAME COLUMN "identityUploaded" TO "isVerified";
  END IF;
END $$;

-- Rename licenseUploaded -> isLicensed (only if it still exists)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='Contractor' AND column_name='licenseUploaded') THEN
    ALTER TABLE "Contractor" RENAME COLUMN "licenseUploaded" TO "isLicensed";
  END IF;
END $$;

-- Add new extended profile columns
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "headline"  TEXT;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "location"  TEXT;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "website"   TEXT;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "owner"     TEXT;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "abn"       TEXT;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "licenses"  TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "postcode"  TEXT;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "about"     TEXT;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "logo_url"  TEXT;
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "address"   TEXT;
