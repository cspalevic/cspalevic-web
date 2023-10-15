import { Theme } from "@/types/theme";
import { getCookie, setCookie } from "../cookie";
import { THEME_COOKIE_NAME } from "./constants";

export const toggleTheme = (): Theme => {
  const themeCookie = getCookie(THEME_COOKIE_NAME);
  const theme =
    !themeCookie || themeCookie.value === Theme.Dark ? Theme.Light : Theme.Dark;
  setCookie(THEME_COOKIE_NAME, theme, {
    maxAge: 100 * 365 * 24 * 60 * 60,
  });
  return theme;
};
