export type GetUserDTO = {
  id: string;
  email: string;
  photo: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  lastLogin: Date;
  message: string;
};
