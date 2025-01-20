"use client";
import React, { useState } from "react";
import {
  PlusCircle,
  X,
  Upload,
  Book,
  DollarSign,
  Hash,
} from "lucide-react";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: null,
    tags: [],
    curriculum: [
      {
        sectionTitle: "",
        lectures: [
          {
            lectureTitle: "",
            videoUrl: "",
            supplementaryMaterial: [],
          },
        ],
      },
    ],
  });

  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const addSection = () => {
    setFormData({
      ...formData,
      curriculum: [
        ...formData.curriculum,
        {
          sectionTitle: "",
          lectures: [
            { lectureTitle: "", videoUrl: "", supplementaryMaterial: [] },
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
      supplementaryMaterial: [],
    });
    setFormData({ ...formData, curriculum: newCurriculum });
  };

  return (
    <div className="w-full mx-auto p-6 space-y-8">
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
              />
            </div>

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
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
                  ${
                    formData.imageUrl
                      ? "border-orange-500 bg-yellow-50"
                      : "border-gray-300 hover:border-orange-500"
                  }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith("image/")) {
                    setFormData({ ...formData, imageUrl: file });
                  }
                }}
                onClick={() =>
                  document.getElementById("imageUpload").click()
                }
              >
                {formData.imageUrl ? (
                  <div className="relative group">
                    <img
                      src={URL.createObjectURL(formData.imageUrl)}
                      alt="Course image"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <p className="text-white">Click to change</p>
                    </div>
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
                    const file = e.target.files[0];
                    if (file)
                      setFormData({ ...formData, imageUrl: file });
                  }}
                />
              </div>
            </div>

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
              />
              <button
                type="button"
                onClick={() => addLecture(sectionIndex)}
                className="text-orange-500 hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-orange-50"
              >
                <PlusCircle size={24} />
              </button>
            </div>

            {/* Lectures */}
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
                  />

                  {/* Video URL Input */}
                  <input
                    type="text"
                    placeholder="Video URL"
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300"
                    value={lecture.videoUrl}
                    onChange={(e) => {
                      const newCurriculum = [...formData.curriculum];
                      newCurriculum[sectionIndex].lectures[
                        lectureIndex
                      ].videoUrl = e.target.value;
                      setFormData({ ...formData, curriculum: newCurriculum });
                    }}
                  />
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