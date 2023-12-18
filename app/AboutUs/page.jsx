//Author:Supratik De// 
"use client";
import React from "react";
import Lottie from "lottie-react";
import Aboutusanimation from "../assets/Images/About us Animation.json";
import HighlightText from "../components/core/Highlighttext";
import Quote from "../components/core/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/Stats";
import LearningGrid from "../components/core/LearningGrid";
import ContactFormSection from "../components/core/ContactFormSection";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  // const hashPassword = async (password) => {
  //   const salt = await bcrypt.genSalt(10);
  //   const hash = await bcrypt.hash(password, salt);
  //   return hash;
  // }
  // const addUser = async () => {
  //   // dummy test use
  //   const testuser = {
  //     name: "Test User",
  //     email: "test2@gmail.com",
  //     passwordHash: await hashPassword("rest")
  //   }
  //   try {
  //     axios.post('/api/adduser', testuser).then((response) => {
  //       console.log(response);
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const validateUser = async () => {
  //   const testvalidator = {
  //     email: "test1@gmail.com",
  //     password: "test"
  //   }
  //   try {
  //     axios.post('/api/validateuser', testvalidator).then((response) => {
  //       console.log(response.data);
  //       // authtoken ---> false means unverified user
  //       localStorage.setItem('authtoken', response.data.result.authtoken) // save the authtoken to local storage
  //       // const decoded = jwt.verify(localStorage.getItem('authtoken'), privateKey); // to verify a token
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="mx-auto text-white">
      {/* section 1 */}
      <section
        className="bg-[#F6FFF8] rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-40 border border-gray-100
"
      >
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-black">
          <header className="mx-auto py-20 text-[50px] font-bold lg:w-[70%]">
            Promoting Online Education Innovation for a
            <HighlightText text={"Better Future"} className="z-5"/>
            <p
              className="mx-auto mt-3 text-center text-2xl font-black
            text-richblack-900 lg:w-[95%]"
            >
              Skillverse is Leading the charge for online education innovation.
              By providing cutting-edge courses, utilizing cutting-edge
              technologies, and fostering a lively learning community, we are
              passionate about building a better future.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <Lottie animationData={Aboutusanimation} />
            
          </div>
        </div>
      </section>

      {/* section 2 */}
      <div className="main">
        <section className=" border-primary-yellow border-y-4 bg-primary-body">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
            <div className="h-[100px] "></div>
            <Quote />
          </div>
        </section>
      </div>

      {/* section 3 */}
      <div className="main">
        <section className="bg-[#F6FFF8] rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-40 border border-gray-100">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
            <div className="flex flex-col items-center gap-10 lg:flex-row justify-between ">
              {/* founding story left box */}
              <div className="my-24 flex lg:w-[50%] flex-col gap-10 border border-teal-700 p-10 bg-primary-body rounded-2xl">
                <h1 className="bg-[#652429] bg-clip-text text-5xl font-extrabold text-transparent lg:w-[70%] p-[20px] ">
                  Our Founding Story
                </h1>

                <p className="text-xl font-bold text-richblack-900 lg:w-[95%]">
                Our e-learning platform arose from a shared vision and desire to change education. It all started with a group of educators, technologists, and lifelong learners who saw a need for accessible, flexible, and high-quality learning experiences in an ever-changing digital environment.
                </p>

                <p className=" text-xl text-richblack-900 lg:w-[95%]">
                We personally encountered the shortcomings and difficulties of conventional educational systems because we are seasoned educators.
                  We held the opinion that education shouldn't be limited to the four walls of a classroom or by physical constraints. A platform that could close these gaps and enable people from all walks of life to realize their full potential was what we envisioned.
                </p>
              </div>
              {/* foudning story right box */}
              <div>
                <Image
                  className="shadow-[10px_0_40px_20px] shadow-[#fdea73]"
                  src={FoundingStory}
                />
              </div>
            </div>

            {/* vision and mission parent div */}
            <div className="flex flex-col gap-6 items-center lg:gap-10 lg:flex-row lg:justify-evenly mb-[10px]">
              {/* left box */}
              <div className="max-w-sm bg-primary-body border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-indigo-950 shadow-2xl">
                <div className="p-20">
                  <Link href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Our Vision
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-black dark:text-gray-400">
                  We set out on a mission to develop an e-learning platform that would alter the way people study with this aim in mind. Our team of committed experts put in countless hours to create a solid and user-friendly platform that blends cutting-edge technology with interesting material to promote a dynamic and interactive learning environment.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
                                                                  
              {/* right box */}
              <div className="max-w-sm bg-primary-body border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-indigo-950 shadow-2xl mb-6 ">
                <div className="p-16">
                  <Link href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Our Mission
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-black dark:text-gray-400">
                  Beyond simply offering courses online, our mission extends. In order to foster a vibrant learning environment where people can interact, work together, and share knowledge, we set out to establish a community of learners. We promote this collaborative atmosphere through forums, live sessions, and networking opportunities because we think that knowledge flourishes in a setting where ideas are exchanged and discussed.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* section 4 */}
      <StatsComponent />

      {/* section 5 */}
      <section className="mx-auto p-2 flex flex-col items-center justify-between gap-5 mb-[140px]">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <section>
        <div className=" mb-16 mt-3 w-screen">
          <h2 className="text-center text-4xl font-semibold mt-8 text-richblack-900 mb-5">
            Reviews from other learners
          </h2>
        </div>
      </section>
    </div>
  );
};
export default page;
