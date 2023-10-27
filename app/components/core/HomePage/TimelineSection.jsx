import React from "react";
import Image from "next/image";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import Awesome from "../../../assets/Images/Awesome.json";
  {/* This is the magic */}
import Lottie from "lottie-react";
  {/* This is the magic */}
const timeline = [
  {
    Logo: Logo1,
    heading: "Direction",
    Description: "Utterly dedicated to the company's success",
  },
  {
    Logo: Logo2,
    heading: "Academic",
    Description: "Best in Town.No one can match our Expertise",
  },
  {
    Logo: Logo3,
    heading: "Premiumness",
    Description: "Premium courses: up to 95% off for knowledge boost",
  },
  {
    Logo: Logo4,
    heading: "Practicality",
    Description: "Learn essentials for jobs and celebrate success together.",
  },
];

const TimelineSection = () => {
  return (
    <div >
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-[45%] flex flex-col gap-5 p-3 lg:p-0 items-start justify-center">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-row gap-6" key={index}>
                <div className="w-[50px] h-[50px]  flex items-center">
                  <Image src={element.Logo} />
                </div>

                <div>
                  <h2 className="font-bold text-[30px]">
                    {element.heading}
                  </h2>
                  <p className="text-xl font-semibold">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative shadow-blue-200 ">
          {/* This is the magic */}
          <Lottie animationData={Awesome} />
            {/* This is the magic */}
          <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] rounded-md">
            <div className="flex flex-row gap-5 items-center border-r-4 border-caribbeangreen-300  px-7 ">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm font-bold">
                Years of Experience
              </p>
            </div>

            <div className="flex gap-5 items-center px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-sm font-bold">Type of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
