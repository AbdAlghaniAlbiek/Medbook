import { EntityFilter } from "@/helpers/dto/pagination.dto";

export type TCreateAPI<T> = {
  entity: T;
  token?: string;
  signal?: AbortSignal;
};
export type TUpdateAPI<T> = {
  id: number;
  entity: T;
  token?: string;
  signal?: AbortSignal;
};
export type TDeleteAPI = {
  id: number;
  token?: string;
  signal?: AbortSignal;
};
export type TGetAPI = {
  options: EntityFilter;
  signal?: AbortSignal;
  token?: string;
};
export type IGetAllAPI = {
  signal?: AbortSignal;
  token?: string;
};

export type TGetOneAPI = {
  id: number;
  signal?: AbortSignal;
  token?: string;
};
export type TCreateManyAPI<T> = {
  entities: T[];
  token?: string;
  signal?: AbortSignal;
};
export type TUpdateManyAPI<T> = {
  ids: number[];
  entity: T;
  token?: string;
  signal?: AbortSignal;
};
export type TDeleteManyAPI = {
  ids: number[];
  token?: string;
  signal?: AbortSignal;
};
export type TOrderAPI = {
  id: number;
  order: number;
  token?: string;
  signal?: AbortSignal;
};
export type TRestoreAPI = {
  id: number;
  token?: string;
  signal?: AbortSignal;
};
