'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaQuestionCircle, FaRegCheckCircle, FaTimesCircle, FaClipboardList, FaSpinner, FaCheck, FaTimes, FaLightbulb } from 'react-icons/fa';

const Quiz = ({ params }) => {
  const { CourseId, QuizId } = params;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.post('/api/quizdetails', {
          quizId: QuizId,
        });
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
    if (!showResults) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: optionId,
      }));
    }
  };

  const handleSubmit = async () => {
    window.scrollTo(0, 0);  // Scroll to the top of the page
    setIsSubmitting(true);
    let calculatedScore = 0;

    questions.forEach((question) => {
      const correctAnswer = question.correctAnswer;
      const userAnswer = answers[question._id];

      if (userAnswer === correctAnswer) {
        calculatedScore++;
      }
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    const studentId = localStorage.getItem('userId');
    const data = {
      studentId,
      courseId: CourseId,
      quizId: QuizId,
      score: calculatedScore,
    }
    const response = axios.put('/api/addquiz', data);
    console.log(response);
    setScore(calculatedScore);
    setShowResults(true);
    setIsSubmitting(false);
  };

  const getOptionClassName = (question, option) => {
    if (!showResults) {
      return answers[question._id] === option
        ? 'bg-yellow-50 border-yellow-200'
        : 'bg-gray-50 border-gray-200';
    }

    if (option === question.correctAnswer) {
      return 'bg-green-50 border-green-200';
    }
    
    if (answers[question._id] === option && option !== question.correctAnswer) {
      return 'bg-red-50 border-red-200';
    }

    return 'bg-gray-50 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <FaSpinner className="animate-spin text-6xl text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-700">Evaluating Your Answers...</h2>
        <p className="text-gray-500">Please wait while we check your responses</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
            <FaClipboardList />
            Quiz Challenge
          </h1>
          {showResults && (
            <div className="bg-yellow-100 px-4 py-2 rounded-full">
              <p className="text-yellow-700 font-semibold">
                Score: {score}/{questions.length}
              </p>
            </div>
          )}
        </div>

        {questions.map((question, index) => (
          <div key={question._id} className="mb-8">
            <div className="flex items-center mb-2 gap-2">
              <FaQuestionCircle className="text-yellow-500" />
              <p className="text-lg font-semibold text-gray-800">
                Question {index + 1}
              </p>
            </div>
            <p className="text-gray-700 text-base mb-4">{question.questionText}</p>

            <ul className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <li
                  key={`${question._id}-${optionIndex}`}
                  className={`flex items-center gap-3 p-3 rounded-md shadow-sm border transition-all ${getOptionClassName(question, option)}`}
                >
                  <input
                    type="radio"
                    name={`question-${question._id}`}  // Unique name for each question's radio group
                    id={`${question._id}-${optionIndex}`}  // Unique ID for each radio button
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={() => handleAnswerChange(question._id, option)}
                    disabled={showResults}
                    className="w-5 h-5 text-yellow-500 focus:ring-yellow-400 focus:ring-2"
                  />
                  <label
                    htmlFor={`${question._id}-${optionIndex}`}  // Matching ID for label
                    className="text-gray-800 text-sm flex-grow"
                  >
                    {option}
                  </label>
                  {showResults && (
                    <>
                      {option === question.correctAnswer && (
                        <FaCheck className="text-green-500" />
                      )}
                      {answers[question._id] === option && option !== question.correctAnswer && (
                        <FaTimes className="text-red-500" />
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>

            {showResults && question.explanation && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-2 mb-2">
                  <FaLightbulb className="text-yellow-500" />
                  <h3 className="font-semibold text-yellow-700">Explanation:</h3>
                </div>
                <p className="text-yellow-600 text-sm">{question.explanation}</p>
              </div>
            )}
          </div>
        ))}

        {!showResults && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 hover:scale-105 transition-all shadow-md"
            >
              <FaRegCheckCircle />
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;