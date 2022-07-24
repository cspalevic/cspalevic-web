import { hydrate } from "react-dom";
import { useEffect } from "react";
import { RemixBrowser, useMatches, useLocation } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: window.ENV?.SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.remixRouterInstrumentation(
        useEffect,
        useLocation,
        useMatches
      ),
    }),
  ],
  tracesSampleRate: window.ENV?.NODE_ENV === "development" ? 1.0 : 0.2,
});

hydrate(<RemixBrowser />, document);
