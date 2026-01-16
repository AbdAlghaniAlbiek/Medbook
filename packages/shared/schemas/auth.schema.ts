import { z } from "zod";
import { UserRole } from "@repo/db";

export const RegisterSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z
      .string()
      .min(8)
      .refine(
        (val) => {
          let isContainsOnCapital = false;
          for (let i = 0; i < val.length; i++) {
            if (val[i] === val[i].toUpperCase()) isContainsOnCapital = true;
          }

          return isContainsOnCapital;
        },
        {
          error: "must contains one upper case character at least",
        }
      )
      .refine(
        (val) => {
          let isContainsOnNumber = false;
          for (let i = 0; i < val.length; i++) {
            if (/^[0-9]$/.test(val[i])) isContainsOnNumber = true;
          }

          return isContainsOnNumber;
        },
        {
          error: "must contains one number at least",
        }
      ),
    confirmPassword: z
      .string()
      .min(8)
      .refine(
        (val) => {
          let isContainsOnCapital = false;
          for (let i = 0; i < val.length; i++) {
            if (val[i] === val[i].toUpperCase()) isContainsOnCapital = true;
          }

          return isContainsOnCapital;
        },
        {
          error: "must contains one upper case character at least",
        }
      )
      .refine(
        (val) => {
          let isContainsOnNumber = false;
          for (let i = 0; i < val.length; i++) {
            if (/^[0-9]$/.test(val[i])) isContainsOnNumber = true;
          }

          return isContainsOnNumber;
        },
        {
          error: "must contains one number at least",
        }
      ),
    role: z.enum(UserRole),
  })
  .refine((obj) => obj.password === obj.confirmPassword, {
    error: "confirm password must match password",
  });

export const LoginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8)
    .refine(
      (val) => {
        let isContainsOnCapital = false;
        for (let i = 0; i < val.length; i++) {
          if (val[i] === val[i].toUpperCase()) isContainsOnCapital = true;
        }

        return isContainsOnCapital;
      },
      {
        error: "must contains one upper case character at least",
      }
    )
    .refine(
      (val) => {
        let isContainsOnNumber = false;
        for (let i = 0; i < val.length; i++) {
          if (/^[0-9]$/.test(val[i])) isContainsOnNumber = true;
        }

        return isContainsOnNumber;
      },
      {
        error: "must contains one number at least",
      }
    ),
});
