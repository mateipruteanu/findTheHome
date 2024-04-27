import { BACKEND_URL } from "@/constants";
import { useState } from "react";
import toast from "react-hot-toast";
import { PaginationInfo } from "./useGetListings";

export default function useGetUsers() {
  const [users, setUsers] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(
    {} as PaginationInfo
  );
  const [loadingUsers, setLoadingUsers] = useState(false);

  const getUsers = async (
    page: number,
    email?: string,
    firstName?: string,
    lastName?: string,
    role?: "ADMIN" | "USER"
  ) => {
    setLoadingUsers(true);

    const emailQuery = email ? `&email=${email}` : "";
    const firstNameQuery = firstName ? `&firstName=${firstName}` : "";
    const lastNameQuery = lastName ? `&lastName=${lastName}` : "";
    const roleQuery = role ? `&role=${role}` : "";

    try {
      const response = await fetch(
        `${BACKEND_URL}/user?page=${page}${emailQuery}${firstNameQuery}${lastNameQuery}${roleQuery}`
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        setPaginationInfo(data.pagination);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Could not fetch users. Please try again.");
    } finally {
      setLoadingUsers(false);
    }
  };

  return { users, loadingUsers, getUsers, paginationInfo };
}
