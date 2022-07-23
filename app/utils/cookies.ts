export const THEME_COOKIE = "theme";

export const getCookie = (
  key: string,
  cookies: Maybe<string>
): Maybe<string> => {
  if (!cookies) {
    if (typeof window === "undefined") return;
    cookies = document.cookie as Maybe<string>;
  }
  return cookies
    ?.split("; ")
    ?.find((row) => row.startsWith(`${key}=`))
    ?.split("=")[1];
};

export const deleteCookie = (key: string): void => {
  document.cookie = `${key}=; Max-Age=0;`;
};

export const setCookie = (key: string, value: string): void => {
  document.cookie = `${key}=${value}; path=/;`;
};
