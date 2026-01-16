"use client";

import axios, { AxiosResponse } from "axios";
// import { WebView } from 'react-native-webview';
import { ErrorResponse } from "@repo/shared";
import { HttpError } from "../../errors/exceptions/http.exception";
import { axiosErrorCodes } from "./axios.constant";
import {
  httpErrorsMessages,
  responseMessages,
} from "@/helpers/constants/response-messages.constant";
import { StatusCode } from "@/helpers/constants/status-codes.constant";

function httpErrorHandler(error: any) {
  if (error === null || error === undefined) {
    throw new HttpError(httpErrorsMessages.UNRECOREVABLE_ERROR);
  }
  if (axios.isAxiosError(error)) {
    //here we have a type guard check, error inside this if will be treated as AxiosError
    const response = error?.response;
    const request = error?.request;
    // const config = error?.config; //here we have access the config used to make the api call (we can make a retry using this conf)

    if (error.code === axiosErrorCodes.ERR_NETWORK) {
      // return httpErrorsMessages.ERR_NETWORK;
      throw new HttpError(httpErrorsMessages.ERR_NETWORK);
    } else if (error.code === axiosErrorCodes.ERR_CANCELED) {
      // return httpErrorsMessages.ERR_CANCELED;
      throw new HttpError(httpErrorsMessages.ERR_CANCELED);
    }
    if (response) {
      //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
      const statusCode = response?.status;
      if (statusCode === StatusCode.NotFound) {
        if (
          ((response.data as ErrorResponse).error as string)?.includes("Cannot")
        ) {
          throw new HttpError(httpErrorsMessages.API_NOT_FOUND);
        } else {
          throw new HttpError((response.data as ErrorResponse).error);
        }
      } else if (statusCode === StatusCode.BadRequest) {
        throw new HttpError((response.data as ErrorResponse).error);
      } else if (statusCode === StatusCode.ForbiddenAccess) {
        throw new HttpError(httpErrorsMessages.FORBIDDEN_ACCESS);
      } else if (statusCode === StatusCode.ServerError) {
        throw new HttpError(httpErrorsMessages.SERVER_ERROR);
      }
      // 415 (Not accepted mime-type) || ...
      else {
        throw new HttpError((response.data as ErrorResponse).error);
      }
    } else if (request) {
      throw new HttpError(httpErrorsMessages.SERVER_ERROR);
    }
  }
  //Something happened in setting up the request and triggered an Error
  throw new HttpError(httpErrorsMessages.SETUP_REQUEST_ERROR);
}

export function responseHandler(response: AxiosResponse<any>) {
  // const config = response?.config;
  // if (config.raw as any) {
  //   return response;
  // }
  if (
    response.status == StatusCode.Ok ||
    response.status == StatusCode.Created
  ) {
    // const data = response?.data;
    //   if (!data) {
    //   throw new HttpError(responseMessages.EMPTY_DATA);
    // }

    return response;
  }

  throw new HttpError(responseMessages.INVALID_STATUS_CODE);
}

export function responseErrorHandler(response: any) {
  const config = response?.config;
  if (config.raw) {
    return response;
  }
  // the code of this function was written in above section.
  return httpErrorHandler(response);
}
