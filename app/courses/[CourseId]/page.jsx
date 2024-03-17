'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CTAButton from "../../components/core/Button";


const CoursePage = ({ params }) => {

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
      
      <div className="h-2/3 flex flex-col md:flex-row justify-between text-brown px-14 mt-5 items-center">
            <div>
                <h1 className="font-sans text-4xl md:text-6xl font-bold mb-5">{courseData?.title}</h1>
                {/* <p>{author}</p> */}
                <p className='text-lg'>{courseData?.description}</p>
                {/* <p>{courseData?.price}</p>   */}
            </div>

            <div className="w-[400px] bg-white p-1 text-black shadow-lg rounded-lg">
                <img src={courseData?.imageUrl} alt="Image" width={200} height={200} className="w-full object-cover rounded"/>

                <div>
                    <p>$ {courseData?.price}</p>
                    
                    <div className="flex flex-col gap-1 mt-4">
                    <CTAButton active={true} linkto='/paymentPage'> {/* //paymentPage to be done */}
                              Buy now
                    </CTAButton>
                      
                        <p className="text-[12px] text-gray-700 text-center border-t-2 py-2">30 day money back guarantee</p>

                    </div>

                </div>

            </div>

            
      </div>


      {/* this is Curriculum */}
      <div className="w-3/4 px-14 mt-20">
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
              {/* <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p> */}
            </div>
          </div>
        </div>

        ))):(<div>Loading...</div>)}

      </div>
    </div>
  );
}

export default CoursePage;
