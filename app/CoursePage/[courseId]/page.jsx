'use client'
import React, { useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';  // Import Tabs components
import 'react-tabs/style/react-tabs.css';  // Import the styles for Tabs
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import CommentSection from "../../components/common/CommentSection";
import axios from 'axios';

const days = [
  {
    day: 1,
    title: "Introduction to the Course",
    description: "Welcome to the course! This session will cover the basics of the course and what you can expect to learn."
  },
  {
    day: 2,
    title: "Fundamentals of XYZ",
    description: "In this session, we will cover the fundamentals of XYZ and how it relates to the course material."
  },
  {
    day: 3,
    title: "Advanced Topics in ABC",
    description: "This session will cover advanced topics in ABC and how they relate to the course material."
  },
  {
    day: 4,
    title: "More Advanced Topics",
    description: "In this session, we will dive deeper into some of the more advanced topics covered in the course."
  },
  {
    day: 5,
    title: "Final Day - Recap and Q&A",
    description: "This session will be a recap of the course material and a Q&A session to answer any remaining questions you may have."
  }
];

const CoursePage = ({ params }) => {
  const { courseId } = params;
  const [currVideoUrl, setcurrVideoUrl] = useState(null);
  const getVideoSignedUrl = async (videoId) => {
    try {
      const response = await axios.post("/api/streamvideo", {
        videoId: videoId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data.signedUrl);
      setcurrVideoUrl(response.data.signedUrl);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getVideoSignedUrl("658933e6a8fee3df1c57bbdf.mp4");
  }, [])
  

  return (
    <div className="mx-auto text-black">
      <section className="flex flex-col lg:flex-row bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-40 border border-gray-100">
        <div className="relative overflow-hidden lg:w-[60%] w-full h-[500px] rounded-lg mb-6 px-8 py-4">
          <div className="relative w-full h-full">
            {currVideoUrl != null ?
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={currVideoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              : <div className="text-3xl text-black">Loading</div>}
          </div>
        </div>
        {/* Day-wise assessment section */}
        <div className="p-6 lg:w-[40%] w-full bg-white rounded-lg shadow-md overflow-y-auto max-h-[500px]">
          <h1 className="text-3xl font-extrabold mb-4">Day-wise Assessment</h1>
          <div className="space-y-4">
            {days.map((day) => (
              
              <div className="day-box p-4 bg-gray-100 rounded-md cursor-pointer " key={day.day} 
                onClick={() => {
                  getVideoSignedUrl("658933e6a8fee3df1c57bbdf.mp4")
                }}
              >
                <h2 className="text-lg font-semibold mb-2">Day {day.day}</h2>
                <p>{day.description}</p>
              </div>
            ))}
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
