"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/core/CourseCard";
import Link from "next/link";
import SkeletonLoader from "./Loading";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [CourseId, setCourseId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/getallcourse");
        setCourses(response.data.courseList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    // Render SkeletonLoader component while data is being fetched
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {[...Array(8)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className=" mr-6 my-8">
      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">
        Earn Your Degree
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10 ">
        {courses.map((course) => (
          <Link href={`courses/${CourseId}`}>
            <CourseCard
              key={course.id}
              course={course}
              setCourseId={setCourseId}
            />
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">
        Most Popular Certificates
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {courses.map((course) => (
          <Link href={`courses/${CourseId}`}>
            <CourseCard
              key={course.id}
              course={course}
              setCourseId={setCourseId}
            />
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">
        Recently Viewed Courses and Specializations
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {courses.map((course) => (
          <Link href={`courses/${CourseId}`}>
            <CourseCard
              key={course.id}
              course={course}
              setCourseId={setCourseId}
            />
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">
        New on Coursera
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {courses.map((course) => (
          <Link href={`courses/${CourseId}`}>
            <CourseCard
              key={course.id}
              course={course}
              setCourseId={setCourseId}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
