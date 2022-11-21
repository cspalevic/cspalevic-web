import type { SessionData } from "~/models/session/types";
import { useLoaderData, useLocation } from "@remix-run/react";
import { useEffect } from "react";
import Page from "./components/page";
import ThemeProvider from "./providers/theme";
import { collectWebVitalMetrics } from "./utils/webVitals";

interface Props {
  children?: React.ReactNode;
}

const Base: React.FC<Props> = ({ children }) => {
  const data = useLoaderData<SessionData>();
  const { pathname } = useLocation();

  useEffect(() => {
    collectWebVitalMetrics();
  }, [pathname]);

  return (
    <ThemeProvider theme={data?.theme}>
      <Page>{children}</Page>
    </ThemeProvider>
  );
};

export default Base;
