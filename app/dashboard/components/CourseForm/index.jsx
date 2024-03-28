"use client";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Info from "./Info";
import { apiConnector } from "../../../services/apiConnector";
import { uploadimageendpoint } from "../../../services/apis";
import { verifytokenEndpoint } from "../../../services/apis";
import { useDropzone } from "react-dropzone";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
const index = () => {
  const [step, setstep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const steps = [
    {
      id: 1,
      title: "Information",
    },
    {
      id: 3,
      content: (
        <div className=" w-50 border-dashed border-b-2 dark:border-white border-richblack-900"></div>
      ),
    },
    {
      id: 4,
      content: <div className=" w-40 "></div>,
    },

    {
      id: 2,
      title: "Builder",
    },
  ];
  const handleModalClose = () => {
    setOpenModal(false);
    setstep(1);
  };

  const onDrop = (acceptedFiles) => {
    // Assuming only one file is dropped
    const file = acceptedFiles[0];
    // Do something with the file, like uploading it and getting the URL
    // For simplicity, let's assume we directly get the URL from the dropped file
    const imageUrl = URL.createObjectURL(file);
    //Setting the image url for display in the front end//
    setImageUrl(imageUrl);
    // Update the formData state with the imageUrl
    setFormData({ ...formData, imageUrl: imageUrl });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const courseSubmit = async () => {
    // Retrieve the token from localStorage
    const authtoken = localStorage.getItem("authtoken");

    // Check if authtoken exists
    if (!authtoken) {
      console.error("No auth token found in localStorage");
      return;
    }

    console.log(authtoken);

    try {
      // Send the token to the server
      const res1 = await apiConnector(
        "POST",
        verifytokenEndpoint.VERIFY_TOKEN_API,
        {
          token: authtoken,
        }
      );

      const UserObject = {
        uid: res1.data.decodedToken.userId,
      };
      console.log("Printing User Object");
      console.log(UserObject);
      console.log("Printing The entered FormData");
      console.log(formData);

      //   const res2 = await apiConnector("POST", uploadimageendpoint.UPLOAD_IMAGE_API, {

      // });
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };

  return (
    <>
      {/* The steps */}
      <div className="flex relative mb-2 flex-row justify-center items-center">
        {steps.map((item) => (
          <div key={item.id}>
            {item.id === 3 && <div>{item.content}</div>}
            {item.id !== 3 && item.id !== 4 && (
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] text-richblack-900  ${
                    step === item.id
                      ? "bg-primary-body border-yellow-500 text-black font-bold ripple-container "
                      : " bg-primary-body border-yellow-500 "
                  }`}
                >
                  {step > item.id ? <FaCheck /> : item.id}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* The step description */}
      <div className="flex relative mb-10 flex-row justify-center items-center">
        {steps.map((item) => (
          <div key={item.id}>
            {item.id === 4 && <div>{item.content}</div>}
            {item.id !== 3 && (
              <div className="flex flex-col items-center justify-center">
                <div className="font-bold text-center ">{item.title}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Info
          setFormData={setFormData}
          setstep={setstep}
          step={step}
          setOpenModal={setOpenModal}
        />
      )}
      {step === 2 && openModal && (
        <>
          <Modal
            isOpen={openModal}
            onClose={handleModalClose}
            size="4xl"
            closeOnEsc={true}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Course Builder</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div className="flex flex-col gap-y-4">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {/* Display the uploaded image */}
                    {imageUrl === null && (
                      <div
                        id="FileUpload"
                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                      >
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                fill="#3C50E0"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                fill="#3C50E0"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                fill="#3C50E0"
                              />
                            </svg>
                          </span>
                          <p>
                            <span className="text-primary">
                              Click to upload
                            </span>{" "}
                            or drag and drop The Course Thumbnail
                          </p>
                          <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                          <p>(max, 800 X 800px)</p>
                        </div>
                      </div>
                    )}
                    {imageUrl && (
                      <div className="flex justify-center mt-4">
                        <img
                          src={imageUrl}
                          alt="Uploaded"
                          className="max-w-full h-auto"
                        />
                      </div>
                    )}
                  </div>

                  {imageUrl && (
                    <button
                    class="select-none rounded-lg bg-red-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={()=>{setImageUrl(null)}}
                  >
                   Discard

                  </button>
                  )}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
                  Close
                </Button>
                <Button variant="ghost" onClick={courseSubmit}>
                  Submit Course
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default index;
