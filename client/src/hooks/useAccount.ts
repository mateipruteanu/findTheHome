import { BACKEND_URL } from "@/constants";
import { UpdateAccountDTO } from "@/dtos/UpdateAccountDTO";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function useAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<UpdateAccountDTO | null>(null);

  const getAccount = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/user/${id}`);
      const data = await response.json();
      if (response.ok) {
        console.log("[useAccount] Account fetched successfully:", data);
        setAccount(data);
      } else {
        console.error("[useAccount] Failed to fetch account:", data.message);
        toast.error(`Could not fetch account - ${data.message}`);
        setError(data.message);
      }
    } catch (error) {
      console.error("[useAccount] Failed to fetch account:", error);
      setError("Failed to fetch account");
    } finally {
      setIsLoading(false);
    }
  };

  const updateAccount = async (id: string, account: UpdateAccountDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        console.error("[useAccount/updateAccount] No access token found");
        toast.error("You must be logged in to update your account.");
        return;
      }
      const response = await fetch(`${BACKEND_URL}/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(account),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("[useAccount] Account updated successfully:", data);
        toast.success("Account updated successfully");
        return data;
      } else if (response.status === 403) {
        console.error("[useAccount] Failed to update account:", data.message);
        toast.error("You are not authorized to update this account.");
        setError(data.message);
      } else {
        console.error("[useAccount] Failed to update account:", data.message);
        toast.error(`Could not update account - ${data.message}`);
        setError(data.message);
      }
    } catch (error) {
      console.error("[useAccount] Failed to update account:", error);
      setError("Failed to update account");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        console.error("[useAccount/deleteAccount] No access token found");
        toast.error("You must be logged in to delete your account.");
        return;
      }
      const response = await fetch(`${BACKEND_URL}/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("[useAccount] Account deleted successfully:", data);
        toast.success("Account deleted successfully");
        return data;
      } else if (response.status === 403) {
        console.error("[useAccount] Failed to delete account:", data.message);
        toast.error("You are not authorized to delete this account.");
        setError(data.message);
      } else {
        console.error("[useAccount] Failed to delete account:", data.message);
        toast.error(`Could not delete account - ${data.message}`);
        setError(data.message);
      }
    } catch (error) {
      console.error("[useAccount] Failed to delete account:", error);
      setError("Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, getAccount, updateAccount, deleteAccount, account };
}
