"use client";
import React, { useState, useEffect } from "react";
import CommentSection from "../../components/common/CommentSection";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import axios from "axios";

const CoursePageDefault = ({ params }) => {
  const [curriculum, setCurriculum] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [nestedActiveIndex, setNestedActiveIndex] = useState(null); // For second level
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
          courseData.curriculum?.[0]?.lectures?.[0]?.videoUrl || "";
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
    const key = `${index}-${nestedIndex}`;
    setNestedActiveIndex(nestedActiveIndex === key ? null : key);
  };

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
  };

  return (
    <div className="mx-auto text-black">
      <section className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg">
        {/* Video Player Section */}
        <div className="lg:w-3/5 w-full h-[500px] p-4">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            {selectedVideoUrl ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={selectedVideoUrl}
                title="Course Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p className="text-center text-gray-500">No video selected</p>
            )}
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="lg:w-2/5 w-full p-4">
          <div className="bg-white rounded-lg h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 px-4">Course Content</h2>

            {curriculum.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-4">
                <button
                  onClick={() => toggleAccordion(sectionIndex)}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center rounded-lg"
                >
                  <span className="font-semibold">{section.sectionTitle}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      activeIndex === sectionIndex ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeIndex === sectionIndex && (
                  <div className="mt-2">
                    {section.lectures.map((lecture, lectureIndex) => (
                      <div key={lectureIndex} className="ml-4">
                        <button
                          onClick={() => {
                            toggleNestedAccordion(sectionIndex, lectureIndex);
                            if (lecture.videoUrl) {
                              handleVideoSelect(lecture.videoUrl);
                            }
                          }}
                          className="w-full px-4 py-2 hover:bg-gray-50 flex justify-between items-center rounded-lg"
                        >
                          <span className="text-sm">{lecture.lectureTitle}</span>
                        </button>

                        {nestedActiveIndex === `${sectionIndex}-${lectureIndex}` && (
                          <div className="bg-gray-50 rounded-lg mt-2">
                            {lecture.supplementaryMaterial?.length > 0 && (
                              <div className="ml-8">
                                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                                  <div className="flex items-center space-x-1">
                                      <IoDocumentText className="text-black" />
                                    <span className="text-sm font-medium">
                                      Course Materials
                                    </span>
                                  </div>
                                  <a
                                    href={lecture.supplementaryMaterial[0]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition-colors"
                                  >
                                    <FaEye />
                                    <span className="text-sm">View</span>
                                  </a>
                                </div>
                              </div>
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
        </div>
      </section>

      {/* Tabs Section */}
      <section className="mt-8">
        <Tabs>
          <TabList className="flex border-b">
            <Tab className="px-6 py-3 font-medium hover:text-blue-600 cursor-pointer">
              <div className="flex items-center">
                <HiAdjustments className="mr-2" />
                Notes
              </div>
            </Tab>
            <Tab className="px-6 py-3 font-medium hover:text-blue-600 cursor-pointer">
              <div className="flex items-center">
                <HiClipboardList className="mr-2" />
                Q&A
              </div>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Course Notes</h3>
              {/* Add your notes content here */}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="mx-auto lg:w-[60%] w-full p-6">
              <h3 className="text-xl font-semibold mb-4">Questions & Answers</h3>
              <CommentSection courseId={params.courseId} />
            </div>
          </TabPanel>
        </Tabs>
      </section>
    </div>
  );
};

export default CoursePageDefault;
