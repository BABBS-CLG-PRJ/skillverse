// app/layout.jsx
export const metadata = {
  title: "Skillverse",
  icons: {
    icon: "/skillverse.ico",
  },
};

import { Providers } from "./providers";
import ClientLayout from "./client-layout";
import { CookiesProvider } from "next-client-cookies/server";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <link rel="icon" href={metadata.icons.icon} />
      </head>
      <body>
        <CookiesProvider>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </CookiesProvider>
      </body>
    </html>
  );
}