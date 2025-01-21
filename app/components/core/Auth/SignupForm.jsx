//Grandchild for sign up form//
"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Tab from "./Tab";
import Link from "next/link";
import { apiConnector } from "../../../services/apiConnector";
import { otpEndpoint } from "../../../services/apis";
import axios from 'axios';
import { Eye, EyeOff } from "lucide-react";

const DecorativeSVG = () => (
  <svg className="absolute right-0 top-0 -z-10 h-72 w-72 opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill="#652429" d="M44.5,-76.3C58.3,-69.1,70.7,-58.3,79.1,-44.7C87.5,-31.1,91.9,-15.5,91.2,-0.4C90.5,14.8,84.6,29.5,76.2,42.6C67.8,55.7,56.8,67,43.7,74.7C30.5,82.3,15.3,86.2,0.2,85.9C-14.8,85.6,-29.7,81.1,-43.5,73.5C-57.3,65.9,-70,55.2,-77.6,41.6C-85.2,28,-87.6,14,-86.5,0.6C-85.4,-12.8,-80.8,-25.6,-73.7,-37.3C-66.6,-49,-57,-59.6,-44.8,-67.4C-32.6,-75.2,-17.8,-80.2,-1.3,-78.2C15.2,-76.2,30.7,-83.5,44.5,-76.3Z" transform="translate(100 100)" />
  </svg>
);

const WaveSVG = () => (
  <svg className="absolute left-0 bottom-0 -z-10 w-full opacity-10" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
    <path fill="#652429" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
  </svg>
);

const RoleTab = ({ role, setRole }) => {
  return (
    <div className="flex rounded-lg border border-gray-300 p-1">
      {["Student", "Instructor"].map((type) => (
        <button
          key={type}
          onClick={() => setRole(type)}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
            role === type
              ? "bg-[#652429] text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
          type="button"
        >
          {type}
        </button>
      ))}
    </div>
  );
};

function SignupForm({ otp_loading1, setsignup1 }) {
  const [role, setRole] = useState("Student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp_sent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { firstName, lastName, email, password, confirmPassword } = formData;

  useEffect(() => {
    otp_loading1(otp_sent, loading);
  }, [otp_sent, loading]);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      setLoading(true);
      setOtpSent(false);
      
      const response = await fetch('/api/getotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOtpSent(true);
      } else {
        setError("Failed to send OTP");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }

    const signupData = {
      ...formData,
      role,
    };
    setsignup1(signupData);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setRole("Student");
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
      <DecorativeSVG />
      <WaveSVG />
      
      <div className="relative z-10">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Create Account</h2>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <RoleTab role={role} setRole={setRole} />
        
        <form onSubmit={handleOnSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#652429] focus:ring-2 focus:ring-[#652429]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#652429] focus:ring-2 focus:ring-[#652429]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#652429] focus:ring-2 focus:ring-[#652429]"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 focus:border-[#652429] focus:ring-2 focus:ring-[#652429]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm password"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 focus:border-[#652429] focus:ring-2 focus:ring-[#652429]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#652429] px-4 py-2 text-white transition-all hover:bg-[#7a2c32] focus:ring-2 focus:ring-[#652429] focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;