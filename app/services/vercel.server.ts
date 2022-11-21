import { fetch } from "@remix-run/node";
import logger from "~/models/logger.server";

const BASE_PATH = "https://vitals.vercel-analytics.com/v1";
const { VERCEL_ANALYTICS_ID } = process.env;

type VitalParams = {
  id: string;
  name: string;
  path: string;
  speed: string;
  value: number;
  origin: string;
};

// https://vercel.com/docs/concepts/analytics/api
export const reportVitals = async (params: Maybe<VitalParams>) => {
  const body: Record<string, string> = {
    dsn: VERCEL_ANALYTICS_ID ?? "",
    href: `${params?.origin}/${params?.path}`,
    event_name: params?.name ?? "",
    id: params?.id ?? "",
    page: params?.path ?? "",
    speed: params?.speed ?? "",
    value: params?.value.toString() ?? "",
  };
  logger.info("Vercel Analytics Request:");
  logger.info(`Body: ${JSON.stringify(body, null, 2)}`);
  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: "application/x-www-form-urlencoded",
  });
  const response = await fetch(`${BASE_PATH}/vitals`, {
    method: "POST",
    body: blob,
    credentials: "omit",
    keepalive: true,
  });
  const text = await response.text();
  logger.info("Vercel Analytics Response");
  logger.info(`Status: ${response.status}`);
  logger.info(`Text: ${text}`);
};
