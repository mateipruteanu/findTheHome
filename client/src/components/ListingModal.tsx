import { Listing } from "@/entities/Listing";

export default function ListingModal({
  listing,
  isOpen,
  onClose,
}: {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div>
      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
    </div>
  );
}
