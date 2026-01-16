"use client";

import { EnvironmentEnum } from "@/helpers/constants/environment.constant";
import { NodeConfig } from "@/helpers/security/secrets/dotenv.secret";
// import env from '@/security/secrets/env';
import {
  QueryClient,
  QueryClientProvider,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { useState } from "react";

// export const queryClientServerSideInstance = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // gcTime: 0, // Minute (time for caching)
//       refetchOnMount: true,
//       refetchOnWindowFocus: false,
//       retry: 2,
//       retryDelay: 1000,
//       staleTime: 60 * 1000,
//     },
//   },
// });

// export async function prefetchEntitiesQuery<TResponse>(
//   queryKey: string,
//   queryAPI: QueryFunction<TResponse[], QueryKey, never>,
// ) {
//   return await queryClientServerSideInstance.prefetchQuery({
//     queryKey: [queryKey],
//     queryFn: queryAPI,
//   });
// }

// export async function prefetchEntityQuery<TResponse>(
//   queryKey: string,
//   queryAPI: QueryFunction<TResponse, QueryKey, never>,
// ) {
//   return await queryClientServerSideInstance.prefetchQuery({
//     queryKey: [queryKey],
//     queryFn: queryAPI,
//   });
// }

// export async function prefetchEntitiesPaginatedQuery<TResponse>(
//   queryKey: string,
//   queryAPI: QueryFunction<IGetSuccessResponse<TResponse>, QueryKey, never>,
// ) {
//   return await queryClientServerSideInstance.prefetchQuery({
//     queryKey: [queryKey],
//     queryFn: queryAPI,
//   });
// }

function QueryClientContextProvider({ children }: any) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          // gcTime: 0, // Minute (time for caching)
          refetchOnMount: true,
          refetchOnWindowFocus: false,
          retry: 2,
          retryDelay: 1000,
          staleTime: 0,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {NodeConfig.APP_ENV === EnvironmentEnum.Development && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
          position="bottom"
        />
      )}
    </QueryClientProvider>
  );
}

export default QueryClientContextProvider;
