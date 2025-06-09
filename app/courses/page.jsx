"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/core/CourseCard";
import Link from "next/link";
import { Skeleton } from "@chakra-ui/react";
import { useCookies } from "next-client-cookies";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [CourseId, setCourseId] = useState("");
  const [courseEnrolled, setCourseEnrolled] = useState([]);
  const cookieStore = useCookies();
  const authToken = cookieStore.get('authtoken');

  // Function to fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    if (authToken) {
      try {
        const userDetails = await axios.post("/api/verifytoken", {token: authToken});
        const courseIds = userDetails.data.decodedToken.profileObject.coursesEnrolled.map(entry => entry.course);
        setCourseEnrolled(courseIds);
      } catch (userError) {
        console.error("Error fetching user details:", userError);
        setCourseEnrolled([]);
      }
    } else {
      setCourseEnrolled([]);
    }
  };

  // Function to refresh user data (can be called after purchase)
  const refreshUserData = async () => {
    await fetchUserEnrolledCourses();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Always fetch courses first
        const response = await axios.post("/api/getallcourse");
        console.log(response);
        
        if (response.data && Array.isArray(response.data)) {
          setCourses(response.data);
        } else if (response.data && Array.isArray(response.data.courseList)) {
          setCourses(response.data.courseList);
        } else {
          setCourses([]);
        }

        // Fetch user enrolled courses
        await fetchUserEnrolledCourses();
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
        setLoading(false);
      }
    };

    fetchData();

    // Listen for custom events from successful purchase
    const handlePurchaseSuccess = () => {
      refreshUserData();
    };

    window.addEventListener('courseEnrollmentSuccess', handlePurchaseSuccess);

    return () => {
      window.removeEventListener('courseEnrollmentSuccess', handlePurchaseSuccess);
    };
  }, []);

  const loader = [1, 2, 3, 4];

  // Function to render course cards or "No courses found" message
  const renderCourses = () => {
    if (loading) {
      return loader.map((load) => (
        <div key={load} className="flex flex-col space-y-3 w-full h-[400px] p-4 border border-gray-200 rounded-lg">
          <Skeleton className="h-[175px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex gap-x-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex gap-x-2 justify-between mt-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      ));
    }

    if (!courses || courses.length === 0) {
      return <div className="text-center text-xl text-gray-500 col-span-full">No courses found.</div>;
    }

    return courses.map((course) => (
      <CourseCard 
        key={course._id} 
        course={course} 
        courseEnrolled={courseEnrolled} 
        setCourseId={setCourseId}
        onEnrollmentUpdate={refreshUserData} // Pass refresh function
      />
    ));
  };

  return (
    <div className="mr-6 my-8">
      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">Earn Your Degree</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {renderCourses()}
      </div>

      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">Most Popular Certificates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {renderCourses()}
      </div>

      <h1 className="text-3xl font-semibond mb-6 ml-10 my-4">Recently Viewed Courses and Specializations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {renderCourses()}
      </div>

      <h1 className="text-3xl font-semibold mb-6 ml-10 my-4">New on Skillverse</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {renderCourses()}
      </div>
    </div>
  );
};

export default Courses;