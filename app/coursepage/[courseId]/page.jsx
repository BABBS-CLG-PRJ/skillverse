"use client";
import React, { useState, useEffect } from "react";
import CommentSection from "../../components/common/CommentSection";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import QuizCard from "../../components/common/QuizCard";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";

const CoursePageDefault = ({ params }) => {
  const [curriculum, setCurriculum] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [nestedActiveIndex, setNestedActiveIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const searchParams = useSearchParams();
  const cookieStore = useCookies();
  const router = useRouter();

  // Fetch course data
  // Remove the duplicate fetchData from useEffect and keep only this version
  const fetchPlayingVideo = async (curriculum) => {
    try {
      let lectureId = cookieStore.get(`currLectureId`);
      if (
        !lectureId &&
        curriculum?.length > 0 &&
        curriculum[0]?.lectures?.length > 0
      ) {
        lectureId = curriculum[0].lectures[0]._id;
      }

      const lectureData = cookieStore.get(`${lectureId}`);
      if (lectureData) {
        const { signedUrl } = JSON.parse(lectureData);
        setSelectedVideoUrl(signedUrl);
      } else {
        setSelectedVideoUrl(null);
      }
    } catch (error) {
      console.error("Failed to fetch lecture data:", error);
      setSelectedVideoUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const courseResponse = await axios.post(`/api/getcourse`, {
        courseId: params.courseId,
      });
      const courseData = courseResponse.data.courseDetails;

      setCourseDetails(courseData);
      setCourseData(courseData); // This sets courseData state
      setCurriculum(courseData.curriculum || []);

      await fetchPlayingVideo(courseData.curriculum);
    } catch (error) {
      console.error("Failed to fetch course data:", error);
      setLoading(false);
    }
  };

  // Add this useEffect to call fetchData
  useEffect(() => {
    fetchData();
  }, [params.courseId]);

  // Add debug logs to check enrollment status
  useEffect(() => {
    if (user && courseData) {
      const userIdStr = user._id.toString();
      const isUserEnrolled = courseData.studentsEnrolled.includes(userIdStr);
      console.log("User ID:", userIdStr);
      console.log("Enrolled students:", courseData.studentsEnrolled);
      console.log("Is enrolled:", isUserEnrolled);
      setIsEnrolled(isUserEnrolled);
    }
  }, [user, courseData]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authToken = cookieStore.get("authtoken");
        const response = await axios.get("/api/getuser", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.post("/api/getquiz", {
          courseId: params.courseId,
        });
        setQuizzes(response.data.quizzes || []);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setQuizzes([]);
      }
    };

    fetchQuizzes(); // Add this line to actually call the function
  }, [params.courseId]);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const toggleNestedAccordion = (index, nestedIndex) => {
    const key = `${index}-${nestedIndex}`;
    setNestedActiveIndex(nestedActiveIndex === key ? null : key);
  };

  const handleVideoSelect = async (videoUrl, lectureId) => {
    const lectureData = cookieStore.get(`${lectureId}`);

    if (!lectureData) {
      const authToken = cookieStore.get("authtoken");
      const response = await axios.post("/api/streamvideo", {
        courseId: params.courseId,
        videoId: videoUrl,
        authToken: authToken,
      });
      if (response.data.success) {
        const signedUrlResponse = response.data.signedUrl;
        const expiresUTC = new Date(response.data.expires);

        cookieStore.set(
          `${lectureId}`,
          JSON.stringify({
            lectureId: lectureId,
            signedUrl: signedUrlResponse,
          }),
          {
            expires: expiresUTC,
            secure: true,
            sameSite: "strict",
            path: "/",
          }
        );

        setSelectedVideoUrl(signedUrlResponse);
      } else {
        console.error("Failed to stream video:", response.data);
        setSelectedVideoUrl(null);
      }
    } else {
      const { signedUrl } = JSON.parse(lectureData);
      setSelectedVideoUrl(signedUrl);
    }
  };

  const hasValidSupplementaryMaterial = (lecture) => {
    return (
      lecture.supplementaryMaterial &&
      lecture.supplementaryMaterial.length > 0 &&
      lecture.supplementaryMaterial[0] // Check if there's actually a valid link
    );
  };

  return (
    <div className="mx-auto text-black">
      <section className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg">
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
                    {section.lectures.map((lecture, lectureIndex) => {
                      const hasValidMaterial = hasValidSupplementaryMaterial(lecture);

                      return (
                        <div key={lectureIndex} className="ml-4">
                          {/* Lecture Button */}
                          <button
                            onClick={() => {
                              if (lecture.videoUrl && lecture._id) {
                                handleVideoSelect(
                                  lecture.videoUrl,
                                  lecture._id
                                );
                              }
                              if (hasValidMaterial) {
                                toggleNestedAccordion(
                                  sectionIndex,
                                  lectureIndex
                                );
                              }
                            }}
                            className="w-full px-4 py-2 hover:bg-gray-50 flex justify-between items-center rounded-lg"
                          >
                            <span className="text-sm">
                              {lecture.lectureTitle}
                            </span>
                            {hasValidMaterial && (
                              <svg
                                className={`w-4 h-4 transform transition-transform ${
                                  nestedActiveIndex === `${sectionIndex}-${lectureIndex}` ? "rotate-180" : ""
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
                            )}
                          </button>

                          {/* Nested Accordion for Supplementary Material */}
                          {hasValidMaterial &&
                            nestedActiveIndex ===
                              `${sectionIndex}-${lectureIndex}` && (
                              <div className="bg-gray-50 rounded-lg mt-2">
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
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <Tab className="px-6 py-3 font-medium hover:text-blue-600 cursor-pointer">
              <div className="flex items-center">
                <HiClipboardList className="mr-2" />
                Quiz
              </div>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Course Notes</h3>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="mx-auto lg:w-[60%] w-full p-6">
              <h3 className="text-xl font-semibold mb-4">
                Questions & Answers
              </h3>
              <CommentSection courseId={params.courseId} />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quizzes</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {quizzes.length > 0 ? (
                  quizzes.map((quiz) => (
                    <QuizCard key={quiz._id} quiz={quiz} isEnrolled={true} />
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full text-center">
                    No quizzes available for this course yet.
                  </p>
                )}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </section>
    </div>
  );
};

export default CoursePageDefault;
