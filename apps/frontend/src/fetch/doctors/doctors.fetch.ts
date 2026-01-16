import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import {
  useGet,
  useGetOneOperationAPI,
  useGetOperationAPI,
  useOperationAPI,
} from "@/helpers/fetch/server/server.fetch";
import { IUserAuth } from "@/helpers/security/auth/user.auth";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useUserAuth } from "@/providers/auth.provider";
import { useMutation } from "@tanstack/react-query";
import { User, UserRole } from "@repo/db";
import { SuccessResponse } from "@repo/shared";
import { DoctorsPatientApi } from "./doctors.api";
import { EntityFilter } from "@/helpers/dto/pagination.dto";

enum DoctorsPatientCashNames {
  Plural = "doctors",
  Singular = "doctor",
}

export const useDoctorsFetch = () => {
  const doctorsPatientApis = new DoctorsPatientApi();
  const [auth, _] = useLocalStorage<IUserAuth>(LocalStorageKeys.UserAuth);

  return {
    useGetPaginatedDoctors: (info: EntityFilter, isEnabled: boolean) =>
      useGet<User>(info, isEnabled, {
        queryFn: ({ signal }) =>
          doctorsPatientApis.getPaginated({ info, signal, token: auth.token! }),
        modelNameAsPlural: DoctorsPatientCashNames.Plural,
      }),

    useGetOneDoctor: (doctorId: number, isEnabled: boolean) =>
      useGetOneOperationAPI<User>({
        queryKey: [DoctorsPatientCashNames.Singular],
        queryAPI: ({ signal }) =>
          doctorsPatientApis.getOne({ signal, doctorId, token: auth.token! }),
        isEnabled,
      }),
  };
};
