import { UpdateListingDTO } from "@/dtos/UpdateListingDTO";
import { useState } from "react";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/constants";
import toast from "react-hot-toast";

export default function useUpdateListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateListing = async (
    listingId: string,
    createListingDTO: UpdateListingDTO
  ) => {
    setIsLoading(true);
    toast.loading("Updating listing...");
    setError(null);
    try {
      const token = Cookies.get("access_token");
      const response = await fetch(`${BACKEND_URL}/listing/${listingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createListingDTO),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("[useUpdateListing] Listing updated successfully:", data);
        toast.dismiss();
        toast.success("Listing updated successfully!");
      } else if (response.status === 403) {
        console.error(
          "[useUpdateListing] Failed to update listing:",
          data.message
        );
        toast.dismiss();
        toast.error(`Could not update listing - ${data.message}`);
        setError(data.message);
      } else {
        console.error(
          "[useUpdateListing] Failed to update listing:",
          data.message
        );
        toast.dismiss();
        toast.error(`Could not update listing - ${data.message}`);
        setError(data.message);
      }
    } catch (error) {
      console.error("[useUpdateListing] Failed to update listing:", error);
      setError("Failed to update listing");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateListing };
}
