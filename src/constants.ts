import type { Environment } from "@/types/Environment";
import { isEnvironment } from "@/types/Environment";

export const gifLimit = 50;
export const klipyApiKey = process.env.KLIPY_API_KEY ?? "";
export const klipyBaseUrl =
  process.env.KLIPY_BASE_URL ?? "https://api.klipy.com/api/v1";
export const deployEnv: Environment = isEnvironment(process.env.DEPLOY_ENV)
  ? process.env.DEPLOY_ENV
  : "development";
