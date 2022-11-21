import type { Metric } from "web-vitals";
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from "web-vitals";

const sendMetric = (metric: Metric) => {
  fetch("/actions/vitals", {
    method: "POST",
    body: JSON.stringify({
      id: metric.id,
      name: metric.name,
      path: window.location.pathname,
      value: metric.value,
      speed: window.navigator?.connection?.effectiveType ?? "",
    }),
  });
};

export const collectWebVitalMetrics = () => {
  [onCLS, onFCP, onFID, onINP, onLCP, onTTFB].forEach((callback) => {
    callback(sendMetric);
  });
};
