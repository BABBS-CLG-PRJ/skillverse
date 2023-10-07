"use client";
import React, { useState } from 'react';
import FoundingStory from "../assets/Images/FoundingStory.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";

const SignUp = () => {
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md md:max-w-xl mx-4 md:mx-0 md:mr-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Join the millions to code with Skillverse for free</h2>
        <h5 className="text-lg font-semibold text-center mb-6">Build skills for today, tomorrow, and beyond. Education to future-proof your career.</h5>
        <div className="mb-4 flex justify-between">
          <button
            className={`py-2 px-4 rounded-md ${
              role === 'student'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
            onClick={() => handleRoleChange('student')}
          >
            Student
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              role === 'instructor'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
            onClick={() => handleRoleChange('instructor')}
          >
            Instructor
          </button>
        </div>
        <form>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="First Name"
              />
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-2">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 pr-0 md:pr-2 relative">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Create Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Create Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 px-3 py-2 top-6"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="text-gray-600"
                />
              </button>
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-2 relative">
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Confirm Password"
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
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/2 mt-4 md:mt-0"> 
        <Image
          src={FoundingStory}
          alt="Signup Image"
          width={800}
          height={600}
          className="w-full h-full rounded-md"
        />
      </div>
    </div>
  );
};

export default SignUp;
