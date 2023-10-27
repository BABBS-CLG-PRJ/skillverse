import React from "react";
import Image from "next/image";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.svg";
import compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "../HomePage/Button";
const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px] mb-32">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-extrabold text-center">
          Your versatile tool 
          <HighlightText text={" mastering any language"} />
        </div>

        <div className="text-center text-richblack-600 mx-auto text-2xl font-bold  w-[70%]">
          Skillverse makes the process of learning multiple languages easy, offering
          over 20 languages with realistic voice-overs, progress tracking,
          customizable schedules, and a variety of additional features to
          enhance your language acquisition journey.
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center mt-5">
          <Image
            src={know_your_progress}
            alt="KNowYourProgressImage"
            className="object-contain md:-mr-32 "
          />
          <Image
            src={compare_with_others}
            alt="KNowYourProgressImage"
            className="object-contain"
          />
          <Image
            src={plan_your_lesson}
            alt="KNowYourProgressImage"
            className="object-contain md:-ml-36"
          />
        </div>

        <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"}>
            <div>Learn more</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
