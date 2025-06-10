"use client";
import ChartOne from "../components/Charts/ChartOne";
import ChartThree from "../components/Charts/ChartThree";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { Star, BookOpen, Award, TrendingUp, Clock, Users, Play, CheckCircle } from "lucide-react";
import QuizForm from "../components/common/quizform";
import axios from "axios";
import { useEffect, useState } from "react";

const Courses = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coursestaught, setcoursestaught] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [role, setrole] = useState(user.role);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileDataFromCookie = () => {
      try {
        const authToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('authtoken='))
          ?.split('=')[1];
        
        if (authToken) {
          const tokenData = JSON.parse(atob(authToken.split('.')[1]));
          setProfileData(tokenData.profileObject);
          return tokenData.profileObject;
        }
        return null;
      } catch (error) {
        console.log("Error parsing auth token:", error);
        return null;
      }
    };

    const fetchCoursesTaught = async () => {
      try {
        const res = await axios.post("/api/getcoursebyuid", { uid: user._id });
        setcoursestaught(res.data.courseDetails);
      } catch (error) {
        console.log("Error fetching courses taught:", error);
      }
    };

    const fetchEnrolledCourses = async (profileData) => {
      try {
        if (profileData?.coursesEnrolled) {
          const coursePromises = profileData.coursesEnrolled.map(async (enrolledCourse) => {
            const res = await axios.post("/api/getcourse", { 
              courseId: enrolledCourse.course 
            });
            return {
              ...res.data.courseDetails,
              progress: enrolledCourse.progress,
              completedQuizzes: enrolledCourse.completedQuizzes
            };
          });
          
          const courses = await Promise.all(coursePromises);
          setEnrolledCourses(courses);
        }
      } catch (error) {
        console.log("Error fetching enrolled courses:", error);
      }
    };

    const initializeData = async () => {
      setLoading(true);
      const profile = getProfileDataFromCookie();
      
      if (role === "Instructor") {
        await fetchCoursesTaught();
      } else {
        await fetchEnrolledCourses(profile);
      }
      
      setLoading(false);
    };

    initializeData();
  }, [role, user._id]);

  // Student Stats Component
  const StudentStats = () => {
    const totalQuizzes = profileData?.coursesEnrolled?.reduce(
      (total, course) => total + course.completedQuizzes.length, 0
    ) || 0;
    
    const totalPossibleScore = profileData?.coursesEnrolled?.reduce(
      (total, course) => total + (course.completedQuizzes.length * 5), 0 // Assuming max score is 5
    ) || 1;
    
    const actualScore = profileData?.coursesEnrolled?.reduce(
      (total, course) => total + course.completedQuizzes.reduce((sum, quiz) => sum + quiz.score, 0), 0
    ) || 0;
    
    const averageScore = totalPossibleScore > 0 ? (actualScore / totalPossibleScore * 100) : 0;
    const studyHours = Math.floor(totalQuizzes * 1.5) + Math.floor(enrolledCourses.length * 8);

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Enrolled Courses</p>
              <p className="text-3xl font-bold">{enrolledCourses.length}</p>
            </div>
            <BookOpen className="w-10 h-10 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Quizzes Completed</p>
              <p className="text-3xl font-bold">{totalQuizzes}</p>
            </div>
            <Award className="w-10 h-10 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Performance</p>
              <p className="text-3xl font-bold">{averageScore.toFixed(0)}%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium mb-1">Study Hours</p>
              <p className="text-3xl font-bold">{studyHours}h</p>
            </div>
            <Clock className="w-10 h-10 text-orange-200" />
          </div>
        </div>
      </div>
    );
  };

  // Student Dashboard
  const StudentDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-20 h-20 rounded-full border-4 border-white/30 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-400 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user.firstName}!</h1>
              <p className="text-indigo-100 text-lg">Continue your learning journey and achieve your goals</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <StudentStats />


        {/* Enrolled Courses Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <BookOpen className="w-8 h-8 mr-3 text-blue-500" />
              My Enrolled Courses
            </h2>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {enrolledCourses.length} Course{enrolledCourses.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-t-2xl"></div>
                  <div className="bg-gray-100 p-6 rounded-b-2xl">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses enrolled yet</h3>
              <p className="text-gray-400">Start your learning journey by enrolling in a course!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrolledCourses.map((course, index) => {
                const completedQuizzes = course.completedQuizzes?.length || 0;
                const totalQuizzes = course.quizzes?.length || 0;
                const quizProgress = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0;
                
                return (
                  <Link key={course._id} href={`/courses/${course._id}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-gray-100">
                      {/* Course Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={course.imageUrl || '/api/placeholder/400/200'}
                          alt={course.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Progress Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                            {course.progress || 0}% Complete
                          </div>
                        </div>
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        
                        {/* Course Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{course.rating?.toFixed(1) || '0.0'}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{course.studentsEnrolled?.length || 0} students</span>
                          </div>
                        </div>
                        
                        {/* Quiz Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Quiz Progress</span>
                            <span>{completedQuizzes}/{totalQuizzes} completed</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${quizProgress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 flex items-center justify-center">
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Instructor Dashboard
  const InstructorDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Create Quiz Button */}
        <div className="flex justify-center">
          <div className="relative inline-block text-center w-full md:w-125">
            <Button
              onClick={onOpen}
              className="w-full"
              colorScheme="yellow"
              size="lg"
              leftIcon={
                <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" fill="url(#prefix__paint0_radial_980_20147)" />
                  <defs>
                    <radialGradient id="prefix__paint0_radial_980_20147" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)">
                      <stop offset=".067" stopColor="#9168C0" />
                      <stop offset=".343" stopColor="#5684D1" />
                      <stop offset=".672" stopColor="#1BA1E3" />
                    </radialGradient>
                  </defs>
                </svg>
              }
            >
              Create Quiz for your Courses
            </Button>
          </div>
        </div>

        {/* Courses Taught Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 flex items-center">
              <Users className="w-10 h-10 mr-4 text-orange-500" />
              Courses Taught by You
            </h1>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {coursestaught.length} Course{coursestaught.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="w-full bg-gradient-to-r from-orange-200 to-yellow-200 h-1 rounded-full mb-8"></div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-t-2xl"></div>
                  <div className="bg-gray-100 p-6 rounded-b-2xl">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : coursestaught.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses created yet</h3>
              <p className="text-gray-400">Start teaching by creating your first course!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coursestaught.map((course, index) => (
                <Link key={course._id} href={`/courses/${course._id}`}>
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />

                    {/* Course Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.imageUrl || '/api/placeholder/400/200'}
                        alt={course.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white">
                          <span className="px-3 py-1 bg-orange-500 rounded-full text-sm font-semibold">
                            ${course.price}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {course.rating?.toFixed(1) || '0.0'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="relative p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      
                      {/* Course Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{course.studentsEnrolled?.length || 0} students</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          <span>{course.quizzes?.length || 0} quizzes</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-white via-white to-white/0">
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transform transition-transform duration-300 hover:scale-105">
                          Manage Course
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Modal for Quiz Creation */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h1 className="text-3xl font-bold text-gray-800 border-b border-amber-200 pb-2 transition-colors duration-300">
              Generate Quiz with AI or Manually
            </h1>
          </ModalHeader>
          <ModalCloseButton />
          <QuizForm user={user} />
        </ModalContent>
      </Modal>

      {/* Render appropriate dashboard based on role */}
      {role === "Student" ? <StudentDashboard /> : <InstructorDashboard />}
    </>
  );
};

export default Courses;