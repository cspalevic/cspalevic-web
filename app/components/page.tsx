import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useTheme } from "~/providers/theme";
import Header from "./header";

interface Props {
  children?: React.ReactNode;
}

const classes = "h-full";

const Page: React.FC<Props> = ({ children }) => {
  const data = useLoaderData<RootData>();
  const theme = useTheme();

  // Adding dark mode class to toggle dark mode for tailwindcss
  // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
  let className = classes;
  if (theme?.isDarkMode) className += " dark";

  return (
    <html lang="en" className={className}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full justify-center text-gray-800 dark:text-gray-50 bg-neutral-50 dark:bg-neutral-900">
        <div className="flex h-full flex-col px-5 md:w-[72rem]">
          <Header />
          <main className="flex w-full flex-1 flex-row justify-center pt-10 pb-10">
            <div className="h-full w-full">{children}</div>
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data?.env)}`,
          }}
        />
        {data?.env?.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

export default Page;
