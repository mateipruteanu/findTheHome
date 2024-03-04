-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_listingId_fkey";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
