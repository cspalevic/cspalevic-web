import { cookies } from "next/headers";
import { Theme } from "@/types/theme";

const THEME_COOKIE_NAME = "__theme";

export const detectTheme = (): Theme => {
    const cookieStore = cookies();
    const theme = cookieStore.get(THEME_COOKIE_NAME);
    return !theme?.value || theme.value === Theme.Dark ? Theme.Dark : Theme.Light;
}

export const toggleTheme = (): Theme => {
    const cookieStore = cookies();
    const theme = detectTheme();
    const oppositeTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
    cookieStore.set(THEME_COOKIE_NAME, oppositeTheme, { sameSite: "lax", expires: new Date().getTime() + (100 * 365 * 24 * 60 * 60)});
    return oppositeTheme;
}