import React from "react";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroudGradient,

}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 flex-wrap `}>
      {/*Section 1*/}
      <div className=" flex flex-col gap-4 justify-between items-start lg:w-[50%] p-3">
        {heading}
        <div className="text-richblack-700 font-extrabold text-xl p-2 md:text-2xl">
          {subheading}
        </div>

        <div className="flex gap-7 mt-7 p-3">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/*Section 2*/}
      <div className=" h-fit  flex flex-row text-10[px] w-[100%] py-3 lg:w-[500px] glass  ">
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
            <p>13</p>
            <p>14</p>
            <p>15</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono {codeColor} pr-2 relative`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            speed={60}
            deletionSpeed={80}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              overflowX: "hidden",
              fontSize: "16px",
             
            }}
            omitDeletionAnimation={true}
          />
          <div className={`absolute ${backgroudGradient}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
