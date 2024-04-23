-- CreateTable
CREATE TABLE "_SavedListings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SavedListings_AB_unique" ON "_SavedListings"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedListings_B_index" ON "_SavedListings"("B");

-- AddForeignKey
ALTER TABLE "_SavedListings" ADD CONSTRAINT "_SavedListings_A_fkey" FOREIGN KEY ("A") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedListings" ADD CONSTRAINT "_SavedListings_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
