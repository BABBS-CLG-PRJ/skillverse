"use client"
import React, { useState } from 'react';
import FoundingStory from "../assets/Images/login.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import { apiConnector } from '../services/apiConnector';
import { loginEndpoint } from '../services/apis';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter();

  const [user, setUser] = useState(
   { email: "",
    password: ""
  })


  const onLogin = async (e) => {
    e.preventDefault();
    try {
      toast.promise(
        apiConnector('POST', loginEndpoint.LOGIN_API, user).then(response => {
          if (response.data.result.success) {
            localStorage.setItem('authtoken', response.data.result.authtoken); // save the authtoken to local storage
            setTimeout(() => {router.push('/')},2000); // after 2 seconds login to homepage
          }
          else {
            localStorage.setItem('authtoken', response.data.result.authtoken); // false authtoken
          }
          return response;
        }),
        {
          loading: 'Logging In...',
          success: (response) => {
            if (response.data.result.success) {
              return response.data.result.message; // Use the response from the promise
            } else {
              throw new Error(response.data.result.message);
            }
          }, // Use the response from the promise
          error: (error) => error.message || "An error occurred",
        },
        {
          style: {
            minWidth: '250px',
            background: 'black',
            color: 'white'
          },
          position: 'bottom-right',
        }
      );
    } catch (error) {
      console.log("login failed.",error.message)
    }
    
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 md:flex-row items-center justify-center">
      <div className="p-10 w-full max-w-md md:max-w-xl mx-4 md:mx-0 md:mr-5">
        <div className="flex flex-col px-14">
        <h2 className="text-4xl font-bold text-center mb-6">Welcome Back</h2>
        <h5 className="text-lg font-semibold text-center mb-6">Build skills for today, tomorrow, and beyond. <span className="text-pink-500"> Education to future-proof your career.</span></h5>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Email Address"
              value={user.email}
              onChange={(e)=>setUser({...user, email: e.target.value})}
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
                value={user.password}
                onChange={(e)=>setUser({...user, password: e.target.value})}
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
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 hover:scale-105"
              onClick={(e) => onLogin(e)}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
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