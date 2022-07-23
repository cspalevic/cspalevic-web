import { getCookie } from "../../utils/cookies";
import { Theme } from "./types";

import type { SessionData } from "./types";

export const detectSessionValues = (request: Request): SessionData => {
  const cookies = request.headers.get("Cookie");
  return {
    theme:
      getCookie("theme", cookies) === Theme.Dark ? Theme.Dark : Theme.Light,
  };
};
