"use client";
import React from "react";
import ContactUsForm from "../components/core/ContactUsForm";
import Lottie from "lottie-react";
import { GlobeDemo } from "../components/special/globe";
const page = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        <div className="lg:w-[40%]">
          <div className="flex flex-col items-center gap-y-4 md:gap-y-2">
            <div>
              <h2 className="text-center text-xl md:text-4xl text-primary-accent-color font-extrabold">
                We operate Globally
              </h2>
              <p className="text-center text-base md:text-lg  text-richblack-900  font-bold max-w-md mt-2 mx-auto">
                Leave a Message&apos;and we will get in touch with you shortly.
              </p>
            </div>
            <div className="globe-container" style={{ width: "80vw" }}>
              <GlobeDemo/>
            </div>
          </div>

         
        </div>
        <div className="lg:w-[60%] z-999">
          <div className="border-2 border-[#652429] text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
            <h1 className="text-4xl leading-10 font-extrabold text-[#652429]">
              Have an Idea? We are proficient. Let's cooperate.
            </h1>
            <p className="text-lg font-semibold text-black">
              Please elaborate about your background and your objectives.
            </p>
            <div className="mt-7">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white"></div>
    </div>
  );
};

export default page;
