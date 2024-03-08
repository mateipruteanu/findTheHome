-- CreateEnum
CREATE TYPE "HomeType" AS ENUM ('APARTMENT', 'HOUSE');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('RENT', 'SALE');

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "homeType" "HomeType" NOT NULL DEFAULT 'HOUSE',
ADD COLUMN     "listingType" "ListingType" NOT NULL DEFAULT 'SALE';
