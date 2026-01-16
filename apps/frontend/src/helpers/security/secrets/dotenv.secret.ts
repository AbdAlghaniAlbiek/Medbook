import { resolve } from "path";
import { INodeConfig, IServerConfig } from "./dotenvInterface.secret";
import { config } from "dotenv";

// config({ path: resolve(__dirname, "../../../../.env") });

export const ServerConfig: IServerConfig = {
  LOCAL_BACKEND_URL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL as string,
  REMOTE_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
};

export const NodeConfig: INodeConfig = {
  APP_ENV: (process.env.APP_ENV as string) ?? "development",
};
