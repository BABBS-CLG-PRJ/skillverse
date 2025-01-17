'use client';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam'; // Importing Webcam from the 'react-webcam' package
import { FaCamera, FaRedo } from 'react-icons/fa';
import Lottie from "lottie-react";
import Hero from "app/assets/Images/Verification_Animation.json";

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  // Capture image from the webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    if (onCapture) {
      onCapture(imageSrc); // Pass the captured image back to the parent
    }
  };

  // Reset the image state to allow retake
  const retakeImage = () => {
    setImage(null);
    if (onCapture) {
      onCapture(null); // Pass null to the parent to reset the captured image
    }
  };
  
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="relative w-full z-0">
            <Lottie animationData={Hero} />
      </div>
      <h2 className="text-lg font-semibold mb-4 text-center flex items-center gap-2">
        <FaCamera className="text-blue-500" />
        Webcam Verification
      </h2>
      
      
      <div className="flex flex-col items-center">
        {/* Webcam or Captured Image */}
        {image ? (
          <div className="flex flex-col items-center">
            <img
              src={image}
              alt="Captured"
              className="w-256 h-128 object-cover rounded-lg shadow-md mb-4"
            />
            {/* Retake Image Button */}
            <button
              onClick={retakeImage}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaRedo />
              Retake Image
            </button>
          </div>
        ) : (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={540}
              height={240}
              className="rounded-lg border border-gray-300 shadow-md"
            />
            {/* Capture Image Button */}
            <button
              onClick={captureImage}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              Capture Image
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
