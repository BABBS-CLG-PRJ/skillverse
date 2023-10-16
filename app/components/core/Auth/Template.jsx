//child of sign up form//
"use client"
import frameImg from "../../../assets/Images/frame.png"
import Image from "next/image"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { useEffect, useState } from "react"
function Template({ title, description1, description2, image, formType,otp_loading2}) {
  const[loading1,setloading]=useState(false);
  const[otp_sent1,setOtpSent]=useState(false);
  function otp_loading1(otp_sent,loading){
      setloading(loading);
      setOtpSent(otp_sent);
  }

  useEffect(()=>{
    otp_loading2(otp_sent1,loading1);
  },[otp_sent1,loading1]);
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-bold leading-[2.375rem] text-richblack-900">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-800">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-primary-violet">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm otp_loading1={otp_loading1}/> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <Image
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <Image
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
     
    </div>
  )
}

export default Template