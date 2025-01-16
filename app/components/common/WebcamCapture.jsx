'use client'
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={240}
        height={144}
        className='rounded-lg'
      />
      <button onClick={captureImage}>Capture Image</button>
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <p>{image}</p>
          <img src={image} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
