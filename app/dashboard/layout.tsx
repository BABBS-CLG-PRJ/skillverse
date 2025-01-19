"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Profile from "./profile/page"; // Importing the Profile component
import Settings from "./settings/page"; // Assuming you have a Settings component
import Courses from "./courses/page"; // Assuming you have a Courses component
import CourseBuilder from "./coursebuilder/page"; // Assuming you have a CourseBuilder component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const [user, setUser] = useState(null);

  const fetchuserbyid=async()=>{
    try{
      const res=await axios.post('/api/getuser',{uid:localStorage.getItem('userId')});
      console.log(res);
      setUser(res.data.user);
    }catch(error){
      console.log(error);
    }

  }

  useEffect(() => {
    const uid=localStorage.getItem("userId");

    if (!uid||uid === "") {
      router.push("/login");
    } else {
      fetchuserbyid() // Fetch user data by id
    }
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Render content based on the current pathname
  const renderContent = () => {
    if (pathname.includes("profile")) {
      return <Profile user={user} />;
    } else if (pathname.includes("settings")) {
      return <Settings user={user} />;
    } else if (pathname.includes("courses")) {
      return <Courses user={user} />;
    } else if (pathname.includes("coursebuilder")) {
      return <CourseBuilder user={user} />;
    } else {
      // Default to Profile if no specific route is matched
      return <Profile user={user} />;
    }
  };

  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-[#F6FFF8]">
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Content Area */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* Header */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                user={user}
              />
              {/* Main Content */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {renderContent()} {/* Conditionally render content */}
                </div>
              </main>
            </div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
