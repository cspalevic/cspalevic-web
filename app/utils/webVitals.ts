import type { Metric } from "web-vitals";
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from "web-vitals";

const VERCEL_VITALS_URL = "https://vitals.vercel-analytics.com/v1/vitals";

const sendMetric = async (metric: Metric) => {
  const body: Record<string, string> = {
    dsn: window.ENV.VERCEL_ANALYTICS_ID ?? "",
    href: window.location.href ?? "",
    page: window.location.pathname ?? "",
    id: metric.id ?? "",
    event_name: metric.name ?? "",
    value: metric.value?.toString() ?? "",
    speed: window.navigator?.connection?.effectiveType ?? "",
  };
  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: "application/x-www-form-urlencoded",
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(VERCEL_VITALS_URL, blob);
  } else {
    fetch(VERCEL_VITALS_URL, {
      body: blob,
      method: "POST",
      credentials: "omit",
      keepalive: true,
    });
  }
};

export const collectWebVitalMetrics = () => {
  [onCLS, onFCP, onFID, onINP, onLCP, onTTFB].forEach((callback) => {
    callback(sendMetric);
  });
};
