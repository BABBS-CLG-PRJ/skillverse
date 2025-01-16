import React from 'react';
import { Brain, HelpCircle, Target, RefreshCw, PlayCircle } from 'lucide-react';

const QuizCard = ({ quiz }) => {
  return (
    <div className="w-80 h-75 rounded-lg border border-gray-200 p-4 relative transition-all hover:shadow-lg hover:scale-[1.02] bg-white">
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-yellow-500" />
          <h2 className="text-lg font-semibold truncate">
            {quiz.title}
          </h2>
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-6">
        {/* Description with clamp */}
        <p className="text-sm text-gray-600 overflow-hidden line-clamp-2">
          {quiz.description}
        </p>
        
        <div className="space-y-4 pt-2">
          {/* Quiz stats with icons */}
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span className="text-sm">
              <span className="font-medium">Questions:</span> {quiz.questions.length}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-green-500" />
            <span className="text-sm">
              <span className="font-medium">Attempts Allowed:</span> {quiz.attemptsAllowed}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-red-500" />
            <span className="text-sm">
              <span className="font-medium">Passing Score:</span> {quiz.passingScore}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Start Quiz Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button 
          className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors"
          onClick={() => {}}
        >
          <PlayCircle className="w-4 h-4" />
          <span className="font-medium">Start Quiz</span>
        </button>
      </div>
    </div>
  );
};

export default QuizCard;