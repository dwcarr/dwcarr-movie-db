import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { LoaderFunctionArgs } from "@remix-run/node";

import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { fetchToken } from "./lib/movies";

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  let token = localStorage.getItem("movieAuthToken");
  if (!token) {
    const data = (await fetchToken()) as { token: string };
    token = data.token;
    if (!token) {
      throw new Error("Failed to fetch token");
    }
    localStorage.setItem("movieAuthToken", token);
  }
  return { token };
};

clientLoader.hydrate = true;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { token } = useLoaderData<typeof clientLoader>();
  return <Outlet />;
}
