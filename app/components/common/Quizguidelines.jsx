import React, { useState, useEffect } from 'react';
import { FaClock, FaCheckCircle, FaExclamationCircle, FaClipboardList, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';

const AssessmentGuidelines = ({ quizId }) => {
  const [totalQuestions, setTotalQuestions] = useState(null); // State to store total number of questions
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch total questions from the backend
  useEffect(() => {
    const fetchTotalQuestions = async () => {
      try {
        const response = await axios.post("/api/quizdetails", {quizId}); // This is the quiz response
        if (response.data.quizDetails && response.data.quizDetails.questions) {
          setTotalQuestions(response.data.quizDetails.questions.length); // Get the length of the questions array
        } else {
          throw new Error('No questions found in the response');
        }

      } catch (error) {
        console.error('Error fetching total questions:', error.message);
        setTotalQuestions('Error fetching questions');  // Display a fallback error message in UI
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalQuestions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          Assessment Guidelines
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Kindly read through the following key instructions and important guidelines for this assessment.
        </p>
      </div>
      <div className="space-y-6">
        {/* Timelines & Questions Section */}
        <section>
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <FaClock className="text-yellow-500" />
            Timelines & Questions
          </h3>
          <ul className="space-y-2 text-gray-600 list-disc list-inside">
            <li>
              Total Questions to be answered: {isLoading ? 'Loading...' : totalQuestions} {/* Show loading or the number of questions */}
            </li>
            <li>Passing Marks: 75%</li>
            <li>You can attempt the assessment anytime between the provided assessment window.</li>
            <li>Please ensure that you attempt the assessment in one sitting as once you start the assessment, the timer won't stop.</li>
          </ul>
        </section>

        {/* Marking Section */}
        <section>
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            Marking
          </h3>
          <p className="text-gray-600">
            Each participant's ranking will be determined based on the accuracy of their answers. If two participants achieve the same score, the one who completes the assessment in the least amount of time will be ranked higher.
          </p>
        </section>

        {/* Key Instructions Section */}
        <section>
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <FaExclamationCircle className="text-red-500" />
            Key Instructions
          </h3>
          <ul className="space-y-2 text-gray-600 list-disc list-inside">
            <li>You can access the assessment from the opportunity page itself where you registered.</li>
            <li>You'll see a button in the respective round if you've registered to initiate the assessment.</li>
            <li>Only the person who registered will be able to take the assessment. In case of team registration, the team leader who registered the team will be able to take the assessment.</li>
            <li>You'll be able to browse through the questions.</li>
            <li>You'll have to submit answers/code/solutions to all the questions individually.</li>
            <li>While you are taking the assessment, your answers/code/solutions and time of their submission are also tracked by the system question-wise.</li>
            <li>You'll be able to modify your answers during the assessment.</li>
            <li>Any participant resorting to unfair practices will be directly disqualified from the challenge.</li>
            <li>All decisions in the matter of eligibility, authenticity & final judgment will be with Unstop and the opportunity organizer.</li>
          </ul>
        </section>

        <p className="text-gray-700 font-medium mt-4">All the best!</p>

        <div className="text-center text-sm text-gray-500 pt-4">
          <p>Powered By Skillverse</p>
          <p className="text-xs mt-1">
            Best Viewed in Chrome, Opera, Mozilla, EDGE & Safari. Copyright © FLIVE Consulting Pvt Ltd - All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentGuidelines;
