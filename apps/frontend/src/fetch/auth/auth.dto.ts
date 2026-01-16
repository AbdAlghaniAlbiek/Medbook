import { User } from "@repo/db";
import { LoginSchema, RegisterSchema } from "@repo/shared";
import z from "zod";

export type RegisterAuthDto = z.infer<typeof RegisterSchema>;
export type LoginAuthDto = z.infer<typeof LoginSchema>;

export type RegisterAuthDtoProp = keyof RegisterAuthDto;
export type LoginAuthDtoProp = keyof LoginAuthDto;

export type AuthResponseDto = {
  user: Omit<User, "password">;
  accessToken: string;
  refreshToken: string;
};
