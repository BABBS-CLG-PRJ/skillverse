//Author:Supratik De//
import React from 'react'
import Link from 'next/link';


const Button = ({children,active,linkto}) => {
  return (
    <Link  href={linkto}>  
    <div className={`text-center text-[13px] px-6 py-3 rounded-md font-semibold ${active ? "bg-primary-yellow text-black text-lg" : "bg-[#0186DF] border-[#652429] text-white font-bold text-xl border-2 hover:text-black hover:bg-[#20A5FE]"} hover:scale-95 hover:bg-yellow-300 transition-all duration-200`}>
        {children}
        </div>
        </Link>
  )
}

export default Button