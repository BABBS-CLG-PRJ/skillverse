"use client";
import React, { useEffect, useState } from "react";
import CommentSection from "../../components/common/CommentSection";
import Loading from "./Loading";
import RatingStars from "../../components/common/RatingStars";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import axios from "axios";
import CTAButton from "../../components/core/Button";
import {
  SquarePlay,
  Zap,
  ShoppingCart,
  MonitorSmartphone,
  Trophy,
  BookOpenText,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

const CoursePage = ({ params }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalRatings, setTotalRating] = useState(0);
  const [totalLectures, setTotalLectures] = useState(0);
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [name, setName] = useState("");
  // const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/getcourse", {
          courseId: params.CourseId,
        });
        // const quizResponse = await axios.post("/api/getquiz", {
        //   courseId: params.CourseId,
        // });
        // console.log(quizResponse)
        const instructor = await axios.post("/api/fetchname", {
          courseId: params.CourseId,
        });
        setName(instructor.data.name);
        setCourseData(response.data.courseDetails);
        // setQuizzes(quizResponse.data.quizzes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.CourseId]);

  useEffect(() => {
    // Calculate totalRatings after courseData is updated
    if (courseData && courseData.reviews) {
      setTotalRating(courseData.reviews.length);
    }
    if (courseData && courseData.price) {
      setTotalPrice(courseData.price);
    }
    if (courseData && courseData.curriculum) {
      var lecture = 0;
      var i;
      for (i = 0; i < courseData.curriculum.length; i++) {
        lecture += courseData.curriculum[i].lectures.length;
      }
      setTotalLectures(lecture);
    }
    if (courseData && courseData.curriculum) {
      var materials = 0;
      var i;
      var j;
      for (i = 0; i < courseData.curriculum.length; i++) {
        for (j = 0; j < courseData.curriculum[i].lectures.length; j++) {
          materials +=
            courseData.curriculum[i].lectures[j].supplementaryMaterial.length;
        }
      }
      setTotalMaterials(materials);
    }
  }, [courseData]);

  const handleApplyCoupon = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const couponCode = e.target.elements.couponCode.value;
    // Apply coupon logic here (e.g., API call to verify coupon)

    let discountedPrice = totalPrice;

    if (couponCode === "EXAMPLE10") {
      discountedPrice = 0;
      setCouponMessage("Coupon applied successfully!");
      e.target.elements.couponCode.value = "";
    } else {
      setCouponMessage("Invalid coupon code");
      e.target.elements.couponCode.value = "";
    }

    setTotalPrice(discountedPrice);
    setAppliedCoupon(couponCode);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-y-12 pt-12 md:flex-row md:gap-y-0 md:gap-x-12">
            <div className="mx-auto w-full md:mx-0">
              <h1 className="text-[1.875rem] font-bold leading-[2.375rem] text-richblack-900">
                {courseData?.title}
              </h1>
              <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                <span className="text-richblack-800">
                  {courseData?.description}
                </span>{" "}
                {/* <span className="font-edu-sa font-bold italic text-primary-violet">
                    {description2}
                  </span> */}
              </p>
              {courseData?.rating ? (
                <span className="text-black-800 text-md font-semibold flex-row px-2.5 py-0.5">
                  <p className="text-gray-700 flex gap-5">
                    <RatingStars Review_Count={courseData.rating} />
                    {Math.round(courseData.rating*10)/10}({totalRatings} ratings)
                  </p>
                </span>
              ) : (
                <p className="text-gray-500">No ratings available</p>
              )}

              <span>
                <p className="font-bold font-serif">Created By: {name}</p>
              </span>

              <span>
                <h3 className="text-2xl font-medium mb-2 mt-5">
                  This course includes
                </h3>
                <ul className="list-none space-y-5">
                  <li className="text-base flex gap-2">
                    <SquarePlay /> {totalLectures} videos
                  </li>
                  <li className="text-base flex gap-2">
                    <BookOpenText />
                    {totalMaterials} downloadable resources
                  </li>
                  <li className="text-base flex gap-2">
                    <MonitorSmartphone />
                    Mobile and TV access
                  </li>
                  <li className="text-base flex gap-2">
                    <Trophy />
                    Certificate of completion
                  </li>
                </ul>
              </span>
            </div>
            <div className="relative ml-5 mx-auto w-11/12 max-w-[450px] md:mx-0">
              <div className="sticky top-5 w-9/12 bg-white text-black shadow-lg rounded-md">
                <Card maxW="sm" __css={{ padding: "8px" }}>
                  <CardBody>
                    <Image
                      src={courseData?.imageUrl}
                      alt="Green double couch with wooden legs"
                      borderRadius="md"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{courseData?.title}</Heading>
                      <div className=" mb-3">
                        <span className="line-through text-xl">
                          ₹ {courseData?.price + 1000}
                        </span>
                        <span className="ml-3 font-bold  text-2xl">
                          ₹ {totalPrice}
                        </span>
                        <span className="ml-5 font-bold text-md text-red-600">
                          ₹1000 off
                        </span>
                      </div>
                    </Stack>
                  </CardBody>

                  <div className="flex-col items-center p-2">
                    <div>
                      <form
                        onSubmit={handleApplyCoupon}
                        className="flex justify-between"
                      >
                        <input
                          type="text"
                          name="couponCode"
                          placeholder="Enter coupon code"
                          className="outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 border-gray-300 rounded-md px-4 py-2"
                        />
                        <button
                          type="submit"
                          className="text-black border-2 rounded-md hover:bg-yellow-400 cursor-pointer border-yellow-400 text-center p-2 font-bold"
                        >
                          Apply
                        </button>
                      </form>
                      {couponMessage && (
                        <p
                          className="text-green-400"
                          style={{
                            color: couponMessage.includes("successfully")
                              ? "green"
                              : "red",
                          }}
                        >
                          {couponMessage}
                        </p>
                      )}
                    </div>
                    <div className="bg-yellow-400 mt-2 text-center p-2 rounded-md font-bold cursor-pointer flex items-center justify-center gap-2">
                      <Zap /> Buy Now
                    </div>
                    <div className="text-black mt-2 border-2 rounded-md hover:bg-yellow-400 cursor-pointer border-yellow-400 text-center p-2 font-bold flex items-center justify-center gap-2">
                      <ShoppingCart />
                      Add to Cart
                    </div>
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
            <div className=" mx-auto w-3/5 md:mx-0">
              <h2 className="text-[1.875rem] font-bold leading-[2.375rem] text-richblack-900 mb-5">
                Curriculum
              </h2>

              <Accordion defaultIndex={[0]} allowMultiple>
                {courseData ? (
                  courseData.curriculum.map((course, index) => (
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{ bg: "#FFC864", color: "black" }}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            {course.sectionTitle}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      {course.lectures.map((lecture) => (
                        <AccordionPanel className="w-full" pb={4}>
                          <div className="pl-4 flex gap-x-1">
                            <SquarePlay />
                            {lecture.lectureTitle}
                          </div>
                        </AccordionPanel>
                      ))}
                    </AccordionItem>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </Accordion>
            </div>
          </div>

          {/* <div className="mx-auto w-11/12 max-w-maxContent py-12">
            <h2 className="text-[1.875rem] font-bold leading-[2.375rem] text-richblack-900 mb-5">
              Quizzes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz._id} quiz={quiz} />
              ))}
            </div>
          </div> */}

          <div className="mx-auto p-6 lg:w-[60%] w-full">
            <CommentSection />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
