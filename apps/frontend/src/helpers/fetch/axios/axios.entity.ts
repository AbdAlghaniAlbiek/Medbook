import { cookies } from "next/headers";
import {
  IGetAllAPI,
  TCreateAPI,
  TCreateManyAPI,
  TDeleteAPI,
  TDeleteManyAPI,
  TGetAPI,
  TGetOneAPI,
  TOrderAPI,
  TRestoreAPI,
  TUpdateAPI,
  TUpdateManyAPI,
} from "../types/fetch.types";
import {
  AxiosInstance,
  ContentType,
  paginationQueryParamsGenerator,
} from "./axios.helper";
import { IGetSuccessResponse } from "@/helpers/dto/response.dto";
import { SuccessResponse } from "@repo/shared";

// Important Note:
// Token will be sent inside the Cookie to backend server
// You need to define "withCredential" property in axios request configuration.

export class EntityAPIs<TCreateDto, TUpdateDto, TReadDto, TResponse> {
  public axiosInstance;
  constructor(public endpointUrl: string, apiVersion: number) {
    this.axiosInstance = AxiosInstance(ContentType.ApplicationJson, apiVersion);
  }

  public appendToken(token: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  async create({
    entity,
    token,
    signal,
  }: TCreateAPI<TCreateDto>): Promise<SuccessResponse<TResponse>> {
    if (token) this.appendToken(token);

    return (
      await this.axiosInstance.post<SuccessResponse<TResponse>>(
        `${this.axiosInstance.getUri()}/${this.endpointUrl}`,
        entity,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          ...(signal && { signal }),
        }
      )
    ).data;
  }

  async update({
    entity,
    id,
    token,
    signal,
  }: TUpdateAPI<TUpdateDto>): Promise<SuccessResponse<TResponse>> {
    if (token) this.appendToken(token);

    return (
      await this.axiosInstance.put<SuccessResponse<TResponse>>(
        `${this.axiosInstance.getUri()}/${this.endpointUrl}/${id}`,
        entity,
        {
          headers: { Authorization: `Bearer ${token}` },

          withCredentials: true,
          ...(signal && { signal }),
        }
      )
    ).data;
  }

  async delete({
    id,
    token,
    signal,
  }: TDeleteAPI): Promise<SuccessResponse<TResponse>> {
    if (token) this.appendToken(token);

    return (
      await this.axiosInstance.delete<SuccessResponse<TResponse>>(
        `${this.axiosInstance.getUri()}/${this.endpointUrl}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },

          withCredentials: true,
          ...(signal && { signal }),
        }
      )
    ).data;
  }

  async get({
    options,
    signal,
    token,
  }: TGetAPI): Promise<SuccessResponse<IGetSuccessResponse<TResponse>>> {
    if (token) this.appendToken(token);

    return (
      await this.axiosInstance.get<
        SuccessResponse<IGetSuccessResponse<TResponse>>
      >(
        paginationQueryParamsGenerator(
          `${this.axiosInstance.getUri()}/${this.endpointUrl}`,
          options
        ),
        {
          headers: { Authorization: `Bearer ${token}` },
          // headers: { Authorization: tokenVal },
          ...(signal && { signal }),
          withCredentials: true,
        }
      )
    ).data;
  }

  // async getAll({ signal, token }: IGetAllAPI) {
  //   return (
  //     await this.axiosInstance.get<IGetSuccessResponse<TResponse>>(
  //       `${this.axiosInstance.getUri()}/${this.endpointUrl}/get/all`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         // headers: { Authorization: tokenVal },
  //         ...(signal && { signal }),
  //         withCredentials: true,
  //       }
  //     )
  //   ).data;
  // }

  async getOne({
    id,
    signal,
    token,
  }: TGetOneAPI): Promise<SuccessResponse<TResponse>> {
    if (token) this.appendToken(token);

    return (
      await this.axiosInstance.get(
        `${this.axiosInstance.getUri()}/${this.endpointUrl}/${id}`,
        {
          signal,
          withCredentials: true,
        }
      )
    ).data;
  }

  // async reorder({ id, order, token, signal }: TOrderAPI) {
  //   if (token) this.appendToken(token);

  //   return (
  //     await this.axiosInstance.patch<TResponse>(
  //       `${this.axiosInstance.getUri()}/${
  //         this.endpointUrl
  //       }/${id}/reorder/${order}`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` },

  //         withCredentials: true,
  //         ...(signal && { signal }),
  //       }
  //     )
  //   ).data;
  // }

  // async restore({ id, token, signal }: TRestoreAPI) {
  //   if (token) this.appendToken(token);

  //   return (
  //     await this.axiosInstance.patch<TResponse>(
  //       `${this.axiosInstance.getUri()}/${this.endpointUrl}/${id}/restore`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` },

  //         withCredentials: true,
  //         ...(signal && { signal }),
  //       }
  //     )
  //   ).data;
  // }
}
