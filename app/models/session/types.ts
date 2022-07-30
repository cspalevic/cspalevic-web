export enum Theme {
  Light = "light",
  Dark = "dark",
}

export interface ENV {
  SENTRY_DSN: string;
  NODE_ENV: NodeJS.ProcessEnv["NODE_ENV"];
}

export interface SessionData {
  theme?: Theme;
  env?: ENV;
}
