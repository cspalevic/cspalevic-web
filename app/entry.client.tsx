import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { collectWebVitalMetrics } from "./utils/webVitals";

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(document, <RemixBrowser />);
    collectWebVitalMetrics();
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
