//overall parent of sig up form//
"use client"
import { useState } from "react"
import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"
import Verify_otp from "../components/core/Auth/Verify_otp"
function Signup() {
  const[loading2,setLoading2]=useState(false);
  const[otp_sent2,setOtpsent2]=useState(false);
  function otp_loading2(otp_sent1,loading1){
    console.log("Setting loading2 to", loading1);
    console.log("Setting otp_sent2 to", otp_sent1);
      setLoading2(loading1);
      setOtpsent2(otp_sent1);
  }
  
  
  // console.log("loading (determines the loading screen) for ultimate sign up:",loading2);
  // console.log("Otp-sent (determines the verify otp page) for ultimate sign up:",otp_sent2);
  return (
  //   loading2?( <div className=".custom-loader w-[100%] pt-[30%] pb-[30%]">
  //   <div className="custom-loader"></div>
  // </div>):(otp_sent2?(<Verify_otp/>):( ))
  <div>
    <div className="flex flex-col items-center">
      <span>Loading:{loading2.toString()}</span>
      <span>otp_sent:{otp_sent2.toString()}</span>
      </div>
  <Template
  title="Join the millions upskilling with Skillverse"
  description1="Build skills for today, tomorrow, and beyond."
  description2="Education to future-proof your career."
  image={signupImg}
  formType="signup"
  otp_loading2={otp_loading2}
/>
</div>
  );
}

export default Signup;