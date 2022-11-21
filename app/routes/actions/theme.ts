import type { ActionFunction } from "@remix-run/node";
import ThemeController from "~/services/theme.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    throw new Response("Method Not Allowed", {
      status: 405,
    });
  }
  const themeController = await ThemeController.getSession(request);
  themeController.toggleTheme();
  const responseHeaders = await themeController.save();
  return new Response("Ok", responseHeaders);
};
