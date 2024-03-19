import React, { useState } from 'react';
import { cn } from "@/app/lib/utils"

const HamburgerButton = ({twClass}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  return (
    <button 
      className={cn(
        `hamburger-button ${isActive ? 'active' : ''} `,
        twClass
      )}
      onClick={toggleButton}
    >
      <div className="relative w-6 h-[2px] bg-richblack-25 rounded-full mb-2 transition-transform duration-200 ease-in-out transform-gpu" style={{transform: isActive ? 'rotate(-45deg) translateY(14px)' : undefined}}></div>
      <div className="relative w-6 h-[2px] bg-richblack-25 rounded-full mb-2 transition-opacity duration-200 ease-in-out" style={{opacity: isActive ? 0 : 1}}></div>
      <div className="relative w-6 h-[2px] bg-richblack-25 rounded-full transition-transform duration-200 ease-in-out transform-gpu" style={{transform: isActive ? 'rotate(45deg) translateY(-14px)' : undefined}}></div>
    </button>
  );
};

export default HamburgerButton;
