export type GetUserDTO = {
  id: string;
  email: string;
  photo: string;
  name: string;
  role: "ADMIN" | "USER";
  lastLogin: Date;
  message: string;
};
