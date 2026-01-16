import { Appointment, UserRole } from "@repo/db";
import {
  AppointmentApi,
  AppointmentDoctorApi,
  AppointmentPatientApi,
} from "./appointments.api";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { IUserAuth } from "@/helpers/security/auth/user.auth";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import { EntityFilter } from "@/helpers/dto/pagination.dto";
import {
  sharedShowToastOptions,
  useCreateAPI,
  useGet,
  useInfiniteGetAPI,
  useOperationAPI,
} from "@/helpers/fetch/server/server.fetch";
import { AppointmentCreateDto } from "./appointment.dto";

enum AppointmentCashNames {
  Plural = "appointments",
  Singular = "appointment",
}

export const useAppointmentFetch = (domain: UserRole) => {
  const appointmentsApis: AppointmentApi =
    domain === "Patient"
      ? new AppointmentPatientApi()
      : new AppointmentDoctorApi();

  const [auth, _] = useLocalStorage<IUserAuth>(LocalStorageKeys.UserAuth);

  return {
    useGetPaginatedAppointments: (info: EntityFilter, isEnabled = true) =>
      useGet<Appointment>(info, isEnabled, {
        queryFn: ({ signal }) =>
          appointmentsApis.getPaginated({ info, signal, token: auth.token! }),
        modelNameAsPlural: AppointmentCashNames.Plural,
      }),

    useCreateAppointment: (page: number) =>
      useCreateAPI<AppointmentCreateDto, Appointment>({
        page,
        showToastOptions: sharedShowToastOptions,
        metaInfo: {
          modelNameAsPlural: AppointmentCashNames.Plural,
          modelNameAsSingular: AppointmentCashNames.Singular,
          mutationFn: (data) =>
            (appointmentsApis as AppointmentPatientApi).create({
              token: auth.token!,
              data,
            }),
        },
      }),

    useConfirmAppointment: (appointmentId: number) =>
      useOperationAPI({
        fetchAPI: () =>
          (appointmentsApis as AppointmentDoctorApi).confirm({
            token: auth.token!,
            appointmentId,
          }),
        successMessage: (entity) => "You have been accepted this appointment",
      }),
    useRejectAppointment: (appointmentId: number) =>
      useOperationAPI({
        fetchAPI: () =>
          (appointmentsApis as AppointmentDoctorApi).reject({
            token: auth.token!,
            appointmentId,
          }),
        successMessage: (entity) => "You have been rejected this appointment",
      }),

    // ...(domain === "Patient"
    //   ? {
    //       useCreateAppointment: (page: number) =>
    //         useCreateAPI<AppointmentCreateDto, Appointment>({
    //           page,
    //           showToastOptions: sharedShowToastOptions,
    //           metaInfo: {
    //             modelNameAsPlural: AppointmentCashNames.Plural,
    //             modelNameAsSingular: AppointmentCashNames.Singular,
    //             mutationFn: (data) =>
    //               (appointmentsApis as AppointmentPatientApi).create({
    //                 token: auth.token!,
    //                 data,
    //               }),
    //           },
    //         }),
    //     }
    //   : {
    //       useConfirmAppointment: (appointmentId: number) =>
    //         useOperationAPI({
    //           fetchAPI: () =>
    //             (appointmentsApis as AppointmentDoctorApi).confirm({
    //               token: auth.token!,
    //               appointmentId,
    //             }),
    //           successMessage: (entity) =>
    //             "You have been accepted this appointment",
    //         }),
    //       useRejectAppointment: (appointmentId: number) =>
    //         useOperationAPI({
    //           fetchAPI: () =>
    //             (appointmentsApis as AppointmentDoctorApi).reject({
    //               token: auth.token!,
    //               appointmentId,
    //             }),
    //           successMessage: (entity) =>
    //             "You have been rejected this appointment",
    //         }),
    //     }),
  };
};
