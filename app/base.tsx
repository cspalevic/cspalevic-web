import Page from "./components/page";
import ThemeProvider from "./providers/theme";
import MarkdownProvider from "./providers/markdown";

import type { FC, ReactNode } from "react";
import type { SessionData } from "~/models/session/types";

interface Props {
  children?: ReactNode;
  data?: SessionData;
}

const Base: FC<Props> = ({ children, data }) => (
  <ThemeProvider theme={data?.theme}>
    <MarkdownProvider>
      <Page>{children}</Page>
    </MarkdownProvider>
  </ThemeProvider>
);

export default Base;
