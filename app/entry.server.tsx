import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import * as Sentry from "@sentry/remix";

import type { EntryContext } from "@remix-run/node";

Sentry.init({
  dsn: "https://555c80dac37f43129e727f19814f0890@o1332590.ingest.sentry.io/6597316",
  tracesSampleRate: 1,
});

const handleRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) => {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
};

export default handleRequest;
