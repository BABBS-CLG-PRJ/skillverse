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

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalRatings, setTotalRating] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/getcourse", {
          courseId: params.CourseId,
        });
        setCourseData(response.data.courseDetails);
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
  }, [courseData]);

  // var totalRatings = 0;
  // var i;
  // useEffect(() => {
  //   const calculateRatings = async () => {
  //     for (i = 0; i < courseData?.reviews.length; i++) {
  //       totalRatings += 1;
  //     }
  //   };

  //   calculateRatings();
  // }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
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
              <span class="text-black-800 text-md font-semibold flex-row px-2.5 py-0.5">
                <p className="text-gray-700 flex gap-5">
                  <RatingStars Review_Count={courseData.rating} />
                  {courseData.rating}({totalRatings} ratings)
                </p>
              </span>

              <span>
                <p>Created By</p>
              </span>

              <span>
                <h3 className="text-2xl font-medium mb-2 mt-5">
                  This course includes
                </h3>
                <ul className="list-none space-y-5">
                  <li className="text-base flex gap-2">
                    <SquarePlay /> 61 hours on-demand video
                  </li>
                  <li className="text-base flex gap-2">
                    <BookOpenText />
                    194 downloadable resources
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

              {/* <div className="container mx-auto px-4 py-10 ">
                <div className="grid grid-rows-1 md:grid-cols-1 gap-8">
                  <div className=" p-6">
                    <h3 className="text-2xl font-medium mb-4">
                      This course includes
                    </h3>
                    <ul className="list-disc space-y-2">
                      <li className="text-base">61 hours on-demand video</li>
                      <li className="text-base">194 downloadable resources</li>
                      <li className="text-base">Mobile and TV access</li>
                      <li className="text-base">Certificate of completion</li>
                    </ul>
                  </div>
                </div>
              </div> */}
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
                      <Text color="black" fontSize="2xl">
                        ₹ {courseData?.price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <div className="flex-col items-center p-2">
                    <div className="bg-yellow-400 text-center p-2 rounded-md font-bold cursor-pointer flex items-center justify-center gap-2">
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

          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
            <div className=" mx-auto w-3/5 md:mx-0">
              <h2 className="text-[1.875rem] font-bold leading-[2.375rem] text-richblack-900">
                Curriculum
              </h2>

              <Accordion defaultIndex={[0]} allowMultiple>
                {courseData ? (
                  courseData.curriculum.map((course, index) => (
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{ bg: "gray", color: "white" }}
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

          <div className="mx-auto p-6 lg:w-[60%] w-full">
            <CommentSection />
          </div>
        </div>
      )}

      {/* <div className="h-2/3 flex flex-col md:flex-row justify-between text-brown px-14 mt-5 items-center">
            <div>
                <h1 className="font-sans text-4xl md:text-6xl font-bold mb-5">{courseData?.title}</h1>
                
                <p className='text-lg'>{courseData?.description}</p>
                
            </div>

            <div className="w-[400px] bg-white p-1 text-black shadow-lg rounded-lg">
                <img src={courseData?.imageUrl} alt="Image" width={200} height={200} className="w-full object-cover rounded"/>

                <div>
                    <p>$ {courseData?.price}</p>
                    
                    <div className="flex flex-col gap-1 mt-4">
                    <CTAButton active={true} linkto='/paymentPage'> 
                              Buy now
                    </CTAButton>
                      
                        <p className="text-[12px] text-gray-700 text-center border-t-2 py-2">30 day money back guarantee</p>

                    </div>

                </div>

            </div>

                  
      </div> */}

      {/* this is Curriculum */}
      {/* <div className="w-3/4 px-14 mt-20">
        <h2 className='font-sans text-4xl font-semibold mb-3'>Curriculum</h2>

        {courseData ? (
        // Render your course data here
        courseData.curriculum.map((course) => (

          

        
            
        <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
          <h2 id="accordion-flush-heading-1">
            <button type="button" class="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
              <span>{course.sectionTitle}</span>
              <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-1" class="hidden" aria-labelledby="accordion-flush-heading-1">
            <div class="py-5 border-b border-gray-200 dark:border-gray-700">
              <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
              <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p> 
            </div>
          </div>
        </div>

        ))):(<div>Loading...</div>)}

    </div> */}
    </div>
  );
};

export default CoursePage;
