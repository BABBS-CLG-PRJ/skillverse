"use client";
import React, { useState, useRef } from "react";
import { Upload, RotateCw } from "lucide-react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const FileUploadPreview = () => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // React Dropzone setup
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Limit to image files
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);
      // Get UID from localStorage
      const uid = localStorage.getItem("userId");

      // Create FormData with file and uid
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "g2zsyxwd");
      formData.append('public_id',uid);
      const uploadData = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData
      );
      const uploaded_img_url = uploadData.data.secure_url;
      // Log FormData to check its contents
      console.log(uploaded_img_url);


      // Simulate upload delay
      setTimeout(() => {
        // Reset the form
        setPreview(null);
        setSelectedFile(null);
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1000);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <div
        className={`
        border-2 border-dashed rounded-lg p-6 text-center
        ${preview ? "border-orange-400" : "border-yellow-400"}
        bg-gradient-to-r from-yellow-50 to-orange-50
        hover:from-yellow-100 hover:to-orange-100
        transition-colors duration-300
      `}
        {...getRootProps()} // Pass dropzone props here
      >
        <input {...getInputProps()} className="hidden" ref={fileInputRef} />
        {!preview ? (
          <div className="cursor-pointer flex flex-col items-center space-y-2">
            <Upload className="w-12 h-12 text-orange-400" />
            <span className="text-orange-600 font-medium">Click to upload file</span>
          </div>
        ) : (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <label
              htmlFor="fileInput"
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg cursor-pointer"
            >
              <div className="text-white flex flex-col items-center">
                <Upload className="w-8 h-8 mb-2" />
                <span>Click to change image</span>
              </div>
            </label>
          </div>
        )}
      </div>

      {preview && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`
            w-full bg-gradient-to-r from-yellow-400 to-orange-400
            text-white py-3 px-4 rounded-lg
            hover:from-yellow-500 hover:to-orange-500
            transition-all duration-300
            flex items-center justify-center space-x-2
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <span>Upload</span>
          <RotateCw
            className={`w-5 h-5 ${isUploading ? "animate-spin" : "animate-none"}`}
          />
        </button>
      )}
    </div>
  );
};

export default FileUploadPreview;
