import React, { useState, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
const CameraCaptureButton = ({ onCapture }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [imgdata, setImagedata] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const[image,setimage]=useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    const res = await axios.post("/api/facedata/exists", {
      uid: localStorage.getItem("userId"),
    });
  
    console.log(res);
    setLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      setError("Camera access denied. Please enable camera permissions.");
      console.error("Camera error:", err);
    } finally {
      setLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0);

    const imageData = canvas.toDataURL("image/png");
    console.log(imageData);
    setimage(imageData);
    const base64Data = imageData.replace(/^data:image\/png;base64,/, ""); //base64 raw without prefix data we need
    setImagedata(base64Data);
    // console.log("Captured image data:", base64Data.substring(0, 100) + "...");
    
    onCapture?.(base64Data);
    stopCamera();
  };
  const handleupload = async () => {
    
    console.log(localStorage.getItem("userId"));
    try{
      const res=await axios.post('/api/facedata/add',{webcamImage:imgdata,uid:localStorage.getItem('userId')});
      console.log(res);
      if(res.data.success==true){
        alert("Face Data uploaded successfully");
      }
    }catch(error){
      console.log(error);
    }
    setImagedata("");
  };
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Camera Preview Box */}
      <div
        className={`w-full max-w-md mx-auto transition-all duration-500 ease-out transform
                      ${
                        cameraActive || imgdata !== ""
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 hidden"
                      }`}
      >
        <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-900">
          {imgdata !== "" ? (
            <img
              src={image}
              className="w-full h-[400px] object-cover rounded-lg border-4 border-orange-300"
              alt="image data"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-[400px] object-cover rounded-lg border-4 border-orange-300"
            />
          )}
        </div>
      </div>

      {/* Main Button - Changes to "Take Picture" when camera is active */}
      <button
        onClick={
          cameraActive
            ? captureImage
            : imgdata !== ""
            ? handleupload
            : startCamera
        }
        disabled={loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative overflow-hidden rounded-full 
                   bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 
                   text-white px-8 py-4 
                   transform hover:scale-105 transition-all duration-300
                   shadow-lg hover:shadow-xl
                   border-2 border-yellow-300
                   ${loading ? "opacity-80" : ""}`}
      >
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300
                      bg-[length:200%_100%] animate-gradient"
        />

        {/* Hover effect ripple */}
        <div
          className={`absolute inset-0 bg-white opacity-0 
                        group-hover:opacity-20 transition-opacity duration-500
                        rounded-full transform scale-90 group-hover:scale-105`}
        />

        <div className="relative flex items-center gap-3">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          ) : (
            <Camera
              className={`w-6 h-6 text-white transition-all duration-300 transform
                         ${isHovered ? "rotate-12" : "rotate-0"}
                         ${cameraActive ? "" : "animate-bounce-gentle"}`}
            />
          )}
          <span className="font-medium text-lg">
            {loading
              ? "Opening Camera..."
              : cameraActive
              ? "Take Picture"
              : imgdata !== ""
              ? "Upload Captured Image"
              : "Open Camera to take picture and save facedata"}
          </span>
        </div>
      </button>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(6deg);
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CameraCaptureButton;
