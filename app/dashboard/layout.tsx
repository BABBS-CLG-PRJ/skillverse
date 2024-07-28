"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import useUserStore from "../store/useUserStore";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, fetchUserData } = useUserStore();
  const router = useRouter();

  // Fetch user data on component mount
  useEffect(() => {
    const checkUser = async () => {
      await fetchUserData();
    };
    checkUser();
  }, [fetchUserData]);

  useEffect(() => {
    if (user == null) {
      // Show toast and redirect after 5 seconds
      toast.error("Oops looks like you are not logged in!!", {
        duration: 5000,
        style: {
          minWidth: '250px',
          background: '#1F1E20',
          color: 'white',
        },
        icon: '⚠️',
      });

      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000); // Redirect after 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [user, router]);

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
