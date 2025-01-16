// app/layout.jsx
export const metadata = {
  title: "Skillverse",
  icons: {
    icon: "/skillverse.ico",
  },
};

import {Providers} from "./providers";
import ClientLayout from "./client-layout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <link rel="icon" href={metadata.icons.icon} />
      </head>
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}