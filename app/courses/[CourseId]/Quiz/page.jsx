"use client";
import React, { useEffect, useState } from "react";
import WebcamCapture from "../../../components/common/WebcamCapture";
import { useSearchParams, useParams } from "next/navigation";
import Quizguidelines from "../../../components/common/Quizguidelines";
import { FaCamera, FaExclamationTriangle, FaPlay } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const QuizVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasReadGuidelines, setHasReadGuidelines] = useState(false);

  const quizId = searchParams.get("quiz");
  const quizTitle = searchParams.get("title");

  const handleCapture = (image) => {
    setCapturedImage(image);
  };

  const handleStartQuiz = async () => {
    try {
      setIsLoading(true);
  
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("Session expired. Please log in again.");
        router.push("/login");
        return;
      }
  
      // Check if face data exists for the user
      const faceDataResponse = await axios.post("/api/facedata/exists", { uid: userId });
      console.log("Face data response:", faceDataResponse.data);
      if (!faceDataResponse.data.exists) {
        toast.error("Face data does not exist. Please log in again.");
        router.push("/login");
        return;
      }
      else{
        if (!capturedImage) {
          toast.error("Please capture a clear photo of your face before proceeding.");
          return;
        }
    
        // Verify identity using the captured image
        const response = await axios.post("/api/facedata/match", {

          webcamImage: capturedImage,
          uid: userId,
        });
        console.log("Face data response:", response.data);
    
        if (response.data.success) {
          toast.success("Identity verified successfully!");
          router.push(`/courses/${params.CourseId}/quiz/${quizId}`);
        } else {
          // Identity verification failed
          toast.error("Identity verification failed. Please try again.");
        }
      }
      
    } catch (error) {
      // Display a specific error message if provided by the server
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        console.error("Verification error:", error);
        toast.error("An unexpected error occurred during verification.");
      }
    } finally {
      setIsLoading(false);
    }
  };  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-8xl mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{quizTitle}</h1>
          <p className="text-gray-600 mt-1">Identity Verification Required</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Guidelines */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-500" />
              Verification Guidelines
            </h2>
            <Quizguidelines quizId={quizId} />
          </div>

          {/* Right Column - Verification */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaCamera className="text-blue-500" />
              Take Photo
            </h2>

            <div className="flex flex-col items-center">
              <WebcamCapture onCapture={handleCapture} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white shadow-t-md p-6 border-t">
        <div className="flex flex-col items-center justify-between max-w-4xl mx-auto gap-4">
          {/* Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasReadGuidelines}
              onChange={(e) => setHasReadGuidelines(e.target.checked)}
              className="rounded text-yellow-500 focus:ring-yellow-500"
            />
            <span className="text-sm text-gray-700">
              I have read and understand the guidelines
            </span>
          </label>

          {/* Start Quiz Button */}
          <button
            onClick={handleStartQuiz}
            disabled={!hasReadGuidelines || !capturedImage || isLoading}
            className={`w-full max-w-xs px-6 py-3 rounded-lg font-medium bg-gray text-black transition-all
        ${
          hasReadGuidelines && capturedImage && !isLoading
            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
            : "bg-gray-300 cursor-not-allowed"
        }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verifying...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FaPlay /> Start Quiz
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizVerification;
