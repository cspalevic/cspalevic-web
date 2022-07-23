import { fetch } from "@remix-run/node";
import logger from "../logger.server";

import type { WebVital } from "./types";

const vitalsUrl = "https://vitals.vercel-analytics.com/v1/vitals";

/**
 * Function to send send analytics information to Vercel for tracking
 * @param webVital
 * @returns true if successful
 */
export const sendAnalytics = async (
  webVital: Partial<WebVital>
): Promise<boolean> => {
  webVital.dsn = process.env.VERCEL_ANALYTICS_ID;
  if (!webVital.dsn) {
    logger.warn("VERCEL_ANALYTICS_ID not set");
    return false;
  }

  const blob = new Blob([new URLSearchParams(webVital).toString()], {
    // This content type is necessary for `sendBeacon`
    type: "application/x-www-form-urlencoded",
  });
  const { status } = await fetch(vitalsUrl, {
    body: blob,
    method: "POST",
  });
  if (status !== 200) {
    logger.warn(
      `Received ${status} from /v1/vitals. Unable to send analytics information`
    );
    return false;
  }
  return true;
};
