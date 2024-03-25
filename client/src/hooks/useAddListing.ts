import { CreateListingDTO } from "@/dtos/CreateListingDTO";
import { useState } from "react";
import { BACKEND_URL } from "@/constants";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function useAddListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addListing = async (createListingDTO: CreateListingDTO) => {
    setIsLoading(true);
    toast.loading("Adding listing...");
    setError(null);
    try {
      const token = Cookies.get("access_token");
      const response = await fetch(`${BACKEND_URL}/listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createListingDTO),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("[useAddListing] Listing added successfully:", data);
        toast.dismiss();
        toast.success("Listing added successfully!");
      } else {
        console.error("[useAddListing] Failed to add listing:", data.message);
        toast.dismiss();
        toast.error(`Could not add listing - ${data.message}`);
        setError(data.message);
      }
    } catch (error) {
      console.error("[useAddListing] Failed to add listing:", error);
      toast.dismiss();
      toast.error(`Could not add listing - ${error}`);
      setError("Failed to add listing");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, addListing };
}
