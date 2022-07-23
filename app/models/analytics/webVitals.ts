import { getCLS, getFCP, getFID, getLCP, getTTFB } from "web-vitals";

import type { Metric } from "web-vitals";
import type { WebVital } from "./types";

const vitalsUrl = "/reportWebVitals";

const getConnectionSpeed = () => {
  return "connection" in navigator &&
    navigator["connection"] &&
    "effectiveType" in navigator["connection"]
    ? navigator["connection"]["effectiveType"]
    : "";
};

const sendToAnalytics = (metric: Metric) => {
  const body: Partial<WebVital> = {
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: "application/x-www-form-urlencoded",
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else
    fetch(vitalsUrl, {
      body: blob,
      method: "POST",
      credentials: "omit",
      keepalive: true,
    });
};

export const reportWebVitals = () => {
  try {
    [getFID, getTTFB, getLCP, getCLS, getFCP].forEach((report) =>
      report((metric) => sendToAnalytics(metric))
    );
  } catch (error) {
    console.log("Error reporting web vitals: ", error);
  }
};
