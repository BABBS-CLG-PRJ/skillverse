//Grandchild for shgn up form//
"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Tab from "./Tab";
import Link from "next/link";
import { apiConnector } from "@/app/services/apiConnector";
import { otpEndpoint } from "@/app/services/apis";
import { verify } from "jsonwebtoken";
function SignupForm({otp_loading1}) {
  // student or instructor
  const [role, setrole] = useState("Student");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

    //otp sending//
    const[otp_sent,setOtpSent]=useState(false);

    //loading for otp// 
  const [loading, setloading] = useState(false);

  useEffect(()=>{
    otp_loading1(otp_sent,loading);
  },[otp_sent,loading]);

  // Handle Form Submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    try {
      setloading(true);
      setOtpSent(false);
      const res = await apiConnector("POST", otpEndpoint.OTP_API, {
        email,
      });
      if (res.data.success === true) {
        toast.success(res.data.message);
        setOtpSent(true);
      } else {
        toast.error("Something went wrong");
        setOtpSent(false);
      }
     
      setloading(false);
    } catch (error) {
      console.log(error);
    }
    const signupData = {
      ...formData,
      role,
    };
    console.log(signupData);
    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setrole("Student");
  };
  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: "Student",
    },
    {
      id: 2,
      tabName: "Instructor",
      type: "Instructor",
    },
  ];
  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={role} setField={setrole} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">
              First Name <sup className="text-richblack-900">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              autoComplete="on"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-[#F6FFF8] border-2 border-[#652429] p-[12px] pr-10 text-richblack-900"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">
              Last Name <sup className="text-richblack-900">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              autoComplete="on"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-[#F6FFF8] border-2 border-[#652429] p-[12px] pr-10 text-richblack-900"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">
            Email Address <sup className="text-richblack-900">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            autoComplete="on"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-[#F6FFF8] border-2 border-[#652429] p-[12px] pr-10 text-richblack-900"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">
              Create Password <sup className="text-richblack-900">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="on"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-[#F6FFF8] border-2 border-[#652429] p-[12px] pr-10 text-richblack-900"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#652429" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#652429" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">
              Confirm Password <sup className="text-richblack-900">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="on"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-[#F6FFF8] border-2 border-[#652429] p-[12px] pr-10 text-richblack-900"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#652429" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#652429" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-primary-yellow py-[8px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition all duration-2000"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
