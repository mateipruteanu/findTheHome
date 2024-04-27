export type GetUserDTO = {
  id: string;
  email: string;
  photo: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  numberOfListings?: number;
  lastLogin: Date;
  message: string;
};
