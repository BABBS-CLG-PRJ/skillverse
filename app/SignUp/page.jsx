//overall parent of sign up form//
"use client";
import { useState, useEffect } from "react";
import signupImg from "../assets/Images/signup.webp";
import Template from "../components/core/Auth/Template";
import Verify_otp from "../components/core/Auth/Verify_otp";
function Signup() {
  const [loading2, setLoading2] = useState(false);
  const [otp_sent2, setOtpsent2] = useState(false);
  function otp_loading2(otp_sent1, loading1) {
    setLoading2(loading1);
    setOtpsent2(otp_sent1);
  }
  //this is the email which i will use//
  const [email2, setemail2] = useState("");

  function setEmail2(email1) {
    setemail2(email1);
  }


  const [verified, setVerified] = useState(false);
  return otp_sent2 ? (
    <Verify_otp verified={verified} setVerified={setVerified} email={email2}/>
  ) : (
    <Template
      verified={verified}
      title="Join the millions upskilling with Skillverse"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
      otp_loading2={otp_loading2}
      setEmail2={setEmail2}
    />
  );
}

export default Signup;
