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
import { Star } from "lucide-react";
import QuizForm from "../components/common/quizform";
import axios from "axios";
import { useEffect, useState } from "react";
const Courses = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coursestaught, setcoursestaught] = useState([]);
  const [role, setrole] = useState(user.role);
  useEffect(() => {
    const fetchcoursestaught = async () => {
      try {
        const res = await axios.post("/api/getcoursebyuid", { uid: user._id });
        // console.log(res.data.courseDetails);
        setcoursestaught(res.data.courseDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchcoursestaught();
    console.log("courses page", user);
  }, []);
  return (
    <div className="flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
      {/* Create Quiz Button */}
      {role == "Instructor" && (
        <div className="flex justify-center text-center order-first">
          <div className="relative inline-block text-center w-full md:w-125">
            <Button
              onClick={onOpen}
              className="w-full"
              colorScheme={"yellow"}
              size="lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
                  fill="url(#prefix__paint0_radial_980_20147)"
                />
                <defs>
                  <radialGradient
                    id="prefix__paint0_radial_980_20147"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
                  >
                    <stop offset=".067" stopColor="#9168C0" />
                    <stop offset=".343" stopColor="#5684D1" />
                    <stop offset=".672" stopColor="#1BA1E3" />
                  </radialGradient>
                </defs>
              </svg>
              Create Quiz for your Courses
            </Button>
          </div>
        </div>
      )}
      {/* Modal */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={"xl"}
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

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 md:col-span-6">
          <ChartOne />
        </div>
        <div className="col-span-12 md:col-span-6">
          <ChartThree />
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-rose-50 p-8">
        <div className="flex justify-center">
          <h1 className="text-6xl text-black font-extrabold">
            Courses Taught by You
          </h1>
        </div>
        <br />
        <div className="w-full bg-slate-300 h-[2px]"></div>
        <br />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {coursestaught.map((course, index) => (
              <Link href={`/courses/${course._id}`}>
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2"
                >
                  {/* Decorative Background Elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />

                  {/* Main Content */}
                  {/* Main Content */}
                  <div className="relative">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.imageUrl}
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
                              {course.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-white via-white to-white/0">
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transform transition-transform duration-300 hover:scale-105">
                        Go there Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
