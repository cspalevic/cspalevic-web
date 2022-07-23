import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import { reportWebVitals } from "./models/analytics/webVitals";

hydrate(<RemixBrowser />, document);

reportWebVitals();
