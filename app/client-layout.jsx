// app/client-layout.jsx
"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isDashboardPath = pathname.startsWith("/dashboard");

  return (
    <div className="overflow-x-hidden bg-[#F6FFF8]">
      {!isDashboardPath && <Navbar />}
      <main className="app">{children}</main>
      {!isDashboardPath && <Footer />}
      <Toaster />
    </div>
  );
}