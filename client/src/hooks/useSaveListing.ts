import { CreateListingDTO } from "@/dtos/CreateListingDTO";
import { useState } from "react";
import { BACKEND_URL } from "@/constants";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { AuthUser } from "@/AuthProvider";
import { Listing } from "@/entities/Listing";

export default function useSaveListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveListing = async (listing: Listing) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = Cookies.get("access_token");
      const response = await fetch(
        `${BACKEND_URL}/listing/${listing.id}/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("[useSaveListing] Listing saved successfully");
      } else {
        console.error("[useAddListing] Failed to save listing");
        toast.error(`Could not save listing`);
      }
    } catch (error) {
      console.error("[useAddListing] Failed to save listing ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const unsaveListing = async (listing: Listing) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = Cookies.get("access_token");
      const response = await fetch(
        `${BACKEND_URL}/listing/${listing.id}/save`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("[useSaveListing] Listing unsaved successfully");
      } else {
        console.error("[useAddListing] Failed to unsave listing");
        toast.error(`Could not unsave listing`);
      }
    } catch (error) {
      console.error("[useAddListing] Failed to unsave listing ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, saveListing, unsaveListing };
}
