import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Links, Outlet } from "@remix-run/react";
import lightboxStyles from "react-18-image-lightbox/style.css";
import Base from "./base";
import Error from "./components/error";
import NotFound from "./components/notFound";
import { getSessionValues } from "./models/session/session.server";
import baseStyles from "./styles/base.css";
import fontStyles from "./styles/fonts.css";
import highLightStyles from "./styles/materialdark.css";

export const ErrorBoundary = ({ error }) => (
  <html lang="en" className="h-full">
    <head>
      <Links />
    </head>
    <body className="flex h-full justify-center text-gray-800 dark:text-gray-50 bg-neutral-50 dark:bg-neutral-900">
      <Error error={error} />
    </body>
  </html>
);

export const CatchBoundary = () => (
  <Base>
    <NotFound />
  </Base>
);

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: baseStyles },
    { rel: "stylesheet", href: highLightStyles },
    { rel: "stylesheet", href: fontStyles },
    { rel: "stylesheet", href: lightboxStyles },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Charlie Spalevic",
  viewport: "width=device-width,initial-scale=1",
  // Favicon related meta tags
  "msapplication-TileColor": "#da532c",
  description: "Charlie Spalevic's personal website",
});

export const loader: LoaderFunction = async ({ request }) => {
  const data = getSessionValues(request);
  return json(data);
};

const App: React.FC = () => (
  <Base>
    <Outlet />
  </Base>
);

export default App;
