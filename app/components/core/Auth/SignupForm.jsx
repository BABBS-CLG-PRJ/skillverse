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

function SignupForm({ otp_loading1 }) {
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
  const [otp_sent, setOtpSent] = useState(false);

  //loading for otp//
  const [loading, setloading] = useState(false);

  useEffect(() => {
    otp_loading1(otp_sent, loading);
    console.log("loADING CHANGED TO", loading);
  }, [otp_sent, loading]);

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
        setOtpSent(res.data.success);
      } else {
        toast.error("Something went wrong");
        setOtpSent(res.data.success);
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
              className="w-full rounded-[0.5rem] bg-[#F6FFF8] border-2 border-[#652429] p-[12px] pr-10 text-richblack-900 focus:ring focus:border-[2.5px] focus:border-[#652429]"
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
              className="w-full rounded-[0.5rem] bg-[#F6FFF8] border-2 border-[#652429] p-[12px] pr-10 text-richblack-900 focus:ring focus:border-[2.5px] focus:border-[#652429]"
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
            className="w-full rounded-[0.5rem] bg-[#F6FFF8] border-2 border-[#652429] p-[12px] pr-10 text-richblack-900 focus:ring focus:border-[2.5px] focus:border-[#652429]"
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
              className="w-full rounded-[0.5rem] bg-[#F6FFF8] border-2 border-[#652429] p-[12px] pr-10 text-richblack-900 focus:ring focus:border-[2.5px] focus:border-[#652429]"
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
              className="w-full rounded-[0.5rem] bg-[#F6FFF8] border-2 border-[#652429] p-[12px] pr-10 text-richblack-900 focus:ring focus:border-[2.5px] focus:border-[#652429]"
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
        {!loading ? (
      
          

          <button
            type="submit"
            className="mt-6 flex justify-evenly rounded-[8px] bg-primary-yellow py-[8px] px-[12px]  hover:bg-yellow-300 transition-all duration-500 font-medium text-richblack-900 hover:scale-95 "
          >
           
            Create Account
          </button>

       
        ) : (
          <button
            type="submit"
            className="mt-6 flex justify-evenly rounded-[8px] bg-primary-yellow py-[8px] px-[12px]  hover:bg-yellow-300 transition-all duration-500 font-medium text-richblack-900 hover:scale-95 "
          >
            <span>Processing...</span>{" "}
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </button>
        )}
      </form>
    </div>
  );
}

export default SignupForm;
