'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CTAButton from "../../components/core/Button";


const CoursePage = ({ params }) => {

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/getcourse', { courseId: params.CourseId });
        setCourseData(response.data.courseDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

 
  return (

    

    <div>

      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
              <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                <h1 className="text-[1.875rem] font-bold leading-[2.375rem] text-richblack-900">
                  {courseData?.title}
                </h1>
                <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                  <span className="text-richblack-800">{courseData?.description}</span>{" "}
                  {/* <span className="font-edu-sa font-bold italic text-primary-violet">
                    {description2}
                  </span> */}
                </p>
                {/* {formType === "signup" ? <SignupForm otp_loading1={otp_loading1} setsignup1={setsignup1}/> : <LoginForm />} */}
              </div>
              <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
              <div className="w-[400px] bg-white p-1 text-black shadow-lg rounded-md">
                <img src={courseData?.imageUrl} alt="Image" width={200} height={200} className="w-full object-cover rounded-md"/>

                <div>
                    <p>Rs. {courseData?.price}</p>
                    
                    <div className="flex flex-col gap-1 mt-4">
                    <CTAButton active={true} linkto='/paymentPage'> 
                              Buy now
                    </CTAButton>
                      
                        <p className="text-[12px] text-gray-700 text-center border-t-2 py-2">30 day money back guarantee</p>

                    </div>

                </div>

            </div>
              </div>
            </div>

            
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
              <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                <h2 className="text-[1.875rem] font-bold leading-[2.375rem] text-richblack-900">
                  Curriculum
                </h2>

                {courseData ? (
        courseData.curriculum.map((course, index) => (
          <div key={index} id={`accordion-flush-${index}`} data-accordion="collapse" data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
            <h2 id={`accordion-flush-heading-${index}`}>
              <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" onClick={() => toggleAccordion(index)} aria-expanded={activeIndex === index} aria-controls={`accordion-flush-body-${index}`}>
                <span>{course.sectionTitle}</span>
                <svg data-accordion-icon className={`w-3 h-3 rotate-180 shrink-0 ${activeIndex === index ? 'transform rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>
            </h2>

            {course.lectures.map((lectures) => (
              <div id={`accordion-flush-body-${index}`} className={`py-5 border-b border-gray-200 dark:border-gray-700 ${activeIndex === index ? '' : 'hidden'}`} aria-labelledby={`accordion-flush-heading-${index}`}>
              {/* <span className="mb-2 text-gray-500 dark:text-gray-400">{lectures.lectureTitle}.</span> */}
              <p className="text-gray-500 dark:text-gray-400">{lectures.lectureTitle}: <a href={lectures.videoUrl} className="text-blue-600 dark:text-blue-500 hover:underline">Video</a> </p>
            </div>
            ))}
            
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}

              </div>

            </div>

        
      </div>
      
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
}

export default CoursePage;
