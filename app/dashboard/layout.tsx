"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // To track if the user is authenticated

  useEffect(() => {
    // Check for token in localStorage
    const authtoken = localStorage.getItem("authtoken");

    if (!authtoken || authtoken === "") {
      setIsAuthenticated(false); // Not authenticated
      router.push("/login"); // Redirect to login
    } else {
      setIsAuthenticated(true); // Authenticated
    }
  }, [router]);

  // If authentication check is still in progress, show loading
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, the user is already redirected
  if (!isAuthenticated) {
    return null; // Render nothing if not authenticated
  }

  // If authenticated, render the page content
  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-[#F6FFF8]">
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
