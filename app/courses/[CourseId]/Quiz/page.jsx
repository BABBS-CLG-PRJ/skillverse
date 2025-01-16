'use client';
import React, { useEffect, useState } from 'react';
import WebcamCapture from '../../../components/common/WebcamCapture';
import { useSearchParams, useParams } from 'next/navigation';
import Quizguidelines from '../../../components/common/Quizguidelines';
import { FaCheckCircle, FaCamera, FaBook } from 'react-icons/fa';
import axios from 'axios';


const QuizVerification = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const [quizTitle, setQuizTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);

  const quizId = searchParams.get('quiz');

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`/api/courses/${params.CourseId}/quiz/${quizId}`);
        const data = await response.json();
        setQuizTitle(data.title || 'Unknown Quiz');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setQuizTitle('Unknown Quiz');
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuizData();
    } else {
      setQuizTitle('Invalid Quiz');
      setLoading(false);
    }
  }, [params.CourseId, quizId]);

  const handleCapture = (image) => {
    setCapturedImage(image);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  
const handleStartQuiz = async () => {
  try {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setVerificationError('User ID not found. Please log in again.');
      return;
    }

    // Ensure the image is captured
    if (!capturedImage) {
      setVerificationError('Please capture your image before starting the quiz.');
      return;
    }

    // Call the face matching API using Axios
    const response = await axios.post('/api/facedata/match', {
      webcamImage: capturedImage,
      uid : userId,
    });

    const data = response.data;

    if (data.success == true) {
      // Face matched, proceed to start the quiz
      console.log(`Quiz ${quizId} started for user ${userId}`);
    } else {
      // Face mismatch or error
      setVerificationError('Face verification failed. Please try again.');
    }
  } catch (error) {
    console.error('Error verifying face:', error);
    setVerificationError('An error occurred during face verification. Please try again.');
  }
};


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto p-8 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaCheckCircle className="text-green-500" />
            Quiz Verification
          </h1>
          <p className="text-gray-600 mt-2">
            Verifying your identity for quiz: <span className="font-semibold">{quizTitle}</span>
          </p>
        </div>

        {/* Flex container for Quiz Guidelines and Webcam Capture */}
        <div className="flex mb-6">
          {/* Quiz Guidelines Section (Left Side) */}
          <div className="w-full md:w-1/2 pr-4">
            <Quizguidelines />
          </div>

          {/* Webcam Capture Section (Right Side) */}
          <div className="w-full md:w-1/2 pl-4 flex flex-col items-center">
            <div className="text-gray-800 font-medium mb-2 flex items-center gap-2">
              <FaCamera className="text-blue-500" />
              Capture Your Identity
            </div>
            <WebcamCapture onCapture={handleCapture} />
            {/* Display Captured Image */}
            {/* {capturedImage && (
              <div className="mt-4 flex justify-center items-center gap-4">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            )} */}
          </div>
        </div>

        {/* Start Quiz Button */}
        <div className="flex justify-center">
          <button
            className="min-w-md flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors"
            onClick={handleStartQuiz}
          >
            <FaBook />
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizVerification;
