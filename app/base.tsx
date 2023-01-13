import { useLoaderData } from "@remix-run/react";
import Page from "./components/page";
import ThemeProvider from "./providers/theme";

interface Props {
  children?: React.ReactNode;
}

const Base: React.FC<Props> = ({ children }) => {
  const data = useLoaderData<RootData>();

  return (
    <ThemeProvider theme={data?.theme}>
      <Page>{children}</Page>
    </ThemeProvider>
  );
};

export default Base;
