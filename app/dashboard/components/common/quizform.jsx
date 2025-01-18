import React, { useState } from 'react';
import { ChevronDown, Plus, Save,} from 'lucide-react';

const QuizForm = ({user}) => {
  const [quizData, setQuizData] = useState({
    courseId: "658cffe7dd3268d060b0f724",
    quizData: {
      title: "",
      description: "",
      questions: [
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          explanation: ""
        }
      ],
      passingScore: 3,
      attemptsAllowed: 1
    }
  });

  // Track expanded state for each question independently
  const [expandedQuestions, setExpandedQuestions] = useState(new Set([0]));

  const toggleQuestion = (index) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuizData = { ...quizData };
    newQuizData.quizData.questions[index][field] = value;
    setQuizData(newQuizData);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuizData = { ...quizData };
    newQuizData.quizData.questions[questionIndex].options[optionIndex] = value;
    setQuizData(newQuizData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('quiz', quizData);
  };

  const addQuestion = () => {
    const newQuizData = { ...quizData };
    const newIndex = newQuizData.quizData.questions.length;
    newQuizData.quizData.questions.push({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: ""
    });
    setQuizData(newQuizData);
    // Automatically expand the new question
    setExpandedQuestions(prev => new Set([...prev, newIndex]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title and Description sections remain the same */}
          <div className="space-y-4">
           
            
            <div className="transition-all duration-300 transform hover:scale-[1.01]">
              <label className="block text-sm font-medium text-gray-700">Quiz Title</label>
              <input
                type="text"
                className="mt-1 w-full p-3 border border-amber-200 rounded-md 
                         shadow-sm transition-all duration-300
                         focus:ring-2 focus:ring-amber-300 focus:border-amber-300
                         hover:border-amber-300"
                value={quizData.quizData.title}
                onChange={(e) => setQuizData({
                  ...quizData,
                  quizData: { ...quizData.quizData, title: e.target.value }
                })}
                placeholder="Enter quiz title..."
              />
            </div>

            <div className="transition-all duration-300 transform hover:scale-[1.01]">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 w-full p-3 border border-amber-200 rounded-md
                         shadow-sm transition-all duration-300
                         focus:ring-2 focus:ring-amber-300 focus:border-amber-300
                         hover:border-amber-300"
                value={quizData.quizData.description}
                onChange={(e) => setQuizData({
                  ...quizData,
                  quizData: { ...quizData.quizData, description: e.target.value }
                })}
                placeholder="Enter quiz description..."
                rows={3}
              />
            </div>

            {/* Questions Section with Independent Accordions */}
            <div className="space-y-4">
              {quizData.quizData.questions.map((question, questionIndex) => (
                <div 
                  key={questionIndex} 
                  className="border border-amber-100 rounded-lg bg-white shadow-sm
                           transition-all duration-300 hover:shadow-md"
                >
                  <div
                    onClick={() => toggleQuestion(questionIndex)}
                    className="p-4 cursor-pointer flex justify-between items-center
                             bg-gradient-to-r from-amber-50 to-orange-50
                             hover:from-amber-100 hover:to-orange-100
                             transition-all duration-300"
                  >
                    <h3 className="font-medium text-gray-800">
                      Question {questionIndex + 1}
                      {question.questionText && ` - ${question.questionText.slice(0, 30)}${question.questionText.length > 30 ? '...' : ''}`}
                    </h3>
                    <ChevronDown 
                      className={`transform transition-transform duration-300 
                               ${expandedQuestions.has(questionIndex) ? 'rotate-180' : ''}`}
                    />
                  </div>

                  <div 
                    className={`transition-all duration-300 origin-top
                             ${expandedQuestions.has(questionIndex) 
                               ? 'opacity-100 max-h-[1000px]' 
                               : 'opacity-0 max-h-0 overflow-hidden'}`}
                  >
                    <div className="p-4 space-y-4">
                      {/* Question Content */}
                      <div className="transition-all duration-300 transform hover:scale-[1.01]">
                        <label className="block text-sm text-gray-700">Question Text</label>
                        <input
                          type="text"
                          className="mt-1 w-full p-3 border border-amber-200 rounded-md
                                   transition-all duration-300
                                   focus:ring-2 focus:ring-amber-300 focus:border-amber-300
                                   hover:border-amber-300"
                          value={question.questionText}
                          onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
                          placeholder="Enter your question..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm text-gray-700">Options</label>
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            className="transition-all duration-300 transform hover:scale-[1.01]"
                          >
                            <input
                              type="text"
                              className="w-full p-3 border border-amber-200 rounded-md
                                       transition-all duration-300
                                       focus:ring-2 focus:ring-amber-300 focus:border-amber-300
                                       hover:border-amber-300"
                              value={option}
                              onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="transition-all duration-300 transform hover:scale-[1.01]">
                        <label className="block text-sm text-gray-700">Correct Answer</label>
                        <select
                          className="mt-1 w-full p-3 border border-amber-200 rounded-md
                                   transition-all duration-300
                                   focus:ring-2 focus:ring-amber-300 focus:border-amber-300
                                   hover:border-amber-300"
                          value={question.correctAnswer}
                          onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)}
                        >
                          <option value="">Select correct answer</option>
                          {question.options.map((option, index) => (
                            <option key={index} value={option}>
                              {option || `Option ${index + 1}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="transition-all duration-300 transform hover:scale-[1.01]">
                        <label className="block text-sm text-gray-700">Explanation</label>
                        <textarea
                          className="mt-1 w-full p-3 border border-amber-200 rounded-md
                                   transition-all duration-300
                                   focus:ring-2 focus:ring-amber-300 focus:border-amber-300
                                   hover:border-amber-300"
                          value={question.explanation}
                          onChange={(e) => handleQuestionChange(questionIndex, 'explanation', e.target.value)}
                          placeholder="Explain the correct answer..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addQuestion}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r 
                       from-amber-100 to-orange-100 text-gray-700 rounded-md
                       hover:from-amber-200 hover:to-orange-200
                       transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="transition-transform duration-300 group-hover:rotate-180" />
              Add Question
            </button>
          </div>

          <button
            type="submit"
            className="group w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500
                     text-white rounded-md hover:from-amber-600 hover:to-orange-600
                     transition-all duration-300 transform hover:scale-[1.02]
                     flex items-center justify-center gap-2"
          >
            <Save className="transition-transform duration-300 group-hover:rotate-12" />
            Submit Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;