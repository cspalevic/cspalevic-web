import { getCookie } from "../../utils/cookies";
import { Theme } from "./types";

import type { SessionData } from "./types";

export const getSessionValues = (request: Request): SessionData => {
  const cookies = request.headers.get("Cookie");
  return {
    theme:
      getCookie("theme", cookies) === Theme.Dark ? Theme.Dark : Theme.Light,
    env: {
      SENTRY_DSN: process.env.SENTRY_DSN,
      NODE_ENV: process.env.NODE_ENV,
    },
  };
};
