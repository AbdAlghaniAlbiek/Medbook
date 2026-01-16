import { HttpError } from "@/helpers/errors/exceptions/http.exception";
import {
  MutationFunction,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";
import { EntityAPIs } from "../axios/axios.entity";
import { ErrorResponse, SuccessResponse } from "@repo/shared";
import { EntityFilter } from "@/helpers/dto/pagination.dto";
import { IGetSuccessResponse } from "@/helpers/dto/response.dto";
export interface ShowToastOptions {
  loadingMessage: string;
  loadingToast: boolean;
  successToast: boolean;
  failedToast: boolean;
}

export type IUseOperationAPI<TResponse> = {
  page: number;
  showToastOptions: ShowToastOptions;
  onCancelRequest?: () => void;
  afterSuccess?: (entity: TResponse) => void;
  afterFailed?: (error: HttpError<string | ErrorResponse>) => void;
};

export type IUseGetAPI = {
  infoPagination: EntityFilter;
  isEnabled?: boolean;
  onCancelRequest?: () => void;
};

export type IUseInfiniteGetAPI = {
  infoPagination: EntityFilter;
  isEnabled?: boolean;
  onCancelRequest?: () => void;
};

export type IUseGetOneAPI = {
  id: number;
  isEnabled: boolean;
  onCancelRequest?: () => void;
};

export type IUseReorderAPI = {
  page: number;
  showToastOptions: ShowToastOptions;
  onCancelRequest?: () => void;
};

// export type IUseOperationAPI = {
//   page: number;
//   showToastOptions: ShowToastOptions;
//   onCancelRequest?: () => void;
// };

export type TUseOperationAPI<T, U> = {
  fetchAPI: MutationFunction<SuccessResponse<T>, U>;
  // shadcnUiToast: any;
  successMessage: (entity: T) => string;
  showToastOptions?: ShowToastOptions;
  enableRequestCancellation?: boolean;
  afterSuccess?: (entity: T) => void;
  afterFailed?: (error: HttpError<ErrorResponse | string>) => void;
  onCancelRequest?: () => void;
};

export type TGetOperationAPI<T> = {
  queryKey: QueryKey;
  queryAPI: QueryFunction<T[], QueryKey, never>;
  isEnabled?: boolean;
};

export type TGetOneOperationAPI<T> = {
  queryKey: QueryKey;
  queryAPI: QueryFunction<T, QueryKey, never>;
  isEnabled?: boolean;
};

export type DecoupledReadFetch<TResponse> = {
  modelNameAsPlural: string;
  queryFn: QueryFunction<TResponse, readonly unknown[], never>;
};

export type DecoupledCreateUpdateDeleteFetch<TResponse, TOperation> = {
  modelNameAsPlural: string;
  modelNameAsSingular: string;
  mutationFn: MutationFunction<SuccessResponse<TResponse>, TOperation>;
  enableRequestCancelation?: boolean;
};
