import { Theme } from "@/types/theme";
import { cookies } from "next/headers";
import { THEME_COOKIE_NAME } from "./constants";

export const detectTheme = (): Theme => {
  const themeCookie = cookies().get(THEME_COOKIE_NAME);
  return !themeCookie || themeCookie.value === Theme.Dark
    ? Theme.Dark
    : Theme.Light;
};
