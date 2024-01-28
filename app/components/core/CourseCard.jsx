// components/CourseCard.js
import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="max-w-xs bg-white border border-gray-300 p-6 rounded-md shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-95 h-100">
      <div className="mb-4">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-40 object-cover rounded-md"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <p className="text-gray-600">Price: {course.price}</p>
      </div>
    </div>
  );
};

export default CourseCard;
