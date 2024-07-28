//overall parent of sign up form//
"use client";
import { useState, useEffect } from "react";
import SignUp from "../assets/Images/SignUp.json";
import Template from "../components/core/Auth/Template";
import Verify_otp from "../components/core/Auth/Verify_otp";
function Signup() {
  const [loading2, setLoading2] = useState(false);
  const [otp_sent2, setOtpsent2] = useState(false);
  function otp_loading2(otp_sent1, loading1) {
    setLoading2(loading1);
    setOtpsent2(otp_sent1);
  }
  //this is the signupdata which i will use//
  //hello
 
  const [signup2, setsignup22] = useState({});
  function setsignup2(signup1) {
    setsignup22(signup1);
  }
  return otp_sent2 ? (
    <Verify_otp  signup={signup2} />
  ) : (
    <Template
      title="Join the millions upskilling with Skillverse"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={SignUp}
      formType="signup"
      otp_loading2={otp_loading2}
      setsignup2={setsignup2}
    />
  );
}

export default Signup;
