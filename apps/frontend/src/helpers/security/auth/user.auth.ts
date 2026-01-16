import { UserRole } from "@repo/db";

export interface IUserAuth {
  id?: number;
  name?: string;
  email?: string;
  token?: string;
  phoneNumber?: string;
  refreshToken?: string;
  role?: UserRole;
}
