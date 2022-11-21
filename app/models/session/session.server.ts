import type { SessionData } from "./types";
import { getCookie } from "../../utils/cookies";
import { Theme } from "./types";

export const getSessionValues = (request: Request): SessionData => {
  const cookies = request.headers.get("Cookie");
  return {
    theme:
      getCookie("theme", cookies) === Theme.Dark ? Theme.Dark : Theme.Light,
    env: {
      VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID ?? "",
      NODE_ENV: process.env.NODE_ENV ?? "",
    },
  };
};
