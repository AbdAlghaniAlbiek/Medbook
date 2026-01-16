"use client";

import {
  FormFields,
  FormInput,
  FormSelect,
} from "@/components/forms-components/forms-components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse, RegisterSchema } from "@repo/shared";
import {
  AuthResponseDto,
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

function page() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [_, setLocalAuth] = useLocalStorage<IUserAuth>(
    LocalStorageKeys.UserAuth
  );
  const { setUserAuth } = useUserAuth();

  const registerForm = useForm<RegisterAuthDto>({
    resolver: zodResolver(RegisterSchema),
  });
  const [errors, setErrors] = useState<
    { [k in RegisterAuthDtoProp]: string[] } | undefined
  >(undefined);

  const { useRegister } = useAuthFetch(registerForm.getValues("role"));
  const registerMutation = useRegister();
  const router = useRouter();

  const onSubmit = async (data: RegisterAuthDto) => {
    setIsButtonDisabled(true);

    await registerMutation.mutateAsync(data, {
      onSuccess: (result) => {
        setUserAuth({
          id: result.data.user.id,
          email: result.data.user.email,
          name: result.data.user.name,
          role: result.data.user.role,
          token: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });

        setLocalAuth({
          id: result.data.user.id,
          email: result.data.user.email,
          name: result.data.user.name,
          role: result.data.user.role,
          token: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });

        registerForm.reset();
        router.push("/auth/login");
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

    setIsButtonDisabled(false);
  };

  return (
    <div className=" w-[400px] block mx-auto py-5 px-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl mb-6 text-center">
        <b>Register</b>
      </h1>
      <FormFields
        form={registerForm}
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
              key="name"
              name="name"
              control={registerForm.control}
              required={true}
              errors={errors?.name}
              input={{
                placeholder: "ex: Ahmad",
                type: "text",
                label: "Name",
              }}
            />
          ),
          () => (
            <FormInput
              key="email"
              name="email"
              control={registerForm.control}
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
              control={registerForm.control}
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
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required={true} className="text-nowrap">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="your password" {...field} />
                  </FormControl>
                  {errors?.confirmPassword &&
                  errors?.confirmPassword.length > 0 ? (
                    <ul>
                      {errors?.confirmPassword.map((err, i) => (
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
            <FormSelect
              key="role"
              name="role"
              control={registerForm.control}
              required={true}
              select={{
                disabled: false,
                placeholder: "Select Role",
                label: "Role",
                groups: [
                  {
                    items: Object.values(UserRole).map((role) => ({
                      content: role,
                      value: role,
                    })),
                  },
                ],
              }}
            />
          ),
        ]}
      ></FormFields>
    </div>
  );
}

export default page;
