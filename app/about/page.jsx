'use client'
import React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const page = () => {
  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  const addUser = async () => {
    // dummy test use
    const testuser = {
      name: "Test User",
      email: "test2@gmail.com",
      passwordHash: await hashPassword("rest")
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

  const validateUser = async () => {
    const testvalidator = {
      email: "test1@gmail.com",
      password: "test"
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
    </main>
  )
}
export default page
