"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/core/CourseCard";
import Link from "next/link";
import { Skeleton, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";

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
  const loader = [1, 2, 3, 4];
  return (
    <div className=" mr-6 my-8">
      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">
        Earn Your Degree
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10 ">
        {!loading &&
          courses.map((course) => (
            <Link href={`courses/${CourseId}`}>
              <CourseCard
                key={course.id}
                course={course}
                setCourseId={setCourseId}
              />
            </Link>
          ))}
        {loading &&
          loader.map((load) => (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[175px] w-[350px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[300px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
              <div className="flex gap-x-2">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-30" />
              </div>
              <div className="flex gap-x-2 justify-between">
                <Skeleton className="h-8 w-26" />
                <Skeleton className="h-8 w-45" />
              </div>
            </div>
          ))}
      </div>
      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">
        Most Popular Certificates
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {!loading &&
          courses.map((course) => (
            <Link href={`courses/${CourseId}`}>
              <CourseCard
                key={course.id}
                course={course}
                setCourseId={setCourseId}
              />
            </Link>
          ))}
        {loading &&
          loader.map((load) => (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
      </div>
      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">
        Recently Viewed Courses and Specializations
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {!loading &&
          courses.map((course) => (
            <Link href={`courses/${CourseId}`}>
              <CourseCard
                key={course.id}
                course={course}
                setCourseId={setCourseId}
              />
            </Link>
          ))}
        {loading &&
          loader.map((load) => (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
      </div>
      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">
        New on Coursera
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {!loading &&
          courses.map((course) => (
            <Link href={`courses/${CourseId}`}>
              <CourseCard
                key={course.id}
                course={course}
                setCourseId={setCourseId}
              />
            </Link>
          ))}
        {loading &&
          loader.map((load) => (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Courses;
