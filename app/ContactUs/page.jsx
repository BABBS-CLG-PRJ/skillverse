"use client"
import React from 'react'
import toast from 'react-hot-toast';
const page = () => {
   
  return (
    <div>
      <button onClick={()=>{toast.success("Contact Us page:Welcome");}} className="bg-blue-900 text-slate-50">Ula la </button>
    </div>
  )  
}

export default page