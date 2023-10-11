export const getCookie = (name: string) =>
  document.cookie
    .split(";")
    .map((cookie) => {
      const split = cookie.split("=");
      return {
        name: split[0],
        value: split[1],
      };
    })
    .findLast((cookie) => cookie.name === name);

export const setCookie = (
  name: string,
  value: string,
  options?: { maxAge: number }
) => {
  let cookieString = `${name}=${value};`;
  if (options?.maxAge) cookieString += `max-age=${options.maxAge};`;
  document.cookie = cookieString;
};
