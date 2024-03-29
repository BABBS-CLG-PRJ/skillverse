import React from "react";
import { useState } from "react";
import { apiConnector } from "../../../services/apiConnector";
import { uploadvideoendpoint } from "../../../services/apis";
import { videostreamendpoint } from "../../../services/apis";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Input,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
const videoadder = ({ index, onDelete }) => {
  const [sectionTitle, setSectionTitle] = useState("Section title");
  const [files, setFiles] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const handleDelete = () => {
    onDelete(index); //passed on to parent index.js section object//
  };
  const onDrop = async (acceptedFiles) => {
    // Combine previous files with newly uploaded files

    const updatedFiles = [...files, ...acceptedFiles];
    setFiles(updatedFiles);
    const droppedFile = updatedFiles[updatedFiles.length - 1];
    console.log(droppedFile);
    const formData = new FormData();
    formData.append("file", droppedFile);
    try {
      //video upload//
      const response = await apiConnector(
        "POST",
        uploadvideoendpoint.UPLOAD_VIDEO_API,
        formData
      );
      //getting the signed url from the videoId//
      const response2 = await apiConnector(
        "POST",
        videostreamendpoint.STREAM_VIDEO_API,
        { videoId: response.data.fileName }
      );
      //URL===Uniform Resource Locator
      // setting the url with the array of urls for ui purposes
      setVideoUrls((prevUrls) => [...prevUrls, response2.data.signedUrl]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    console.log(updatedFiles);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Accordion allowMultiple className="flex flex-row gap-x-2">
      <AccordionItem className="w-full">
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Input
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="Enter section title"
              />
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {/* Display uploaded videos */}
          <div>
            {videoUrls.map((url, index) => (
              <video key={index} src={url} controls />
            ))}
          </div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div
              id="FileUpload"
              className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-yellow-800 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
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
                      fill="#854d0e"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                      fill="#854d0e"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                      fill="#854d0e"
                    />
                  </svg>
                </span>
                <p className="text-yellow-800">
                  <span>Click to upload</span> or drag and drop The Videos
                </p>
              </div>
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>
      <button
        onClick={handleDelete} // very hard to implement this function will delete a specific accordion elemnt basaed on index//
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path
            d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
            fill="red"
          />
        </svg>
      </button>
    </Accordion>
  );
};

export default videoadder;
