'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/getallcourse');
        setCourseData(response.data.courseList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
      {courseData ? (
        // Render your course data here
        courseData.map((course) => (

          // Design your page here

          <div key={course._id}>
            <img src={course.imageUrl} alt="" srcset="" />
            <div>{course.title}</div>
            // localhost:3000/courses/6596af1950b105b60553c35c
            <div>{course.price}</div>
          </div>
        ))
      ) : (
        // Render loading state or any other UI while waiting for data
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Courses;
