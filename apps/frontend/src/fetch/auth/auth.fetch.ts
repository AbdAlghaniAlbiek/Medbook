import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import {
  useGetOneOperationAPI,
  useGetOperationAPI,
  useOperationAPI,
} from "@/helpers/fetch/server/server.fetch";
import { IUserAuth } from "@/helpers/security/auth/user.auth";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AuthApi } from "./auth.api";
import { AuthResponseDto, LoginAuthDto, RegisterAuthDto } from "./auth.dto";
import { useUserAuth } from "@/providers/auth.provider";
import { useMutation } from "@tanstack/react-query";
import { User, UserRole } from "@repo/db";
import { SuccessResponse } from "@repo/shared";

export const useAuthFetch = (domain: UserRole) => {
  const authApis = new AuthApi(domain == "Patient" ? "patients" : "doctors", 1);
  const [auth, _] = useLocalStorage<IUserAuth>(LocalStorageKeys.UserAuth);

  return {
    useRegister: () =>
      useOperationAPI<AuthResponseDto, RegisterAuthDto>({
        fetchAPI: (data) => {
          return authApis.register({ data });
        },
        successMessage: (result) =>
          `Hello ${result.user.name}, having good day`,
      }),

    useLogin: () =>
      useOperationAPI<AuthResponseDto, LoginAuthDto>({
        showToastOptions: {
          loadingToast: false,
          successToast: true,
          failedToast: true,
          loadingMessage: "Working Progress ...",
        },
        fetchAPI: (data) => authApis.login({ data }),
        successMessage: (result) =>
          `Hello ${result.user.name}, having good day`,
      }),

    useAuthMe: (isEnabled = false) =>
      useGetOneOperationAPI<SuccessResponse<User>>({
        queryAPI: ({ signal }) =>
          authApis.authMe({ signal, token: auth.token! }),
        queryKey: ["auth-me"],
        isEnabled,
      }),
  };
};
