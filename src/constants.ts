export const gifLimit = 50;
export const tenorApiKey = process.env.TENOR_API_KEY ?? "";
export const tenorClientKey = process.env.TENOR_CLIENT_KEY ?? "";
export const tenorBaseUrl =
  process.env.TENOR_BASE_URL ?? "https://tenor.googleapis.com/v2/";
export const deployEnv: "production" | "preview" | "development" =
  (process.env.DEPLOY_ENV as any) ?? "local";
