"use client";
import { useState, useRef, useEffect } from "react";
import ChartOne from "../components/Charts/ChartOne";
import ChartThree from "../components/Charts/ChartThree";
import gear from "../../../public/engineering.png";
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import QuizForm from "../components/common/quizform";
const Courses = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
      {/* Create Quiz Button */}
      <div className="flex justify-center text-center order-first">
        <div className="relative inline-block text-center w-full md:w-125">
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center items-center px-4 py-2 bg-yellow-500 text-white text-lg rounded-md shadow-sm hover:bg-yellow-600 font-bold focus:outline-none w-full dark:bg-yellow-700 dark:hover:bg-yellow-600 dark:text-white"
          >
            Create Quiz for your Courses
            <svg
              className="ml-2 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg origin-top-right transition-all duration-200 ease-out transform dark:bg-yellow-100 dark:border-yellow-800 ${
              isDropdownOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdownButton"
            >
              <Button
                onClick={onOpen}
                className="w-full justify-center px-4 py-2 text-lg transition-all duration-500 font-bold text-gray-700 hover:bg-yellow-100 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-100  flex items-center"
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
                      <stop offset=".067" stop-color="#9168C0" />
                      <stop offset=".343" stop-color="#5684D1" />
                      <stop offset=".672" stop-color="#1BA1E3" />
                    </radialGradient>
                  </defs>
                </svg>
                Generate with AI
              </Button>

              <Button
                onClick={onOpen}
                className="w-full justify-center px-4 py-2 text-lg transition-all duration-500 font-bold text-gray-700 hover:bg-yellow-100 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-100  flex items-center"
              >
                <Image
                  src={gear}
                  alt="gear icon"
                  width={30}
                  height={30}
                  className="mr-2"
                />
                <p>Create manually</p>
              </Button>
            </div>
          </div>
        </div>
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
                Create Quiz
              </h1>
            </ModalHeader>

            <ModalCloseButton />

            <QuizForm user={user} />
          </ModalContent>
        </Modal>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 md:col-span-6">
          <ChartOne />
        </div>
        <div className="col-span-12 md:col-span-6">
          <ChartThree />
        </div>
      </div>
    </div>
  );
};

export default Courses;
