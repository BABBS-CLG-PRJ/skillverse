"use client";
import React, { useState } from "react";
import {
  PlusCircle,
  X,
  Upload,
  Book,
  DollarSign,
  Hash,
  Video,
  Check
} from "lucide-react";
import axios from "axios";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: null,
    instructor: localStorage.getItem("userId"),
    tags: [],
    curriculum: [
      {
        sectionTitle: "",
        lectures: [
          {
            lectureTitle: "",
            videoUrl: "",
            videoFile: null,
            supplementaryMaterial: [],
          },
        ],
      },
    ],
  });
  const [imageloading, setimageloading] = useState(false);
  const [videoloading, setvideoloading] = useState(false);
  const [finished, setfinished] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");

  // Handle image upload
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/") && !isImageUploaded) {
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (selectedFile) {
      const formdata = new FormData();
      formdata.append("file", selectedFile);
      formdata.append("upload_preset", "g2zsyxwd");
      setimageloading(true);
      const uploadData = await axios.post(
        `https://api.cloudinary.com/v1_1/dqpl3mf6p/image/upload`,
        formdata
      );
      setimageloading(false);
      const uploaded_img_url = uploadData.data.secure_url;
      setFormData({ ...formData, imageUrl: uploaded_img_url });
      setIsImageUploaded(true);
    }
  };

  // Handle video selection
  const handleVideoSelect = (file, sectionIndex, lectureIndex) => {
    if (file && file.type.startsWith("video/")) {
      const newCurriculum = [...formData.curriculum];
      newCurriculum[sectionIndex].lectures[lectureIndex].videoFile = file;
      newCurriculum[sectionIndex].lectures[lectureIndex].videoUrl = "";
      setFormData({ ...formData, curriculum: newCurriculum });
    }
  };

  // Handle video upload
  const handleVideoUpload = async (sectionIndex, lectureIndex) => {
    const lecture = formData.curriculum[sectionIndex].lectures[lectureIndex];
    console.log(lecture);
    if (lecture.videoFile) {
      const newCurriculum = [...formData.curriculum];
      const formdata = new FormData();
      formdata.append("file", lecture.videoFile);
      setvideoloading(true);
      try {
        const res = await axios.post("/api/videoupload", formdata);
        console.log(res);
        const res2 = await axios.post("/api/getvideourl", {
          videoId: res.data.fileName,
        });
        newCurriculum[sectionIndex].lectures[lectureIndex].videoUrl =
          res2.data.signedUrl;
        console.log(res2);
      } catch (error) {
        console.log(error);
      }
      setvideoloading(false);
      setFormData({ ...formData, curriculum: newCurriculum });
    }
  };

  // Rest of your existing helper functions...
  const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, newTag],
        });
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Build finalCourseData from formData
    const finalCourseData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      imageUrl: formData.imageUrl,
      instructor: formData.instructor,
      tags: formData.tags,
      curriculum: formData.curriculum.map((section) => ({
        sectionTitle: section.sectionTitle,
        lectures: section.lectures.map(
          ({ lectureTitle, videoUrl, supplementaryMaterial }) => ({
            lectureTitle,
            videoUrl,
            supplementaryMaterial,
          })
        ),
      })),
    };
    setFormData({
      title: "",
      description: "",
      price: "",
      imageUrl: null,
      instructor: localStorage.getItem("userId"),
      tags: [],
      curriculum: [
        {
          sectionTitle: "",
          lectures: [
            {
              lectureTitle: "",
              videoUrl: "",
              videoFile: null,
              supplementaryMaterial: [],
            },
          ],
        },
      ],
    });
    console.log(finalCourseData); // Output the processed course data
    try {
      const res = await axios.post("/api/addcourse", finalCourseData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setIsSubmitting(false), 2000);
    setfinished(true);
    setTimeout(() => {
      setfinished(false);
    }, 4000);
    window.location.reload();
  };

  const addSection = () => {
    setFormData({
      ...formData,
      curriculum: [
        ...formData.curriculum,
        {
          sectionTitle: "",
          lectures: [
            {
              lectureTitle: "",
              videoUrl: "",
              videoFile: null,
              supplementaryMaterial: [],
            },
          ],
        },
      ],
    });
  };

  const addLecture = (sectionIndex) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[sectionIndex].lectures.push({
      lectureTitle: "",
      videoUrl: "",
      videoFile: null,
      supplementaryMaterial: [],
    });
    setFormData({ ...formData, curriculum: newCurriculum });
  };

  return (
    <div className="w-full mx-auto p-6 space-y-8">
      {/* Loading overlays */}
      {imageloading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-200 rounded-full animate-spin border-t-amber-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Saving your Image
              </h3>
              <p className="text-gray-600">
                Please wait while we save your Image...
              </p>
            </div>
          </div>
        </div>
      )}

      {videoloading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-200 rounded-full animate-spin border-t-amber-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Saving your Video
              </h3>
              <p className="text-gray-600">
                Please wait while we save your Video...
              </p>
            </div>
          </div>
        </div>
      )}

      {isSubmitting && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-200 rounded-full animate-spin border-t-amber-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Creating Your Course
              </h3>
              <p className="text-gray-600">
                Please wait while we Create Your Course...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Finished Success Overlay */}
      {finished && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
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
                Course Created Successfully!
              </h3>
              <p className="text-gray-600 font-semibold">
                Course created for students! 🎉 Returning to the form for more
                Courses.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* actual course form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 rounded-xl shadow-lg text-white">
          <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
          <p className="opacity-90">
            Transform your knowledge into an engaging learning experience
          </p>
        </div>

        {/* Basic Information */}
        <div className="space-y-4 p-8 bg-yellow-50 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Book className="text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              Course Details
            </h2>
          </div>

          <div className="space-y-6">
            {/* Course Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title
              </label>
              <input
                type="text"
                placeholder="Enter a compelling title"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            {/* Course Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description
              </label>
              <textarea
                placeholder="Describe what students will learn"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="4"
                required
              />
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Tags
                <span className="block text-sm text-gray-500 font-normal mt-1">
                  Type a tag and press space or enter to add it
                </span>
              </label>
              <div className="relative">
                <Hash
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  placeholder="Add tags (e.g., 'programming', 'beginner')"
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                  
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-orange-700 group hover:bg-yellow-200 transition-colors"
                  >
                    {tag}
                    <X
                      size={16}
                      className="ml-2 cursor-pointer opacity-60 group-hover:opacity-100"
                      onClick={() => removeTag(tag)}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Thumbnail
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all
                  ${
                    selectedFile
                      ? "border-orange-500 bg-yellow-50"
                      : "border-gray-300 hover:border-orange-500"
                  }
                  ${
                    isImageUploaded
                      ? "cursor-not-allowed opacity-75"
                      : "cursor-pointer"
                  }`}
                onDragOver={(e) => !isImageUploaded && e.preventDefault()}
                onDrop={(e) => {
                  if (!isImageUploaded) {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    handleFileSelect(file);
                  }
                }}
                onClick={() => {
                  if (!isImageUploaded) {
                    document.getElementById("imageUpload").click();
                  }
                }}
              >
                {selectedFile ? (
                  <div className="relative group">
                    <img
                      src={
                        URL.createObjectURL(selectedFile) || "/placeholder.svg"
                      }
                      alt="Course thumbnail"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    {!isImageUploaded && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <p className="text-white">Click to change</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 py-8">
                    <Upload className="mx-auto text-gray-400" size={32} />
                    <p className="text-gray-500">
                      Drop your course image here or click to browse
                    </p>
                    <p className="text-sm text-gray-400">
                      Recommended size: 1280x720px
                    </p>
                  </div>
                )}
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (!isImageUploaded) {
                      const file = e.target.files[0];
                      handleFileSelect(file);
                    }
                  }}
                  disabled={isImageUploaded}
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleImageUpload}
                disabled={!selectedFile || isImageUploaded}
                className={`mt-4 w-full p-3 rounded-lg font-medium transition-all
                  ${
                    !selectedFile || isImageUploaded
                      ? "bg-orange-200 text-gray-400 cursor-not-allowed"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
              >
                {isImageUploaded ? "Image Uploaded" : "Upload Image"}
              </button>
              {formData.imageUrl && (
                <p className="mt-2 text-sm text-gray-600">
                  Uploaded image: {formData.imageUrl}
                </p>
              )}
            </div>

            {/* Course Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Price
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  placeholder="Set your course price"
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Sections */}
        {formData.curriculum.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`p-8 bg-yellow-50 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl
              ${
                activeSection === sectionIndex ? "ring-2 ring-orange-500" : ""
              }`}
            onClick={() => setActiveSection(sectionIndex)}
          >
            <div className="flex justify-between items-center mb-6">
              <input
                type="text"
                placeholder="Section Title"
                className="text-xl font-semibold bg-transparent border-b-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-all w-full hover:border-orange-300"
                value={section.sectionTitle}
                onChange={(e) => {
                  const newCurriculum = [...formData.curriculum];
                  newCurriculum[sectionIndex].sectionTitle = e.target.value;
                  setFormData({ ...formData, curriculum: newCurriculum });
                }}
                required
              />
              <button
                type="button"
                onClick={() => addLecture(sectionIndex)}
                className="text-orange-500 hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-orange-50"
              >
                <PlusCircle size={24} />
              </button>
            </div>

            {/* Lectures with Video Upload */}
            <div className="space-y-4 mt-4">
              {section.lectures.map((lecture, lectureIndex) => (
                <div
                  key={lectureIndex}
                  className="p-6 bg-yellow-100/50 rounded-lg transition-all duration-300 hover:bg-yellow-100"
                >
                  <input
                    type="text"
                    placeholder="Lecture Title"
                    className="w-full p-3 mb-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                    value={lecture.lectureTitle}
                    onChange={(e) => {
                      const newCurriculum = [...formData.curriculum];
                      newCurriculum[sectionIndex].lectures[
                        lectureIndex
                      ].lectureTitle = e.target.value;
                      setFormData({ ...formData, curriculum: newCurriculum });
                    }}
                    required
                  />

                  {/* Video Upload Section */}
                  <div className="border-2 border-dashed rounded-lg p-6 text-center transition-all hover:border-orange-500">
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      id={`video-${sectionIndex}-${lectureIndex}`}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        handleVideoSelect(file, sectionIndex, lectureIndex);
                      }}
                      required
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        document
                          .getElementById(
                            `video-${sectionIndex}-${lectureIndex}`
                          )
                          .click()
                      }
                    >
                      {lecture.videoFile ? (
                        <div className="space-y-2">
                          <Video
                            className="mx-auto text-orange-500"
                            size={32}
                          />
                          <p className="text-gray-700">
                            {lecture.videoFile.name}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="mx-auto text-gray-400" size={32} />
                          <p className="text-gray-500">
                            Click to upload lecture video
                          </p>
                          <p className="text-sm text-gray-400">
                            Supported formats: MP4, WebM
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleVideoUpload(sectionIndex, lectureIndex)
                      }
                      disabled={!lecture.videoFile || lecture.videoUrl}
                      className={`mt-4 w-full p-3 rounded-lg font-medium transition-all
                        ${
                          !lecture.videoFile || lecture.videoUrl
                            ? "bg-orange-200 text-gray-400 cursor-not-allowed"
                            : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                    >
                      {lecture.videoUrl ? "Video Uploaded" : "Upload Video"}
                    </button>
                    {lecture.videoUrl && (
                      <p className="mt-2 text-sm text-green-600">
                        Video uploaded successfully: {lecture.videoFile.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Section Button */}
        <button
          type="button"
          onClick={addSection}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all flex items-center justify-center space-x-2"
        >
          <PlusCircle size={24} />
          <span>Add New Section</span>
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold
            transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed
            ${isSubmitting ? "animate-pulse" : ""}`}
        >
          {isSubmitting ? "Creating Course..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
