import { hydrateRoot } from "react-dom/client";
import { startTransition, useEffect } from "react";
import { RemixBrowser, useMatches, useLocation } from "@remix-run/react";
import { init, remixRouterInstrumentation } from "@sentry/remix";
import { BrowserTracing } from "@sentry/tracing";

init({
  dsn: window.ENV?.SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: remixRouterInstrumentation(
        useEffect,
        useLocation,
        useMatches
      ),
    }),
  ],
  tracesSampleRate: window.ENV?.NODE_ENV === "development" ? 1.0 : 0.2,
});

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(document, <RemixBrowser />);
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
