import axios from "axios";
import {
  Environment,
  EnvironmentEnum,
} from "../../constants/environment.constant";
import { LogicError } from "../../errors/exceptions/login.exception";
import { responseErrorHandler, responseHandler } from "./axios.handler";
import {
  NodeConfig,
  ServerConfig,
} from "@/helpers/security/secrets/dotenv.secret";
import { EntityFilter } from "@/helpers/dto/pagination.dto";
// import env from '@/security/secrets/env';
// import { NodeConfig, ServerConfig } from '@/security/secrets/dotenv.secret';

const BASE_URL =
  NodeConfig.APP_ENV === EnvironmentEnum.Development
    ? ServerConfig.LOCAL_BACKEND_URL
    : ServerConfig.REMOTE_BACKEND_URL;

export enum ContentType {
  ApplicationJson = `application/json`,
  XwwwFormUrlencoded = `application/x-www-form-urlencoded`,
  FormData = `multipart/form-data`,
}

function filterToQueryParamConverter(mainPropName: string, filter: any) {
  let stringAccumulator = "";
  const properties = Object.keys(filter);
  const values = Object.values(filter);

  for (let i = 0; i < properties.length; i++) {
    stringAccumulator += `${mainPropName}%5B${properties[i]}%5D=${values[i]}`;
    if (i !== properties.length - 1) stringAccumulator += "&";
  }

  return stringAccumulator;
}

function orderAndPaginationQueryParamConverter(
  mainPropName: string,
  filter: any
) {
  let stringAccumulator = "";
  const properties = Object.keys(filter);
  const values = Object.values(filter);

  for (let i = 0; i < properties.length; i++) {
    stringAccumulator += `${mainPropName}%5B${properties[i]}%5D=${values[i]}`;
    if (i !== properties.length - 1) stringAccumulator += "&";
  }

  return stringAccumulator;
}

export function paginationQueryParamsGenerator(
  url: string,
  paramsObject?: EntityFilter
) {
  let queryParameters = "";

  if (paramsObject?.filter) {
    const filterQueryParam = filterToQueryParamConverter(
      "filter",
      paramsObject?.filter
    );

    queryParameters += filterQueryParam + "&";
  }
  if (paramsObject?.pagination) {
    const paginationQueryParam = orderAndPaginationQueryParamConverter(
      "pagination",
      paramsObject?.pagination
    );
    queryParameters += paginationQueryParam + "&";
  }
  if (paramsObject?.order) {
    const orderQueryParam = orderAndPaginationQueryParamConverter(
      "order",
      paramsObject?.order
    );
    queryParameters += orderQueryParam + "&";
  }

  return url + "?" + queryParameters;
}

export function calculateOffset(page: number, limit: number) {
  return page * limit - limit;
}

export function AxiosInstance(contentType: ContentType, apiVersion: number) {
  const instance = axios.create({
    baseURL: `${BASE_URL}/v${apiVersion}`,
  });

  instance.defaults.headers.post["Content-Type"] = contentType;
  instance.defaults.headers["Cache-Control"] =
    "no-cache, no-store, must-revalidate";
  instance.defaults.headers["Pragma"] = "no-cache";
  instance.defaults.headers["Expires"] = "0";
  instance.defaults.timeout = 10 * 1000;

  instance.interceptors.response.use(responseHandler, responseErrorHandler);

  return instance;
}
