import React from 'react';
import { FaCheckCircle, FaWifi, FaPauseCircle, FaExternalLinkAlt, FaLock, FaCamera } from 'react-icons/fa'; // Importing relevant icons

const QuizGuidelines = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Quiz Guidelines</h2>
      <ul className="list-inside space-y-4 text-gray-700">
        <li className="flex items-start gap-2">
          <FaWifi className="text-blue-500 mt-1" />
          <span>Ensure a stable internet connection before starting the quiz to avoid interruptions.</span>
        </li>
        <li className="flex items-start gap-2">
          <FaPauseCircle className="text-yellow-500 mt-1" />
          <span>Once started, you cannot pause or restart the quiz. Plan your time accordingly.</span>
        </li>
        <li className="flex items-start gap-2">
          <FaExternalLinkAlt className="text-red-500 mt-1" />
          <span>Do not navigate away from the quiz page during the session to prevent disqualification.</span>
        </li>
        <li className="flex items-start gap-2">
          <FaLock className="text-gray-600 mt-1" />
          <span>Follow the honor code: Do not use external help or resources while taking the quiz.</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCamera className="text-green-500 mt-1" />
          <span>Ensure your webcam is enabled for identity verification purposes during the quiz.</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheckCircle className="text-green-500 mt-1" />
          <span>Make sure your device’s microphone is off unless otherwise instructed.</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheckCircle className="text-green-500 mt-1" />
          <span>Ensure your browser is up to date for optimal performance during the quiz.</span>
        </li>
      </ul>
    </div>
  );
};

export default QuizGuidelines;
