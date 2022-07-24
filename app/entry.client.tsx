import { hydrate } from "react-dom";
import { useEffect } from "react";
import { RemixBrowser, useMatches, useLocation } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://555c80dac37f43129e727f19814f0890@o1332590.ingest.sentry.io/6597316",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.remixRouterInstrumentation(
        useEffect,
        useLocation,
        useMatches
      ),
    }),
  ],
  tracesSampleRate: 1.0,
});

hydrate(<RemixBrowser />, document);
