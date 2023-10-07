"use client"
import React, { useState } from 'react';
import FoundingStory from "../assets/Images/login.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";

const page = () => {

  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-md md:max-w-xl mx-4 md:mx-0 md:mr-5">
        <h2 className="text-4xl font-bold text-center mb-6">Welcome Back</h2>
        <h5 className="text-lg font-semibold text-center mb-6">Build skills for today, tomorrow, and beyond. Education to future-proof your career.</h5>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="w-full  relative">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 top-6"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="text-gray-600"
                />
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="text-blue-500 hover:underline mb-4">Forgot Password?</button>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className="w-full flex flex-center justify-center ml-10 md:w-1/2 mt-4 md:mt-0"> 
        <Image
          src={FoundingStory}
          alt="login Image"
          // width={800}
          // height={600}
          className="w-80 h-80 rounded-md overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg shadow-gray-500"
        />
      </div>
    </div>
  )
}

export default page