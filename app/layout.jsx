"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboardPath = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-[#F6FFF8]">
        {!isDashboardPath && <Navbar />}
        <main className="app">
          <Providers>{children}</Providers>
        </main>
        {!isDashboardPath && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
