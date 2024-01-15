'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoursePage = ({ params }) => {

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/getcourse', { courseId: params.CourseId });
        setCourseData(response.data.courseDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // const data = axios.post("/api/getcourse", {courseId : params.CourseId} )

  return (
    <div>
      {JSON.stringify(courseData)}
    </div>
  );
}

export default CoursePage;
