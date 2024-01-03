'use client'
import React from "react";
import CommentSection from "../components/common/CommentSection";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';  // Import Tabs components
import 'react-tabs/style/react-tabs.css';  // Import the styles for Tabs
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';


const CoursePage = () => {
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
       <div className="p-6 lg:w-[40%] w-full bg-white rounded-lg shadow-md overflow-y-auto max-h-[500px]">
        <h1 className="text-3xl font-extrabold mb-4">Day-wise Assessment</h1>
        <div className="space-y-4">
          {/* Day 1 */}
          <div className="day-box p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Day 1</h2>
            <p>Introduction to the Course</p>
          </div>

          {/* Day 2 */}
          <div className="day-box p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Day 2</h2>
            <p>Fundamentals of XYZ</p>
          </div>

          {/* Day 3 */}
          <div className="day-box p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Day 3</h2>
            <p>Advanced Topics in ABC</p>
          </div>

          {/* Day 4 */}
          <div className="day-box p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Day 4</h2>
            <p>More Advanced Topics</p>
          </div>

          {/* Day 5 */}
          <div className="day-box p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Day 5</h2>
            <p>Final Day - Recap and Q&A</p>
          </div>
        </div>
      </div>
    </section>


    <Tabs>
        {/* Tab List */}
        <TabList className="flex space-x-4 bg-gray-100 p-4 rounded-md">
            <Tab className="text-lg font-semibold flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none transition duration-300">
              <HiAdjustments /> Notes
            </Tab>
            <Tab className="text-lg font-semibold flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none transition duration-300">
              <HiClipboardList /> Q&A
            </Tab>
          </TabList>

        {/* Tab Panels */}
        <TabPanel>
          <div className="mx-auto p-6 lg:w-[60%] w-full">
            {/* Notes Section */}
            {/* Add your notes content here */}
          </div>
        </TabPanel>
        <TabPanel>
            <div className="mx-auto p-6 lg:w-[60%] w-full">
              <CommentSection />
            </div>
        </TabPanel>
      </Tabs>

      
    </div>
  );
};

export default CoursePage;
