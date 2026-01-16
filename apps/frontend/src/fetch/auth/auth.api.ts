import { AxiosInstance, ContentType } from "@/helpers/fetch/axios/axios.helper";
import { User } from "@repo/db";
import { LoginSchema, RegisterSchema, SuccessResponse } from "@repo/shared";
import { z } from "zod";
import { AuthResponseDto, LoginAuthDto, RegisterAuthDto } from "./auth.dto";

export class AuthApi {
  public axiosInstance;
  constructor(public domain: string, apiVersion: number) {
    this.axiosInstance = AxiosInstance(ContentType.ApplicationJson, apiVersion);
  }

  public appendToken(token: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  async register({
    signal,
    data,
  }: {
    data: RegisterAuthDto;
    signal?: AbortSignal;
  }): Promise<SuccessResponse<AuthResponseDto>> {
    console.log(this.axiosInstance.getUri());
    return (
      await this.axiosInstance.post<SuccessResponse<AuthResponseDto>>(
        `${this.axiosInstance.getUri()}/${this.domain}/auth/register`,
        data,
        {
          ...(signal && { signal }),
        }
      )
    ).data;
  }

  async login({
    signal,
    data,
  }: {
    data: LoginAuthDto;
    signal?: AbortSignal;
  }): Promise<SuccessResponse<AuthResponseDto>> {
    return (
      await this.axiosInstance.post<SuccessResponse<AuthResponseDto>>(
        `${this.axiosInstance.getUri()}/${this.domain}/auth/login`,
        data,
        {
          ...(signal && { signal }),
        }
      )
    ).data;
  }

  async authMe({
    signal,
    token,
  }: {
    token: string;
    signal?: AbortSignal;
  }): Promise<SuccessResponse<User>> {
    if (token) this.appendToken(token);

    return (
      await this.axiosInstance.get<SuccessResponse<User>>(
        `${this.axiosInstance.getUri()}/${this.domain}/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
          ...(signal && { signal }),
        }
      )
    ).data;
  }
}
