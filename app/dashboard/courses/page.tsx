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
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import QuizForm from "../components/common/quizform";
import Aiform from "../components/common/aiform";

const Courses = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
      {/* Create Quiz Button */}
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
          
            <QuizForm user={user}/>
          
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
    </div>
  );
};

export default Courses;
