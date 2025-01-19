"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import CommentSection from "../../components/common/CommentSection";
import Loading from "./Loading";
import RatingStars from "../../components/common/RatingStars";
import QuizCard from "../../components/common/QuizCard";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import mongoose from "mongoose";
import { useRouter } from "next/navigation";

const CoursePage = ({ params }) => {
  const router = useRouter();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [totalRatings, setTotalRatings] = useState(0);
  const [totalLectures, setTotalLectures] = useState(0);
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [name, setName] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [courseResponse, quizResponse, instructorResponse] = await Promise.all([
          axios.post("/api/getcourse", {
            courseId: params.CourseId,
          }),
          axios.post("/api/getquiz", {
            courseId: params.CourseId,
          }),
          axios.post("/api/fetchname", {
            courseId: params.CourseId,
          })
        ]);

        setCourseData(courseResponse.data.courseDetails);
        setQuizzes(quizResponse.data.quizzes || []); // Ensure we always set an array
        setName(instructorResponse.data.name);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // If there's an error with course data, show error state
        if (!courseData) {
          setLoading(false);
        } else {
          // If we at least have course data, continue showing the page
          setQuizzes([]);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [params.CourseId]);

  useEffect(() => {
    // Fetch user info
    const fetchUserInfo = async () => {
      const authToken = localStorage.getItem("authtoken");
      if (authToken) {
        try {
          const response = await axios.post("/api/verifytoken", {
            token: authToken,
          });
          setUser(response.data.decodedToken.userObject);
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    // Calculate total ratings, lectures, and materials
    if (courseData) {
      setTotalRatings(courseData.reviews?.length || 0);
      setTotalPrice(courseData.price || 0);
      let lectures = 0;
      let materials = 0;

      courseData.curriculum.forEach((section) => {
        lectures += section.lectures.length;
        section.lectures.forEach((lecture) => {
          materials += lecture.supplementaryMaterial.length;
        });
      });

      setTotalLectures(lectures);
      setTotalMaterials(materials);
    }
  }, [courseData]);

  useEffect(() => {
    // Check if user is enrolled
    if (user && courseData) {
      const userIdStr = user._id.toString();
      setIsEnrolled(courseData.studentsEnrolled.includes(userIdStr));
    }
  }, [user, courseData]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const couponCode = e.target.elements.couponCode.value;

    if (couponCode === "EXAMPLE10") {
      setTotalPrice(0);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code.");
    }

    setAppliedCoupon(couponCode);
    e.target.elements.couponCode.value = "";
  };

  const handleBuyCourse = async () => {
    if (!user) {
      toast.error("Please log in to enroll in the course.");
      return;
    }

    setEnrollmentLoading(true);
    try {
      await axios.post("/api/buycourse", {
        courseId: params.CourseId,
        uid: user._id.toString(),
      });
      setIsEnrolled(true);
      toast.success("Enrolled successfully!");
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error("Error enrolling. Please try again.");
    } finally {
      setEnrollmentLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!courseData) {
    return <div>Loading course data...</div>;
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-y-12 pt-12 md:flex-row md:gap-y-0 md:gap-x-12">
        <div className="mx-auto w-full md:mx-0">
          <h1 className="text-[1.875rem] font-bold leading-[2.375rem] text-richblack-900">
            {courseData.title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            {courseData.description}
          </p>
          {courseData.rating !== undefined ? (
            <span className="flex items-center gap-2">
              <RatingStars Review_Count={courseData.rating} />
              <p>
                {Math.round(courseData.rating * 10) / 10} ({totalRatings}{" "}
                ratings)
              </p>
            </span>
          ) : (
            <p className="text-gray-500">No ratings available</p>
          )}
          <p className="font-bold font-serif">Created By: {name}</p>
          <h3 className="text-2xl font-medium mb-2 mt-5">
            This course includes
          </h3>
          <ul className="list-none space-y-5">
            <li className="text-base flex gap-2">
              <span role="img" aria-label="video-icon">
                📹
              </span>{" "}
              {totalLectures} videos
            </li>
            <li className="text-base flex gap-2">
              <span role="img" aria-label="material-icon">
                📄
              </span>{" "}
              {totalMaterials} downloadable resources
            </li>
            <li className="text-base flex gap-2">
              <span role="img" aria-label="mobile-icon">
                📱
              </span>{" "}
              Mobile and TV access
            </li>
            <li className="text-base flex gap-2">
              <span role="img" aria-label="trophy-icon">
                🏆
              </span>{" "}
              Certificate of completion
            </li>
          </ul>
        </div>
        <div className="relative ml-5 mx-auto w-11/12 max-w-[450px] md:mx-0">
          <div className="sticky top-5 w-fit text-black shadow-lg rounded-md flex flex-row justify-center">
            <Card maxW="sm" __css={{ padding: "8px" }}>
              <CardBody>
                <Image
                  src={courseData.imageUrl}
                  alt={courseData.title}
                  borderRadius="md"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{courseData.title}</Heading>
                  <div className="mb-3">
                    <span className="line-through text-xl">
                      ₹ {courseData.price + 1000}
                    </span>
                    <span className="ml-3 font-bold text-2xl">
                      ₹ {totalPrice}
                    </span>
                    <span className="ml-5 font-bold text-md text-red-600">
                      ₹1000 off
                    </span>
                  </div>
                </Stack>
              </CardBody>
              <div className="flex-col items-center p-2">
                <form
                  onSubmit={handleApplyCoupon}
                  className="flex flex-col gap-4 items-center pb-4"
                >
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="couponCode"
                      placeholder="🎟️ Enter coupon code"
                      className="w-full outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 border-gray-300 rounded-lg px-6 py-4 text-lg placeholder-gray-500 shadow-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-lg text-black border-2 rounded-lg hover:bg-yellow-400 cursor-pointer border-yellow-400 text-center py-3 font-bold shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    Apply Coupon
                  </button>
                </form>
                {couponMessage && (
                  <p
                    className={
                      couponMessage.includes("successfully")
                        ? "text-green-400 pb-2"
                        : "text-red-600 pb-2"
                    }
                  >
                    {couponMessage}
                  </p>
                )}
                {user ? (
                  isEnrolled ? (
                    <button disabled className="w-full">
                      Enrolled
                    </button>
                  ) : totalPrice === 0 ? (
                    <button
                      onClick={handleBuyCourse}
                      isLoading={enrollmentLoading}
                      className="w-full text-black border-2 rounded-md hover:bg-yellow-400 cursor-pointer border-yellow-400 text-center p-2 font-bold"
                    >
                      Buy Now
                    </button>
                  ) : (
                    <button disabled>
                      Price: ₹{totalPrice} Add coupon to buy
                    </button>
                  )
                ) : (
                  <button
                    className="w-full text-black border-2 rounded-md hover:bg-yellow-400 cursor-pointer border-yellow-400 text-center p-2 font-bold"
                    onClick={() => router.push("/login")}
                  >
                    Login to Buy
                  </button>
                )}
              </div>
              <Divider />
              <p className="text-[12px] text-gray-700 text-center border-t-2 py-2">
                30 day money back guarantee
              </p>
            </Card>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between pb-12 md:flex-row md:gap-y-0 md:gap-x-12">
        <div className="mx-auto w-3/5 md:mx-0">
          <h2 className="text-[1.875rem] font-bold leading-[2.375rem] text-richblack-900 mb-5">
            Curriculum
          </h2>
          <Accordion allowMultiple>
            {courseData.curriculum.map((section, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "#FFC864", color: "black" }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      {section.sectionTitle}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {section.lectures.map((lecture, lectureIndex) => (
                  <AccordionPanel key={lectureIndex} className="w-full" pb={4}>
                    <div className="pl-4 flex gap-x-1">
                      <span role="img" aria-label="play-icon">
                        📹
                      </span>
                      {lecture.lectureTitle}
                    </div>
                  </AccordionPanel>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className="mx-auto w-11/12 max-w-maxContent py-12">
        <h2 className="text-[1.875rem] font-bold leading-[2.375rem] text-richblack-900 mb-5">
          Quizzes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No quizzes available for this course yet.
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto p-6 lg:w-[60%] w-full">
        <CommentSection courseId={params.CourseId} courseData={courseData} />
      </div>
    </div>
  );
};

export default CoursePage;
