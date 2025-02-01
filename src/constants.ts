import { isEnvironment, Environment } from "../types/Environment";

export const gifLimit = 50;
export const tenorApiKey = process.env.TENOR_API_KEY ?? "";
export const tenorClientKey = process.env.TENOR_CLIENT_KEY ?? "";
export const tenorBaseUrl =
  process.env.TENOR_BASE_URL ?? "https://tenor.googleapis.com/v2/";
export const deployEnv: Environment = isEnvironment(process.env.DEPLOY_ENV)
  ? process.env.DEPLOY_ENV
  : "development";
