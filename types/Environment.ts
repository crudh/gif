export const environments = ["production", "preview", "development"] as const;
export type Environment = (typeof environments)[number];

export const isEnvironment = (env: string | undefined): env is Environment =>
  environments.includes(env as Environment);
