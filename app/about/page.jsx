'use client'
import React from 'react';
import axios from 'axios';


const page = () => {

  const addUser = async () => {
    // dummy test use
    const testuser = {
      name: "Test User 8",
      email: "email@email.com",
      password: "email"
    }
    try {
      axios.post('/api/adduser', testuser).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const getUser = () => {
    const testuser = {
      email: "test1@gmail.com"
    }
    axios.post('/api/resetpassword', testuser).then((response)=> {
      console.log(response.data);
    });
  }

  const getOTP = () => {
    const testuser = {
      email: "test8@gmail.com"
    }
    axios.post('/api/getotp', testuser).then((res) => {
      console.log(res.data);
    })
  }

  const validateOTP = () => {
    const testotp = {
      otp: "441568",
      email: "test8@gmail.com"
    }
    axios.post('/api/verifyotp', testotp).then((res) => {
      console.log(res.data);
    })
  }

  const validateUser = async () => {
    const testvalidator = {
      email: "test5@gmail.com",
      password: "five"
    }
    try {
      axios.post('/api/validateuser', testvalidator).then((response) => {
        console.log(response.data);
        // authtoken ---> false means unverified user
        localStorage.setItem('authtoken', response.data.result.authtoken) // save the authtoken to local storage
        // const decoded = jwt.verify(localStorage.getItem('authtoken'), privateKey); // to verify a token
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main>
      <div className='text-center text-5xl'>
        About Page
      </div>
      <button type="button" className='hover:bg-slate-500 bg-slate-300 px-5 py-2 rounded-md ml-10' onClick={addUser}>Add User</button>
      <button type="button" className='hover:bg-slate-500 bg-slate-300 px-5 py-2 rounded-md ml-10' onClick={validateUser}>Check User</button>
      <button type="button" className='hover:bg-slate-500 bg-slate-300 px-5 py-2 rounded-md ml-10' onClick={getUser}>Get User</button>
      <button type="button" className='hover:bg-slate-500 bg-slate-300 px-5 py-2 rounded-md ml-10' onClick={getOTP}>OTP Generator</button>
      <button type="button" className='hover:bg-slate-500 bg-slate-300 px-5 py-2 rounded-md ml-10' onClick={validateOTP}>Validate OTP</button>
    </main>
  )
}
export default page
