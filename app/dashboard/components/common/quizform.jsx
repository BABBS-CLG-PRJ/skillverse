import React, { useState } from "react";
import { ChevronDown, Plus, Save, Check, Trash2 } from "lucide-react";
import axios from "axios";
const QuizForm = ({ user }) => {
  const [quizData, setQuizData] = useState({
    courseId: "678c080cdaafb1608f523c2f",
    quizData: {
      title: "",
      description: "",
      questions: [
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          explanation: "",
        },
      ],
      passingScore: 1,
      attemptsAllowed: 1,
    },
  });

  // Track expanded state for each question independently
  const [expandedQuestions, setExpandedQuestions] = useState(new Set([0]));
  const [loading, setloading] = useState(false);
  const [finished, setFinished] = useState(false);
  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => {
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
  const deleteQuestion = (indexToDelete) => {
    const newQuizData = { ...quizData };
    newQuizData.quizData.questions = newQuizData.quizData.questions.filter(
      (_, index) => index !== indexToDelete
    );
    setQuizData(newQuizData);

    // Update expanded questions state
    setExpandedQuestions((prev) => {
      const newSet = new Set(
        [...prev]
          .map((i) => (i > indexToDelete ? i - 1 : i))
          .filter((i) => i < newQuizData.quizData.questions.length)
      );
      return newSet;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("quiz", quizData);
    setloading(true);
    // Reset the form UI
    setQuizData({
      courseId: "658cffe7dd3268d060b0f724",
      quizData: {
        title: "",
        description: "",
        questions: [
          {
            questionText: "",
            options: ["", "", "", ""],
            correctAnswer: "",
            explanation: "",
          },
        ],
        passingScore: 3,
        attemptsAllowed: 1,
      },
    });
    // Reset the expanded questions to only include the first question
    setExpandedQuestions(new Set([0]));
    try {
      const res = await axios.post("/api/addquiz", quizData);
      console.log(res);
      // Delay setting loading to false
      setTimeout(() => {
        setloading(false);
      }, 4000);
      setFinished(true);
      setTimeout(() => {
        setFinished(false);
      }, 9000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to post the quiz. Please try again.");
    }
  };

  const addQuestion = () => {
    const newQuizData = { ...quizData };
    const newIndex = newQuizData.quizData.questions.length;
    newQuizData.quizData.questions.push({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    });
    setQuizData(newQuizData);
    // Automatically expand the new question
    setExpandedQuestions((prev) => new Set([...prev, newIndex]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      {/* Finished Success Overlay */}
      {finished && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 animate-fade-in">
            <div className="relative">
              {/* Outer circle with gradient border */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 p-1 animate-scale-in">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  {/* Success checkmark with animation */}
                  <Check
                    className="w-16 h-16 text-emerald-500 animate-success-check"
                    strokeWidth={3}
                  />
                </div>
              </div>

              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-500/20 animate-ripple" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/10 to-emerald-500/10 animate-ripple-delayed" />
            </div>

            {/* Success message with animations */}
            <div className="text-center space-y-3 animate-success-text">
              <h3 className="text-2xl font-bold text-gray-800">
                Quiz Created Successfully!
              </h3>
              <p className="text-gray-600 font-semibold">
                Quiz delivered to students! 🎉 Returning to the form for more
                quizzes.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-200 rounded-full animate-spin border-t-amber-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Creating Your Quiz
              </h3>
              <p className="text-gray-600">
                Please wait while we save your questions...
              </p>
            </div>
          </div>
        </div>
      )}
      {/* actual quiz form */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 border-b border-amber-200 pb-2 transition-colors duration-300">
              Create Quiz
            </h1>

            <div className="transition-all duration-300 transform hover:scale-101">
              <label className="block text-sm font-medium text-gray-700">
                Quiz Title
              </label>
              <input
                type="text"
                className="mt-1 w-full p-3 border border-amber-200 rounded-md shadow-sm transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300"
                value={quizData.quizData.title}
                onChange={(e) =>
                  setQuizData({
                    ...quizData,
                    quizData: { ...quizData.quizData, title: e.target.value },
                  })
                }
                placeholder="Enter quiz title..."
                required
              />
            </div>

            <div className="transition-all duration-300 transform hover:scale-101">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 w-full p-3 border border-amber-200 rounded-md shadow-sm transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300"
                value={quizData.quizData.description}
                onChange={(e) =>
                  setQuizData({
                    ...quizData,
                    quizData: {
                      ...quizData.quizData,
                      description: e.target.value,
                    },
                  })
                }
                placeholder="Enter quiz description..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-4">
              {quizData.quizData.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="border border-amber-100 rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <div
                      onClick={() => toggleQuestion(questionIndex)}
                      className="flex-1 p-4 cursor-pointer flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-all duration-300"
                    >
                      <h3 className="font-medium text-gray-800">
                        Question {questionIndex + 1}
                        {question.questionText &&
                          ` - ${question.questionText.slice(0, 30)}${
                            question.questionText.length > 30 ? "..." : ""
                          }`}
                      </h3>
                      <ChevronDown
                        className={`transform transition-transform duration-300 ${
                          expandedQuestions.has(questionIndex)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteQuestion(questionIndex);
                      }}
                      disabled={quizData.quizData.questions.length === 1}
                      className={`p-4 text-gray-500 hover:text-red-500 transition-colors duration-300 ${
                        quizData.quizData.questions.length === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div
                    className={`transition-all duration-300 origin-top ${
                      expandedQuestions.has(questionIndex)
                        ? "opacity-100 max-h-screen"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    <div className="p-4 space-y-4">
                      <div className="transition-all duration-300 transform hover:scale-101">
                        <label className="block text-sm text-gray-700">
                          Question Text
                        </label>
                        <input
                          type="text"
                          className="mt-1 w-full p-3 border border-amber-200 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300"
                          value={question.questionText}
                          onChange={(e) =>
                            handleQuestionChange(
                              questionIndex,
                              "questionText",
                              e.target.value
                            )
                          }
                          placeholder="Enter your question..."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm text-gray-700">
                          Options
                        </label>
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="transition-all duration-300 transform hover:scale-101"
                          >
                            <input
                              type="text"
                              className="w-full p-3 border border-amber-200 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300"
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(
                                  questionIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`Option ${optionIndex + 1}`}
                              required
                            />
                          </div>
                        ))}
                      </div>

                      <div className="transition-all duration-300 transform hover:scale-101">
                        <label className="block text-sm text-gray-700">
                          Correct Answer
                        </label>
                        <select
                          className="mt-1 w-full p-3 border border-amber-200 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300"
                          value={question.correctAnswer}
                          onChange={(e) =>
                            handleQuestionChange(
                              questionIndex,
                              "correctAnswer",
                              e.target.value
                            )
                          }
                          required
                        >
                          <option value="">Select correct answer</option>
                          {question.options.map((option, index) => (
                            <option key={index} value={option}>
                              {option || `Option ${index + 1}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="transition-all duration-300 transform hover:scale-101">
                        <label className="block text-sm text-gray-700">
                          Explanation
                        </label>
                        <textarea
                          className="mt-1 w-full p-3 border border-amber-200 rounded-md transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300"
                          value={question.explanation}
                          onChange={(e) =>
                            handleQuestionChange(
                              questionIndex,
                              "explanation",
                              e.target.value
                            )
                          }
                          placeholder="Explain the correct answer..."
                          rows={2}
                          required
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
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-gray-700 rounded-md hover:from-amber-200 hover:to-orange-200 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="transition-transform duration-300 group-hover:rotate-180" />
              Add Question
            </button>
          </div>

          <button
            type="submit"
            className="group w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-102 flex items-center justify-center gap-2"
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
