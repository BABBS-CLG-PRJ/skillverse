// components/CourseCard.js
import React from "react";
import RatingStars from '../common/RatingStars';

const CourseCard = ({ course }) => {
  return (
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-60 object-cover rounded-xl p-2"
        />
      </a>
      <div class="px-5 pb-5">
        <a href="#">
        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Times New Roman' }}>{course.title}</h3>
        </a>
        <p className="text-gray-700 text-l mb-4" >{course.description}</p>
        <div class="flex items-center mt-2.5 mb-5">
          <span class="bg-blue-100 text-blue-800 text-md font-semibold flex-row px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
          <p className="text-gray-700">{course.rating}</p>
          < RatingStars  Review_Count={course.rating}/>
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">
          <p className="text-gray-600">{course.price} Rs</p>
          </span>
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
