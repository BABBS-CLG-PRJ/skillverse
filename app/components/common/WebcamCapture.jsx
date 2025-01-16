'use client';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam'; // Importing Webcam from the 'react-webcam' package
import { FaImage } from 'react-icons/fa';

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
  };

  return (
    <div className="flex flex-col items-center">
      {/* Webcam */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={540}
        height={240}
        className="rounded-lg"
      />
      
      {/* Capture Image Button */}
      <button
        onClick={captureImage}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors"
      >
        Capture Image
      </button>

      {/* Display the captured image and provide the option to retake */}
      {image && (
        <div className="mt-4 flex justify-center items-center gap-4">
          <img src={image} alt="Captured" className="w-32 h-32 object-cover rounded-lg shadow-md" />
          
          {/* Retake Image Button */}
          <button
            onClick={retakeImage}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-semibold flex items-center gap-2 hover:bg-red-600 transition-colors"
          >
            <FaImage />
            Retake Image
          </button>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
