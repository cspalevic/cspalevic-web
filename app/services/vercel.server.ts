import { fetch } from "@remix-run/node";

const BASE_PATH = "https://api.vercel.com/v1";
const { VERCEL_URL, VERCEL_API_KEY, VERCEL_ANALYTICS_ID } = process.env;

type VitalParams = {
  id: string;
  name: string;
  path: string;
  speed: string;
  value: number;
};

// https://vercel.com/docs/concepts/analytics/api
export const reportVitals = async (params: VitalParams) => {
  fetch(`${BASE_PATH}/vitals`, {
    method: "POST",
    body: JSON.stringify({
      dsn: VERCEL_ANALYTICS_ID,
      href: VERCEL_URL,
      event_name: params.name,
      id: params.id,
      page: params.path,
      speed: params.speed,
      value: params.value,
    }),
    headers: {
      Authorization: `Bearer ${VERCEL_API_KEY}`,
    },
  });
};
