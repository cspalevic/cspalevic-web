import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { Response } from "@remix-run/node";
import { init } from "@sentry/remix";
import isBot from "isbot";
import logger from "./models/logger.server";

import type { EntryContext } from "@remix-run/node";

init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.2,
});

const ABORT_DELAY = 5000;

const handleRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) => {
  const callbackName = isBot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";
  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(body, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );
          pipe(body);
        },
        onShellError: (error) => {
          reject(error);
        },
        onError: (error) => {
          didError = true;
          logger.error("Error rendering page", error);
        },
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
};

export default handleRequest;
