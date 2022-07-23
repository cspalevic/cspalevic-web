import { json } from "@remix-run/node";
import { sendAnalytics } from "~/models/analytics/vercel.server";

import type { ActionFunction } from "@remix-run/node";
import type { WebVital } from "~/models/analytics/types";

export const action: ActionFunction = async ({ request }) => {
  const vitals = await request.text();
  const webVital: Partial<WebVital> = {};
  decodeURIComponent(vitals)
    .split("&")
    .forEach((value) => {
      const split = value.split("=");
      webVital[split[0]] = split[1];
    });
  const successfulLog = await sendAnalytics(webVital);
  return json({ success: successfulLog });
};
