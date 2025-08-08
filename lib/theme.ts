import { Theme } from "@/types/theme";
import { cookies } from "next/headers";

const THEME_COOKIE_NAME = "__theme";

export const detectTheme = async (): Promise<Theme> => {
  const cookieStore = await cookies();
  const theme = cookieStore.get(THEME_COOKIE_NAME);
  return !theme?.value || theme.value === Theme.Dark ? Theme.Dark : Theme.Light;
};

export const toggleTheme = async (): Promise<Theme> => {
  const cookieStore = await cookies();
  const theme = await detectTheme();
  const oppositeTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
  cookieStore.set(THEME_COOKIE_NAME, oppositeTheme, {
    sameSite: "lax",
    expires: new Date().getTime() + 100 * 365 * 24 * 60 * 60,
  });
  return oppositeTheme;
};
