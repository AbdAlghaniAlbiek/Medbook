import { EntityFilter } from "@/helpers/dto/pagination.dto";
import { IGetSuccessResponse } from "@/helpers/dto/response.dto";
import {
  AxiosInstance,
  ContentType,
  paginationQueryParamsGenerator,
} from "@/helpers/fetch/axios/axios.helper";
import { Appointment, User } from "@repo/db";
import { LoginSchema, RegisterSchema, SuccessResponse } from "@repo/shared";
import { AppointmentCreateDto } from "./appointment.dto";

export class AppointmentApi {
  public axiosInstance;
  constructor(public domain: string, apiVersion: number) {
    this.axiosInstance = AxiosInstance(ContentType.ApplicationJson, apiVersion);
  }

  public appendToken(token: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  async getPaginated({
    signal,
    info,
    token,
  }: {
    info: EntityFilter;
    signal: AbortSignal;
    token: string;
  }): Promise<IGetSuccessResponse<Appointment>> {
    this.appendToken(token);

    return (
      await this.axiosInstance.get<
        SuccessResponse<IGetSuccessResponse<Appointment>>
      >(
        paginationQueryParamsGenerator(
          `${this.axiosInstance.getUri()}/${this.domain}/appointments`,
          info
        ),
        {
          headers: { Authorization: `Bearer ${token}` },
          ...(signal && { signal }),
        }
      )
    ).data.data;
  }
}

export class AppointmentPatientApi extends AppointmentApi {
  constructor() {
    super("patients", 1);
  }

  async create({
    signal,
    token,
    data,
  }: {
    signal?: AbortSignal;
    token: string;
    data: AppointmentCreateDto;
  }): Promise<SuccessResponse<Appointment>> {
    this.appendToken(token);

    return (
      await this.axiosInstance.post<SuccessResponse<Appointment>>(
        `${this.axiosInstance.getUri()}/${this.domain}/appointments`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
          ...(signal && { signal }),
        }
      )
    ).data;
  }
}

export class AppointmentDoctorApi extends AppointmentApi {
  constructor() {
    super("doctors", 1);
  }

  async confirm({
    signal,
    token,
    appointmentId,
  }: {
    signal?: AbortSignal;
    token: string;
    appointmentId: number;
  }): Promise<SuccessResponse<Appointment>> {
    this.appendToken(token);

    return (
      await this.axiosInstance.patch<SuccessResponse<Appointment>>(
        `${this.axiosInstance.getUri()}/${
          this.domain
        }/appointments/${appointmentId}/confirm`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          ...(signal && { signal }),
        }
      )
    ).data;
  }

  async reject({
    signal,
    token,
    appointmentId,
  }: {
    signal?: AbortSignal;
    token: string;
    appointmentId: number;
  }): Promise<SuccessResponse<Appointment>> {
    this.appendToken(token);

    return (
      await this.axiosInstance.patch<SuccessResponse<Appointment>>(
        `${this.axiosInstance.getUri()}/${
          this.domain
        }/appointments/${appointmentId}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          ...(signal && { signal }),
        }
      )
    ).data;
  }
}
