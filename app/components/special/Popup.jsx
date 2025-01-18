import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

const Popup = ({ message, showPopup }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (showPopup) {
      setAnimate(true);
      // Set fade-out to happen at 2.5s
      const timer = setTimeout(() => setAnimate(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`bg-green-100 p-6 rounded-lg shadow-lg text-center transition-opacity duration-500 ${
          animate ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <FaCheck className="text-green-500 text-3xl mb-2" />
        <p className="text-lg font-semibold text-green-900">{message}</p>
      </div>
    </div>
  );
};

export default Popup;