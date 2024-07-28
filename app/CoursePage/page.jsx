"use client";
import React,{useState} from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"; // Import Tabs components
import "react-tabs/style/react-tabs.css"; // Import the styles for Tabs
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const CoursePageDefault = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  //hello

  const days = [
    {
      title: "Day 1",
      content: "Introduction to the Course",
    },
    {
      title: "Day 2",
      content: "Fundamentals of XYZ",
    },
    {
      title: "Day 3",
      content: "Advanced Topics in ABC",
    },
    {
      title: "Day 4",
      content: "More Advanced Topics",
    },
    {
      title: "Day 5",
      content: "Final Day - Recap and Q&A",
    },
  ];
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <div className="mx-auto text-black">
      <section className="flex flex-col lg:flex-row bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-40 border border-gray-100">
        <div className="relative overflow-hidden lg:w-[60%] w-full h-[500px] rounded-lg mb-6 px-8 py-4">
          <div className="relative w-full h-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/yiZEX0S5eUI?si=Cc8TW-T83v7v-Gj-"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* Day-wise assessment section */}
        <section className="p-6 lg:w-[40%] w-full bg-white rounded-lg shadow-md overflow-y-auto max-h-[500px]">
          <h1 className="text-3xl font-extrabold mb-4">Day-wise Assessment</h1>
          <div className="space-y-4">
            {days.map((day, index) => (
              <div key={index} className="day-box p-4 bg-gray-100 rounded-md">
                <button
                  className="flex justify-between w-full"
                  onClick={() => toggleAccordion(index)}
                >
                  <h2 className="text-lg font-semibold mb-2 ">{day.title}</h2>
                  <svg
                    className={`w-6 h-6 transform ${
                      activeIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {activeIndex === index && <p className="p-6 mt-2 bg-gray">{day.content}</p>}
              </div>
            ))}
          </div>
        </section>
      </section>

      <Tabs>
        {/* Tab List */}
        <TabList className="flex space-x-4 bg-gray-100 p-4 rounded-md">
          <Tab className="text-lg font-semibold flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none transition duration-300">
            <HiAdjustments /> Notes
          </Tab>
        </TabList>

        {/* Tab Panels */}
        <TabPanel>
          <div className="mx-auto p-6 lg:w-[60%] w-full">
            {/* Notes Section */}
            {/* Add your notes content here */}
          </div>
        </TabPanel>
        
      </Tabs>
    </div>
  );
};

export default CoursePageDefault;
