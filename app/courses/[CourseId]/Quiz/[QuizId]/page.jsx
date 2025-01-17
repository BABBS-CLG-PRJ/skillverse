'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaQuestionCircle, FaRegCheckCircle, FaTimesCircle, FaClipboardList } from 'react-icons/fa';


const Quiz = ({ params }) => {
  const { QuizId } = params;

  // State to store quiz questions and loading status
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({}); // To store selected answers

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.post('/api/quizdetails', {
          quizId: QuizId, // Send QuizId in the body
        });
        console.log(response.data)

        setQuestions(response.data.quizDetails.questions || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz details:', err);
        setError('Failed to load quiz details. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [QuizId]);

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    // try {
    // //   const response = await axios.post('/api/quizdetails/submit', {
    // //     quizId: QuizId,
    // //     answers,
    // //   });

    // //   const data = response.data;

    //   if (response.status === 200) {
    //     alert(`Quiz submitted successfully! Your score: ${data.score}`);
    //   } else {
    //     alert(data.message || 'Failed to submit the quiz.');
    //   }
    // } catch (err) {
    //   console.error('Error submitting quiz:', err);
    //   alert('An error occurred while submitting the quiz.');
    // }

    let score = 0;

  questions.forEach((question) => {
    const correctAnswer = question.correctAnswer; // Assuming `correctOption` is provided by the API
    const userAnswer = answers[question._id];

    if (userAnswer === correctAnswer) {
      score++;
    }
  });

  // Display results
  alert(`You scored ${score} out of ${questions.length}`);
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6 flex items-center gap-2">
          <FaClipboardList className="text-yellow-500"/>
          Quiz Challenge
        </h1>
  
        {questions.map((question, index) => (
          <div key={question._id} className="mb-8">
            {/* Question Number */}
            <div className="flex items-center mb-2 gap-2">
              <FaQuestionCircle className="text-yellow-500" />
              <p className="text-lg font-semibold text-gray-800">
                Question {index + 1}:
              </p>
            </div>
            {/* Question Text */}
            <p className="text-gray-700 text-base mb-4">{question.questionText}</p>
  
            {/* Options */}
            <ul className="space-y-3">
              {question.options.map((option) => (
                <li
                  key={option._id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-md shadow-sm border hover:shadow-md transition-shadow"
                >
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    id={`option-${option}`}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={() => handleAnswerChange(question._id, option)}
                    className="w-5 h-5 text-yellow-500 focus:ring-yellow-400 focus:ring-2"
                  />
                  <label
                    htmlFor={`option-${option}`}
                    className="text-gray-800 text-sm"
                  >
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
  
        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 hover:scale-105 transition-all shadow-md"
          >
            <FaRegCheckCircle />
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Quiz;
