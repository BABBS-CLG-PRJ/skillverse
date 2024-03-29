import React from 'react'
import {FiEdit} from "react-icons/fi"



const Btn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <button className='flex items-center hover:border-richblack-900 hover:border-[1px] bg-yellow-300 hover:bg-yellow-200 transition-all duration-200 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-richblack-900 undefined' 
    disabled={disabled}
    onClick={onclick}
    type={type}>
        {
            children ? (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ) : (text)
        }
        <FiEdit/>
    </button>
  )
}

export default Btn
