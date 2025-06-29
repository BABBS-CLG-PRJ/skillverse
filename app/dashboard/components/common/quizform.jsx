"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Plus,
  Save,
  Check,
  Trash2,
  Wand2,
  Sparkles,
  Brain,
  BookOpen,
} from "lucide-react";
import axios from "axios";
import { Tooltip } from "@chakra-ui/react";

const QuizForm = ({ user }) => {
  const [quizData, setQuizData] = useState({
    courseId: "", // Now dynamic instead of hardcoded
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
    },
    numberOfQuestions: 5,
    passingScore: 1,
    attemptsAllowed: 1,
    generate: false,
  });

  // New state for courses
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [coursesError, setCoursesError] = useState("");

  // Track expanded state for each question independently
  const [expandedQuestions, setExpandedQuestions] = useState(new Set([0]));
  const [loading, setloading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [ailoading, setailoading] = useState(false);

  // Fetch instructor's courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?._id) {
        setCoursesError("User information not available");
        setLoadingCourses(false);
        return;
      }

      try {
        setLoadingCourses(true);
        const response = await axios.post("/api/getcoursebyuid", { uid: user._id });
        setCourses(response.data.courseDetails || []);
        setCoursesError("");
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCoursesError(
          error.response?.data?.error || "Failed to fetch courses"
        );
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [user]);

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

  // Function to handle changes to attemptsAllowed, passingScore, and numberOfQuestions
  const handleQuizMetaChange = (field, value) => {
    setQuizData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Handle course selection
  const handleCourseChange = (courseId) => {
    setQuizData((prevState) => ({
      ...prevState,
      courseId: courseId,
    }));
  };

  //final quiz submit//
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = quizData.quizData;
    
    if (!quizData.courseId) {
      alert("Please select a course to add the quiz to");
      return;
    }
    
    if (!title || !description) {
      alert("Please fill in the title and description to Submit");
      return;
    }
    
    console.log("quiz", quizData);
    setloading(true);
    
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
      alert("Error creating quiz: " + (error.response?.data?.error || error.message));
      setloading(false);
    }
    
    // Reset the form UI
    setQuizData({
      courseId: "",
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
      },
      numberOfQuestions: 5,
      passingScore: 1,
      attemptsAllowed: 1,
      generate: false,
    });
  };

  //create questions with gemini ai model//
  const handleCreateWithAI = async (e) => {
    e.preventDefault();
    
    if (!quizData.courseId) {
      alert("Please select a course first before generating with AI");
      return;
    }
    
    console.log(quizData);
    setailoading(true);
    // Reset the expanded questions to only include the first question
    setExpandedQuestions(new Set([0]));
    quizData.generate = true; //gemini api model is invoked based on this//
    try {
      const res = await axios.post("/api/addquiz", quizData); //call the gemini ai-model//
      console.log(res.data.quiz);

      quizData.quizData.questions = res.data.quiz.questions; //setting the ui questions list//
      quizData.generate = false;
      console.log(quizData);
      toggleQuestion(0); // to render the ai generated questions on the ui//
      setailoading(false);
    } catch (error) {
      console.log(error);
      alert("Error generating quiz with AI: " + (error.response?.data?.error || error.message));
      setailoading(false);
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
      {/* ai thinking overlay */}
      {ailoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 animate-fade-in">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Outer pulsing circle */}
              <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-amber-200 to-orange-200 animate-pulse" />

              {/* Middle rotating ring */}
              <div className="absolute w-24 h-24 rounded-full border-4 border-amber-300 border-t-amber-500 animate-spin" />

              {/* Brain icon that bounces */}
              <div className="animate-bounce">
                <Brain className="w-16 h-16 text-amber-500" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
                AI is Thinking
              </h3>
              <p className="text-gray-600">Processing your request...</p>
            </div>
          </div>
        </div>
      )}

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
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 border-b border-amber-200 pb-2 transition-colors duration-300">
              Create Quiz
            </h1>
            
            {/* Course Selection - New Section */}
            <div className="transition-all duration-300 transform hover:scale-101">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="inline-block w-4 h-4 mr-2" />
                Select Course
              </label>
              
              {loadingCourses ? (
                <div className="flex items-center justify-center p-4 border border-amber-200 rounded-md bg-amber-50">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
                  <span className="ml-2 text-amber-700">Loading courses...</span>
                </div>
              ) : coursesError ? (
                <div className="p-4 border border-red-200 rounded-md bg-red-50 text-red-700">
                  {coursesError}
                </div>
              ) : courses.length === 0 ? (
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50 text-gray-600">
                  No courses found. Please create a course first before adding quizzes.
                </div>
              ) : (
                <select
                  className="mt-1 w-full p-3 border border-amber-200 rounded-md shadow-sm transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300"
                  value={quizData.courseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  required
                >
                  <option value="">Choose a course for this quiz...</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Show selected course info */}
            {quizData.courseId && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">
                  <Check className="inline-block w-4 h-4 mr-1" />
                  Selected Course: {courses.find(c => c._id === quizData.courseId)?.title}
                </p>
              </div>
            )}

            {/* 1st part of the form */}
            <form onSubmit={handleCreateWithAI}>
              {/* Quiz Title */}
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
              <br />
              
              {/* Quiz description */}
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
              <br />
              
              {/* Number of Questions */}
              <div className="transition-all duration-300 transform hover:scale-101">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Questions
                </label>
                <input
                  type="number"
                  className="mt-1 w-full p-3 border border-amber-200 rounded-md shadow-sm transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300"
                  value={quizData.numberOfQuestions}
                  onChange={(e) =>
                    handleQuizMetaChange(
                      "numberOfQuestions",
                      e.target.valueAsNumber
                    )
                  }
                  placeholder="Enter Number of Questions..."
                  required
                  min={1}
                />
              </div>
              <br />
              
              {/* Passing Score */}
              <div className="transition-all duration-300 transform hover:scale-101">
                <label className="block text-sm font-medium text-gray-700">
                  Passing score
                </label>
                <input
                  type="number"
                  className="mt-1 w-full p-3 border border-amber-200 rounded-md shadow-sm transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300"
                  value={quizData.passingScore}
                  onChange={(e) =>
                    handleQuizMetaChange("passingScore", e.target.valueAsNumber)
                  }
                  placeholder="Enter Passing Score..."
                  required
                  min={1}
                />
              </div>
              <br />
              
              {/* Attempts allowed */}
              <div className="transition-all duration-300 transform hover:scale-101">
                <label className="block text-sm font-medium text-gray-700">
                  Attempts Allowed
                </label>
                <input
                  type="number"
                  className="mt-1 w-full p-3 border border-amber-200 rounded-md shadow-sm transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 hover:border-amber-300"
                  value={quizData.attemptsAllowed}
                  onChange={(e) =>
                    handleQuizMetaChange(
                      "attemptsAllowed",
                      e.target.valueAsNumber
                    )
                  }
                  placeholder="Enter Attempts Allowed..."
                  required
                  min={1}
                />
              </div>
              <br />
              
              <Tooltip
                hasArrow
                label="Click to generate questions with AI, which you can review and edit as needed."
                placement="right-end"
                bg="yellow.400"
                color="black"
              >
                <button
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400  to-orange-500 font-semibold text-white text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-orange-500/30 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={!quizData.courseId}
                >
                  <span className="relative flex items-center gap-3 z-10">
                    <Wand2
                      size={22}
                      className="transform transition-all duration-500 ease-out rotate-0 group-hover:rotate-[45deg] group-hover:scale-110 text-yellow-100"
                    />
                    <span className="bg-gradient-to-r from-yellow-100 to-orange-100 bg-clip-text text-white text-lg">
                      Generate with AI
                    </span>
                    <Sparkles
                      size={18}
                      className="absolute -top-2 -right-6 text-yellow-200 animate-pulse"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 opacity-0 rounded-xl transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </Tooltip>
            </form>
            
            {/*2nd part of the form  */}
            <form onSubmit={handleSubmit}>
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
                className="mt-4 mb-4 group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-gray-700 rounded-md hover:from-amber-200 hover:to-orange-200 transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="transition-transform duration-300 group-hover:rotate-180" />
                Add Question
              </button>

              <button
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400  to-orange-500 font-semibold text-white text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-orange-500/30 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={!quizData.courseId}
              >
                <span className="relative flex items-center gap-3 z-10">
                  <Save
                    size={22}
                    className="transform transition-all duration-500 ease-out rotate-0 group-hover:rotate-[45deg] group-hover:scale-110 text-yellow-100"
                  />
                  <span className="bg-gradient-to-r from-yellow-100 to-orange-100 bg-clip-text text-white text-lg">
                    Submit
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 opacity-0 rounded-xl transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;