import type { SessionData } from "~/models/session/types";
import { useLoaderData } from "@remix-run/react";
import Page from "./components/page";
import ThemeProvider from "./providers/theme";

interface Props {
  children?: React.ReactNode;
}

const Base: React.FC<Props> = ({ children }) => {
  const data = useLoaderData<SessionData>();
  return (
    <ThemeProvider theme={data?.theme}>
      <Page>{children}</Page>
    </ThemeProvider>
  );
};

export default Base;
