"use client";

import {
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { HttpError } from "@/helpers/errors/exceptions/http.exception";
import {
  checkIfCashedData,
  errorToast,
  loadingToast,
  successToast,
} from "./server.helper";
import { toast } from "sonner";
import {
  DecoupledCreateUpdateDeleteFetch,
  DecoupledReadFetch,
  IUseOperationAPI,
  ShowToastOptions,
  TGetOneOperationAPI,
  TGetOperationAPI,
  TUseOperationAPI,
} from "./server.types";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { IUserAuth } from "@/helpers/security/auth/user.auth";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import { TOrderAPI, TRestoreAPI, TUpdateAPI } from "../types/fetch.types";
import { ErrorResponse, SuccessResponse } from "@repo/shared";
import { IGetSuccessResponse } from "@/helpers/dto/response.dto";
import { EntityFilter } from "@/helpers/dto/pagination.dto";
import { useUserAuth } from "@/providers/auth.provider";

export const sharedShowToastOptions: ShowToastOptions = {
  loadingMessage: "Working Progress ...",
  failedToast: true,
  loadingToast: true,
  successToast: true,
};

//#region CRUD operations

export function useCreateAPI<TCreateDto, TResponse>({
  page = 0,
  showToastOptions = sharedShowToastOptions,
  onCancelRequest,
  metaInfo,
  afterFailed,
  afterSuccess,
}: IUseOperationAPI<TResponse> & {
  metaInfo: DecoupledCreateUpdateDeleteFetch<TResponse, TCreateDto>;
}) {
  const {
    mutationFn,
    modelNameAsPlural,
    enableRequestCancelation,
    modelNameAsSingular,
  } = metaInfo;
  const queryClient = useQueryClient();

  let loadingToastId: number;
  const controller = new AbortController();
  const mutation = useMutation<
    SuccessResponse<TResponse>,
    HttpError<ErrorResponse | string>,
    TCreateDto
  >({
    mutationFn: mutationFn,
    onSuccess: (createdEntity: SuccessResponse<TResponse>, _, __) => {
      showToastOptions.loadingToast && toast.dismiss(loadingToastId);
      const cashedData = checkIfCashedData<TResponse>(
        queryClient,
        modelNameAsPlural,
        page
      );
      if (cashedData) {
        queryClient.setQueryData(
          page ? [modelNameAsPlural, page] : [modelNameAsPlural],
          (
            oldEntities?:
              | IGetSuccessResponse<TResponse>
              | {
                  pageParams: number[];
                  pages: IGetSuccessResponse<TResponse>[];
                }
          ) => {
            if (typeof oldEntities === "undefined") return [];

            let specificOldEntities;
            if (page !== 0) {
              queryClient.removeQueries({
                queryKey: [modelNameAsPlural, page],
              });
              queryClient.refetchQueries({
                queryKey: [modelNameAsPlural, page],
              });
            } else {
              specificOldEntities = oldEntities as {
                pageParams: number[];
                pages: IGetSuccessResponse<TResponse>[];
              };

              specificOldEntities?.pages[
                specificOldEntities?.pages?.length - 1
              ].entities.push(createdEntity.data);
            }

            return specificOldEntities;
          }
        );
      }

      showToastOptions.successToast &&
        successToast(`${modelNameAsSingular} has created successfully`);

      if (afterSuccess) afterSuccess(createdEntity.data);
    },
    onError: (error, _, __) => {
      showToastOptions.loadingToast && toast.dismiss(loadingToastId);
      showToastOptions.failedToast && errorToast(error);
      if (afterFailed) afterFailed(error);
    },
  });

  if (mutation.isPending && showToastOptions.loadingToast)
    loadingToastId = loadingToast({
      message: showToastOptions.loadingMessage,
      ...(enableRequestCancelation && {
        buttonActionProps: {
          action: () => {
            controller.abort();
            if (onCancelRequest) onCancelRequest();
          },
        },
      }),
    });
  return mutation;
}

export function useUpdateAPI<TUpdateDto, TResponse>({
  page = 0,
  showToastOptions = sharedShowToastOptions,
  onCancelRequest,
  metaInfo,
  afterFailed,
  afterSuccess,
}: IUseOperationAPI<TResponse> & {
  metaInfo: DecoupledCreateUpdateDeleteFetch<TResponse, TUpdateDto>;
}) {
  const {
    mutationFn,
    modelNameAsPlural,
    enableRequestCancelation,
    modelNameAsSingular,
  } = metaInfo;
  const queryClient = useQueryClient();

  let loadingToastId: number;
  const controller = new AbortController();
  const mutation = useMutation<
    SuccessResponse<TResponse>,
    HttpError<ErrorResponse | string>,
    TUpdateDto
  >({
    mutationFn: mutationFn,
    onSuccess: (updatedEntity: SuccessResponse<TResponse>, _, __) => {
      showToastOptions.loadingToast && toast.dismiss(loadingToastId);
      const cashedData = checkIfCashedData<TResponse>(
        queryClient,
        modelNameAsPlural,
        page
      );

      if (cashedData) {
        queryClient.setQueryData(
          page ? [modelNameAsPlural, page] : [modelNameAsPlural],
          (
            oldEntities?:
              | IGetSuccessResponse<TResponse>
              | {
                  pageParams: number[];
                  pages: IGetSuccessResponse<TResponse>[];
                }
          ) => {
            if (typeof oldEntities === "undefined") return [];

            let specificOldEntities;
            if (page !== 0) {
              specificOldEntities =
                oldEntities as IGetSuccessResponse<TResponse>;
              specificOldEntities.entities = specificOldEntities.entities.map(
                (entity: any) =>
                  entity.id === (updatedEntity.data as any).id
                    ? updatedEntity.data
                    : entity
              );
            } else {
              specificOldEntities = oldEntities as {
                pageParams: number[];
                pages: IGetSuccessResponse<TResponse>[];
              };
              specificOldEntities?.pages.forEach((page) => {
                page!.entities =
                  page?.entities.map((entity: any) =>
                    entity.id === (updatedEntity.data as any).id
                      ? updatedEntity.data
                      : entity
                  ) || [];
              });
            }

            return specificOldEntities;
          }
        );
      }

      showToastOptions.successToast &&
        successToast(`${modelNameAsSingular} has updated successfully`);
      if (afterSuccess) afterSuccess(updatedEntity.data);
    },
    onError: (error, _, __) => {
      showToastOptions.loadingToast && toast.dismiss(loadingToastId);
      showToastOptions.failedToast && errorToast(error);
      if (afterFailed) afterFailed(error);
    },
  });

  if (mutation.isPending && showToastOptions.loadingToast)
    loadingToastId = loadingToast({
      message: showToastOptions.loadingMessage,
      ...(enableRequestCancelation && {
        buttonActionProps: {
          action: () => {
            controller.abort();
            if (onCancelRequest) onCancelRequest();
          },
        },
      }),
    });
  return mutation;
}

export function useDeleteAPI<TResponse>({
  page = 0,
  showToastOptions = sharedShowToastOptions,
  onCancelRequest,
  metaInfo,
  afterFailed,
  afterSuccess,
}: IUseOperationAPI<TResponse> & {
  metaInfo: DecoupledCreateUpdateDeleteFetch<TResponse, number>;
}) {
  const {
    mutationFn,
    modelNameAsPlural,
    enableRequestCancelation,
    modelNameAsSingular,
  } = metaInfo;
  const queryClient = useQueryClient();

  let loadingToastId: number;
  const controller = new AbortController();
  const mutation = useMutation<
    SuccessResponse<TResponse>,
    HttpError<ErrorResponse | string>,
    number
  >({
    mutationFn: mutationFn,
    onSuccess: (deletedEntity: SuccessResponse<TResponse>, _, __) => {
      showToastOptions.loadingToast && toast.dismiss(loadingToastId);
      const cashedData = checkIfCashedData<TResponse>(
        queryClient,
        modelNameAsPlural,
        page
      );

      if (cashedData) {
        queryClient.setQueryData(
          page ? [modelNameAsPlural, page] : [modelNameAsPlural],
          (
            oldEntities?:
              | IGetSuccessResponse<TResponse>
              | {
                  pageParams: number[];
                  pages: IGetSuccessResponse<TResponse>[];
                }
          ) => {
            if (typeof oldEntities === "undefined") return [];

            if (page !== 0) {
              queryClient.removeQueries({
                queryKey: [modelNameAsPlural, page],
              });
              queryClient.refetchQueries({
                queryKey: [modelNameAsPlural, page],
              });
            } else {
              const specificOldEntities = oldEntities as {
                pageParams: number[];
                pages: IGetSuccessResponse<TResponse>[];
              };

              specificOldEntities?.pages.forEach((page) => {
                page!.entities =
                  page?.entities.filter(
                    (entity: any) =>
                      entity.id !== (deletedEntity.data as any).id
                  ) || [];
              });
            }

            return oldEntities;
          }
        );
      }

      showToastOptions.successToast &&
        successToast(`${modelNameAsSingular} has deleted successfully`);

      if (afterSuccess) afterSuccess(deletedEntity.data);
    },
    onError: (error, _, __) => {
      showToastOptions.failedToast && toast.dismiss(loadingToastId);
      showToastOptions.failedToast && errorToast(error);
      if (afterFailed) afterFailed(error);
    },
  });

  if (mutation.isPending && showToastOptions.loadingToast)
    loadingToastId = loadingToast({
      message: showToastOptions.loadingMessage,
      ...(onCancelRequest && {
        buttonActionProps: {
          action: () => {
            controller.abort();
            onCancelRequest();
          },
        },
      }),
    });
  return mutation;
}

export function useGet<TResponse>(
  infoPagination: EntityFilter,
  isEnabled = true,
  metaInfo: DecoupledReadFetch<IGetSuccessResponse<TResponse>>
) {
  const { queryFn, modelNameAsPlural } = metaInfo;

  const page = infoPagination?.pagination?.page ?? 1;

  const query = useQuery<
    IGetSuccessResponse<TResponse>,
    HttpError<ErrorResponse | string>
  >({
    queryKey: [
      modelNameAsPlural,
      page,
      //  { ...infoPagination.filter }
    ],
    queryFn: queryFn,
    enabled: isEnabled,
  });
  return query;
}

export function useInfiniteGetAPI<TResponse>(
  infoPagination: EntityFilter,
  isEnabled = true,
  metaInfo: DecoupledReadFetch<IGetSuccessResponse<TResponse>>
) {
  const { queryFn, modelNameAsPlural } = metaInfo;
  const query = useInfiniteQuery<
    IGetSuccessResponse<TResponse>,
    HttpError<ErrorResponse | string>
  >({
    queryKey: [
      modelNameAsPlural,
      // { ...infoPagination.filter }
    ],
    queryFn: queryFn as any,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      let totalPages = lastPage.meta.count / infoPagination!.pagination!.limit!;
      totalPages =
        totalPages % 1 != 0 ? Math.floor(totalPages) + 1 : totalPages;
      const currentPage = lastPage!.meta?.page;

      currentPage < totalPages ? currentPage + 1 : null;
    },
    enabled: isEnabled,
    //   maxPages:
    //     entityAPIs
    //       .get(pagination, userAuth.token)
    //       .then((response) => response.meta.count) || undefined,
  });

  return query;
}

// export function useReorderAPI<TResponse>({
//   page = 0,
//   showToastOptions = sharedShowToastOptions,
//   onCancelRequest,
//   metaInfo,
// }: IUseReorderAPI & { metaInfo: DecoupledCRUDFetch }) {
//   const {
//     entityAPIs,
//     modelNameAsPlural,
//     modelNameAsSingular,
//     enableRequestCancelation,
//   } = metaInfo;

//   let loadingToastId: number;
//   const controller = new AbortController();
//   const queryClient = useQueryClient();
//   const shadcnUiToast = useToast();
//   const [auth, _] = useLocalStorage<IUserAuth>(LocalStorageKeys.UserAuth);

//   const mutation = useMutation<
//     TResponse,
//     HttpError<IErrorResponse | string>,
//     TOrderAPI
//   >({
//     mutationFn: ({ id, order }) =>
//       entityAPIs.reorder({
//         id,
//         order,
//         token: auth.token,
//         ...(enableRequestCancelation && { signal: controller.signal }),
//       }),
//     onSuccess: (reorderedEntity: TResponse, _, __) => {
//       showToastOptions.loadingToast && toast.dismiss(loadingToastId);

//       const cashedData = checkIfCashedData<TResponse>(
//         queryClient,
//         modelNameAsPlural,
//         page
//       );

//       if (cashedData) {
//         queryClient.setQueryData(
//           page ? [modelNameAsPlural, page] : [modelNameAsPlural],
//           (
//             oldEntities?:
//               | IGetSuccessResponse<TResponse>
//               | {
//                   pageParams: number[];
//                   pages: IGetSuccessResponse<TResponse>[];
//                 }
//           ) => {
//             if (typeof oldEntities === "undefined") return [];

//             let specificOldEntities;
//             if (page !== 0) {
//               specificOldEntities =
//                 oldEntities as IGetSuccessResponse<TResponse>;
//               specificOldEntities.data = specificOldEntities.data.map(
//                 (entity: any) =>
//                   entity.id === (reorderedEntity as any).id
//                     ? reorderedEntity
//                     : entity
//               );
//             } else {
//               specificOldEntities = oldEntities as {
//                 pageParams: number[];
//                 pages: IGetSuccessResponse<TResponse>[];
//               };
//               specificOldEntities?.pages.forEach((page) => {
//                 page!.data =
//                   page?.data.map((entity: any) =>
//                     entity.id === (reorderedEntity as any).id
//                       ? reorderedEntity
//                       : entity
//                   ) || [];
//               });
//             }

//             return specificOldEntities;
//           }
//         );
//       }

//       showToastOptions.successToast &&
//         successToast(`${modelNameAsSingular} has restored successfully`);
//     },
//     onError: (error, _, __) => {
//       showToastOptions.failedToast && toast.dismiss(loadingToastId);
//       errorToast(shadcnUiToast, error);
//     },
//   });

//   if (mutation.isPending && showToastOptions.loadingToast)
//     loadingToastId = loadingToast({
//       message: showToastOptions.loadingMessage,
//       ...(enableRequestCancelation && {
//         buttonActionProps: {
//           action: () => {
//             controller.abort();
//             if (onCancelRequest) onCancelRequest();
//           },
//         },
//       }),
//     });
//   return mutation;
// }

// export function useRestoreAPI<TResponse>({
//   page = 0,
//   showToastOptions = sharedShowToastOptions,
//   onCancelRequest,
//   metaInfo,
// }: IUseUpdateAPI & { metaInfo: DecoupledCRUDFetch }) {
//   const {
//     entityAPIs,
//     modelNameAsPlural,
//     modelNameAsSingular,
//     enableRequestCancelation,
//   } = metaInfo;
//   let loadingToastId: number;
//   const [auth, _] = useLocalStorage<IUserAuth>(LocalStorageKeys.UserAuth);
//   const queryClient = useQueryClient();
//   const shadcnUiToast = useToast();
//   const controller = new AbortController();

//   const mutation = useMutation<
//     TResponse,
//     HttpError<IErrorResponse | string>,
//     TRestoreAPI
//   >({
//     mutationFn: ({ id }) =>
//       entityAPIs.restore({
//         id,
//         token: auth.token,
//         ...(enableRequestCancelation && { signal: controller.signal }),
//       }),
//     onSuccess: (restoredEntity: TResponse, _, __) => {
//       showToastOptions.loadingToast && toast.dismiss(loadingToastId);
//       const cashedData = checkIfCashedData<TResponse>(
//         queryClient,
//         modelNameAsPlural,
//         page
//       );

//       if (cashedData) {
//         queryClient.setQueryData(
//           page ? [modelNameAsPlural, page] : [modelNameAsPlural],
//           (
//             oldEntities?:
//               | IGetSuccessResponse<TResponse>
//               | {
//                   pageParams: number[];
//                   pages: IGetSuccessResponse<TResponse>[];
//                 }
//           ) => {
//             if (typeof oldEntities === "undefined") return [];

//             let specificOldEntities;
//             if (page !== 0) {
//               specificOldEntities =
//                 oldEntities as IGetSuccessResponse<TResponse>;
//               specificOldEntities.data = specificOldEntities.data.map(
//                 (entity: any) =>
//                   entity.id === (restoredEntity as any).id
//                     ? restoredEntity
//                     : entity
//               );
//             } else {
//               specificOldEntities = oldEntities as {
//                 pageParams: number[];
//                 pages: IGetSuccessResponse<TResponse>[];
//               };
//               specificOldEntities?.pages.forEach((page) => {
//                 page!.data =
//                   page?.data.map((entity: any) =>
//                     entity.id === (restoredEntity as any).id
//                       ? restoredEntity
//                       : entity
//                   ) || [];
//               });
//             }

//             return specificOldEntities;
//           }
//         );
//       }

//       showToastOptions.successToast &&
//         successToast(`${modelNameAsSingular} has restored successfully`);
//     },
//     onError: (error, _, __) => {
//       showToastOptions.loadingToast && toast.dismiss(loadingToastId);
//       showToastOptions.failedToast && errorToast(shadcnUiToast, error);
//     },
//   });

//   if (mutation.isPending && showToastOptions.loadingToast)
//     loadingToastId = loadingToast({
//       message: showToastOptions.loadingMessage,
//       ...(enableRequestCancelation && {
//         buttonActionProps: {
//           action: () => {
//             controller.abort();
//             if (onCancelRequest) onCancelRequest();
//           },
//         },
//       }),
//     });
//   return mutation;
// }

//#endregion

export function useOperationAPI<IResponse, IOperationEntityDto>({
  fetchAPI,
  // shadcnUiToast,
  showToastOptions = sharedShowToastOptions,
  successMessage,
  afterFailed,
  afterSuccess,
  enableRequestCancellation,
  onCancelRequest,
}: TUseOperationAPI<IResponse, IOperationEntityDto>) {
  let loadingToastId: number = 0;
  const controller = new AbortController();
  const mutation = useMutation<
    SuccessResponse<IResponse>,
    HttpError<ErrorResponse | string>,
    IOperationEntityDto
  >({
    mutationFn: fetchAPI,
    onSuccess: (entity: SuccessResponse<IResponse>, _, __) => {
      showToastOptions?.loadingToast && toast.dismiss(loadingToastId);

      if (!!afterSuccess) {
        afterSuccess(entity.data);
      }
      showToastOptions?.successToast &&
        successToast(successMessage(entity.data));
    },
    onError: (error, _, __) => {
      showToastOptions?.loadingToast && toast.dismiss(loadingToastId);
      if (!!afterFailed) {
        afterFailed(error);
      }
      showToastOptions?.failedToast && errorToast(error);
    },
  });

  if (mutation.isPending && showToastOptions.loadingToast) {
    loadingToastId = loadingToast({
      message: showToastOptions.loadingMessage,
      ...(enableRequestCancellation && {
        buttonActionProps: {
          action: () => {
            controller.abort();
            if (onCancelRequest) onCancelRequest();
          },
        },
      }),
    });
  }

  return mutation;
}

export function useGetOperationAPI<TResponse>({
  queryKey,
  queryAPI,
  isEnabled = true,
}: TGetOperationAPI<TResponse>) {
  const query = useQuery<TResponse[], HttpError<ErrorResponse | string>>({
    queryKey,
    queryFn: queryAPI,
    enabled: isEnabled,
  });

  return query;
}

export function useGetOneOperationAPI<TResponse>({
  queryKey,
  queryAPI,
  isEnabled = true,
}: TGetOneOperationAPI<TResponse>) {
  const query = useQuery<TResponse, HttpError<ErrorResponse | string>>({
    queryKey,
    queryFn: queryAPI,
    enabled: isEnabled,
  });

  return query;
}
