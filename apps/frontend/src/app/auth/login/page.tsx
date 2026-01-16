"use client";

import {
  FormFields,
  FormInput,
  FormSelect,
} from "@/components/forms-components/forms-components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse, LoginSchema, RegisterSchema } from "@repo/shared";
import {
  AuthResponseDto,
  LoginAuthDto,
  LoginAuthDtoProp,
  RegisterAuthDto,
  RegisterAuthDtoProp,
} from "@/fetch/auth/auth.dto";
import { useAuthFetch } from "@/fetch/auth/auth.fetch";
import { UserRole } from "@repo/db";
import { useRouter } from "next/navigation";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { IUserAuth } from "@/helpers/security/auth/user.auth";
import { useUserAuth } from "@/providers/auth.provider";
import { HttpError } from "@/helpers/errors/exceptions/http.exception";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { Select } from "@/components/select/select";
import { toast } from "sonner";

function page() {
  const [role, setRole] = useState<UserRole>("Patient");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [_, setLocalAuth] = useLocalStorage<IUserAuth>(
    LocalStorageKeys.UserAuth
  );
  const { setUserAuth } = useUserAuth();

  const loginForm = useForm<LoginAuthDto>({
    resolver: zodResolver(LoginSchema),
  });
  const [errors, setErrors] = useState<
    { [k in LoginAuthDtoProp]: string[] } | undefined
  >(undefined);

  const { useLogin } = useAuthFetch(role);
  const loginMutation = useLogin();
  const router = useRouter();

  const onSubmit = (data: RegisterAuthDto) => {
    setIsButtonDisabled(true);
    loginMutation.mutateAsync(data, {
      onSuccess: (result) => {
        if (role !== result.data.user.role) {
          toast.error("Your credentials incorrect");
          setIsButtonDisabled(false);
          return;
        }

        setUserAuth({
          id: result.data.user.id,
          email: result.data.user.email,
          name: result.data.user.name,
          role: result.data.user.role,
          token: result.data.accessToken,
          phoneNumber: result.data.user.phoneNumber ?? "",
          refreshToken: result.data.refreshToken,
        });

        setLocalAuth({
          id: result.data.user.id,
          email: result.data.user.email,
          name: result.data.user.name,
          role: result.data.user.role,
          token: result.data.accessToken,
          phoneNumber: result.data.user.phoneNumber ?? "",
          refreshToken: result.data.refreshToken,
        });

        setIsButtonDisabled(false);
        loginForm.reset();

        if (role === "Patient") {
          router.push("/");
        } else {
          router.push("/doctor");
        }
      },
      onError(error, variables, onMutateResult, context) {
        setIsButtonDisabled(false);
        if (
          error instanceof HttpError &&
          error.fullMessage instanceof ErrorResponse
        ) {
          setErrors(
            (error as HttpError<ErrorResponse>).fullMessage.error as any
          );
        }
      },
    });
  };

  return (
    <div className="w-[400px] block mx-auto py-5 px-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl mb-6 text-center">
        <b>Login</b>
      </h1>
      <FormFields
        form={loginForm}
        buttonProps={{
          buttonStretch: "w-full",
          content: "Submit",
          isDisabled: isButtonDisabled,
        }}
        gapY="gap-y-3"
        onSubmit={onSubmit}
        fields={[
          () => (
            <FormInput
              key="email"
              name="email"
              control={loginForm.control}
              required={true}
              errors={errors?.email}
              input={{
                placeholder: "ex: example@gmail.com",
                type: "email",
                label: "Email",
              }}
            />
          ),
          () => (
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required={true} className="text-nowrap">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="your password" {...field} />
                  </FormControl>
                  {errors?.password && errors?.password.length > 0 ? (
                    <ul>
                      {errors?.password.map((err, i) => (
                        <p key={i} className="text-sm text-red-500">
                          {err}
                        </p>
                      ))}
                    </ul>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
          ),
          () => (
            <Select
              disabled={false}
              label="Role"
              placeholder="Select Role"
              value={role}
              onValueChange={(val) => setRole(val as UserRole)}
              groups={[
                {
                  items: Object.values(UserRole).map((role) => ({
                    content: role,
                    value: role,
                  })),
                },
              ]}
            />
          ),
        ]}
      ></FormFields>
    </div>
  );
}

export default page;
