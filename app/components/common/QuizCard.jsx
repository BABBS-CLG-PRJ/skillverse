import React, { useEffect, useState } from 'react';
import { Brain, HelpCircle, Target, RefreshCw, PlayCircle, CheckCircle, Award, ThumbsDown, X } from 'lucide-react';
import Link from 'next/link';

const QuizCard = ({ quiz }) => {
  const [userId, setUserId] = useState(null);
  const [userAttempts, setUserAttempts] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      const studentAttempts = quiz.studentAttempts.filter(
        (attempt) => attempt.student === userId
      );
      setUserAttempts(studentAttempts.length);
      const maxScoreAchieved = Math.max(...studentAttempts.map((attempt) => attempt.score), 0);
      setMaxScore(maxScoreAchieved);
      setPassed(maxScoreAchieved >= quiz.passingScore);
    }
  }, [userId, quiz]);

  const isMaxAttemptsReached = userAttempts >= quiz.attemptsAllowed;

  return (
    <div className="w-72 h-90 rounded-lg border border-gray-200 p-4 relative transition-all hover:shadow-lg hover:scale-[1.02] bg-white overflow-hidden">
      {/* Pass/Fail Overlay */}
      {userAttempts > 0 && (
        <>
          {/* Background Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute -inset-full rotate-45 flex items-center justify-center transform translate-y-1/2 ${
              passed ? 'bg-green-500/10' : 'bg-red-500/10'
            }`}>
            </div>
          </div>
          
          {/* Status Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full">
              <div className={`absolute inset-0 flex items-center justify-center -rotate-45 ${
                passed ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="font-bold text-8xl opacity-20 transform -translate-y-4">
                  {passed ? 'PASS' : 'FAIL'}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Pass/Fail Badge */}
      {userAttempts > 0 && (
        <div className="absolute -top-3 -right-3 z-10">
          {passed ? (
            <div className="bg-green-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
          ) : (
            <div className="bg-red-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center">
              <ThumbsDown className="w-8 h-8" />
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="mb-2 relative">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-yellow-500" />
          <h2 className="text-lg font-semibold truncate">
            {quiz.title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 relative">
        <p className="text-sm text-gray-600 font-semibold overflow-hidden line-clamp-2">
          {quiz.description}
        </p>

        <div className="pt-2 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span className="text-sm">
              <span className="font-medium">Questions:</span> {quiz.questions.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-red-500" />
            <span className="text-sm">
              <span className="font-medium">Passing Score:</span> {quiz.passingScore}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-green-500" />
            <span className="text-sm">
              <span className="font-medium">Attempts Allowed:</span> {quiz.attemptsAllowed}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            <span className="text-sm">
              <span className="font-medium">Already Attempted:</span> {userAttempts}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-500" />
            <span className="text-sm">
              <span className="font-medium">Max Score Achieved:</span> {maxScore}
            </span>
          </div>
        </div>
      </div>

      {/* Start Quiz Button */}
      <div className="absolute bottom-4 left-4 right-4">
        {isMaxAttemptsReached ? (
          <div className="space-y-1">
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 border-dashed border-red-200 bg-red-50 text-red-500 cursor-not-allowed transition-all group"
            >
              <X className="w-4 h-4" />
              <span className="font-medium">No Attempts Remaining</span>
            </button>
            <p className="text-xs text-center text-gray-500">
              Maximum {quiz.attemptsAllowed} attempts reached
            </p>
          </div>
        ) : (
          <Link
            href={`/courses/${quiz.course}/quiz?quiz=${quiz._id}&title=${quiz.title}`}
            prefetch={true}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            <span className="font-medium">Start Quiz</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuizCard;