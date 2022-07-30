import { useLoaderData } from "@remix-run/react";
import Page from "./components/page";
import ThemeProvider from "./providers/theme";
import MarkdownProvider from "./providers/markdown";

import type { FC, ReactNode } from "react";
import type { SessionData } from "~/models/session/types";

interface Props {
  children?: ReactNode;
}

const Base: FC<Props> = ({ children }) => {
  const data = useLoaderData<SessionData>();
  return (
    <ThemeProvider theme={data?.theme}>
      <MarkdownProvider>
        <Page>{children}</Page>
      </MarkdownProvider>
    </ThemeProvider>
  );
};

export default Base;
