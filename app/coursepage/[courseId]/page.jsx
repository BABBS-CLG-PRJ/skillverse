"use client";
import React, { useState, useEffect } from "react";
import CommentSection from "../../components/common/CommentSection";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import axios from "axios";

const CoursePageDefault = ({ params }) => {
  const [curriculum, setCurriculum] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [nestedActiveIndex, setNestedActiveIndex] = useState(null); // For second level
  const [thirdLevelActiveIndex, setThirdLevelActiveIndex] = useState(null); // For third level
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch course curriculum and details
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.post(`/api/getcourse`, {
          courseId: params.courseId,
        });
        const courseData = response.data.courseDetails; // Adjust based on actual response structure
        setCourseDetails(courseData);
        setCurriculum(courseData.curriculum || []);
        // Set the default video
        const defaultVideo =
          courseData.curriculum?.[0]?.lectures?.[0]?.videoUrl ;
        setSelectedVideoUrl(defaultVideo);
      } catch (error) {
        console.error("Failed to fetch course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [params.courseId]);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const toggleNestedAccordion = (index, nestedIndex) => {
    setNestedActiveIndex(
      nestedActiveIndex === `${index}-${nestedIndex}` ? null : `${index}-${nestedIndex}`
    );
  };

  const toggleThirdLevelAccordion = (index, nestedIndex, thirdLevelIndex) => {
    setThirdLevelActiveIndex(
      thirdLevelActiveIndex === `${index}-${nestedIndex}-${thirdLevelIndex}`
        ? null
        : `${index}-${nestedIndex}-${thirdLevelIndex}`
    );
  };

  const handleVideoChange = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto text-black">
      <section className="flex flex-col lg:flex-row bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-40 border border-gray-100">
        <div className="relative overflow-hidden lg:w-[60%] w-full h-[500px] rounded-lg mb-6 px-8 py-4">
          <div className="relative w-full h-full">
            {/* Render the selected video */}
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={selectedVideoUrl}
              title="Selected Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Curriculum Accordion Section */}
        <section className="p-6 lg:w-[40%] w-full bg-white rounded-lg shadow-md overflow-y-auto max-h-[500px]">
          <h1 className="text-3xl font-extrabold mb-4">Curriculum</h1>
          <div className="space-y-4">
            {curriculum.map((section, index) => (
              <div key={index} className="section-box p-4 bg-gray-100 rounded-md">
                <button
                  className="flex justify-between w-full"
                  onClick={() => toggleAccordion(index)}
                >
                  <h2 className="text-lg font-semibold mb-2">{section.sectionTitle}</h2>
                  <svg
                    className={`w-6 h-6 transform ${activeIndex === index ? "rotate-180" : "rotate-0"}`}
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
                {activeIndex === index && (
                  <div className="mt-2 space-y-4">
                    {section.lectures.map((lecture, nestedIndex) => (
                      <div key={nestedIndex} className="nested-accordion p-4 bg-gray-200 rounded-md">
                        <button
                          className="flex justify-between w-full"
                          onClick={() => toggleNestedAccordion(index, nestedIndex)}
                        >
                          <h3 className="text-md font-medium">{lecture.lectureTitle}</h3>
                          <svg
                            className={`w-6 h-6 transform ${
                              nestedActiveIndex === `${index}-${nestedIndex}` ? "rotate-180" : "rotate-0"
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
                        {nestedActiveIndex === `${index}-${nestedIndex}` && (
                          <div className="mt-2 space-y-4">
                            {lecture.object &&
                              lecture.object.map((object, thirdLevelIndex) => (
                                <div
                                  key={thirdLevelIndex}
                                  className="third-level-accordion p-4 bg-gray-300 rounded-md"
                                >
                                  <button
                                    className="flex justify-between w-full"
                                    onClick={() =>
                                      toggleThirdLevelAccordion(index, nestedIndex, thirdLevelIndex)
                                    }
                                  >
                                    <h4 className="text-sm font-semibold">{object.lectureTitle}</h4>
                                    <svg
                                      className={`w-6 h-6 transform ${
                                        thirdLevelActiveIndex ===
                                        `${index}-${nestedIndex}-${thirdLevelIndex}`
                                          ? "rotate-180"
                                          : "rotate-0"
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
                                  {thirdLevelActiveIndex ===
                                    `${index}-${nestedIndex}-${thirdLevelIndex}` && (
                                    <div className="mt-2 p-4 bg-yellow-100 rounded-md">
                                      <p>{object.content}</p>
                                      {object.videoUrl && (
                                        <button
                                          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
                                          onClick={() => handleVideoChange(object.videoUrl)}
                                        >
                                          Play Video
                                        </button>
                                      )}
                                      {object.supplementaryMaterial && (
                                        <a
                                          href={object.supplementaryMaterial}
                                          download
                                          className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg inline-block"
                                        >
                                          Download Material
                                        </a>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Tabs Section */}
      <Tabs>
        <TabList className="flex space-x-4 bg-gray-100 p-4 rounded-md">
          <Tab className="text-lg font-semibold flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none transition duration-300">
            <HiAdjustments /> Notes
          </Tab>
          <Tab className="text-lg font-semibold flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none transition duration-300">
            <HiClipboardList /> Q&A
          </Tab>
        </TabList>

        <TabPanel>
          <div className="mx-auto p-6 lg:w-[60%] w-full">
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

export default CoursePageDefault;
