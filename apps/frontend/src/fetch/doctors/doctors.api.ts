import { EntityFilter } from "@/helpers/dto/pagination.dto";
import { IGetSuccessResponse } from "@/helpers/dto/response.dto";
import {
  AxiosInstance,
  ContentType,
  paginationQueryParamsGenerator,
} from "@/helpers/fetch/axios/axios.helper";
import { User } from "@repo/db";
import { SuccessResponse } from "@repo/shared";

export class DoctorsPatientApi {
  public axiosInstance;
  public domain;

  constructor() {
    this.domain = "patients";
    this.axiosInstance = AxiosInstance(ContentType.ApplicationJson, 1);
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
    token: string;
    info: EntityFilter;
    signal?: AbortSignal;
  }): Promise<IGetSuccessResponse<User>> {
    this.appendToken(token);

    return (
      await this.axiosInstance.get<SuccessResponse<IGetSuccessResponse<User>>>(
        paginationQueryParamsGenerator(
          `${this.axiosInstance.getUri()}/${this.domain}/doctors`,
          info
        ),
        {
          headers: { Authorization: `Bearer ${token}` },
          ...(signal && { signal }),
        }
      )
    ).data.data;
  }

  async getOne({
    signal,
    doctorId,
    token,
  }: {
    token: string;
    doctorId: number;
    signal?: AbortSignal;
  }): Promise<User> {
    return (
      await this.axiosInstance.get<SuccessResponse<User>>(
        `${this.axiosInstance.getUri()}/${this.domain}/doctors/${doctorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          ...(signal && { signal }),
        }
      )
    ).data.data;
  }
}
