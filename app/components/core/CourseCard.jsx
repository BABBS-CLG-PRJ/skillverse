// components/CourseCard.js
import React from "react";
import RatingStars from "../common/RatingStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const addToCart = (selectedCourse) => {
  // Get existing cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if course is already in the cart
  const isCourseInCart = cart.find((item) => item._id === selectedCourse._id);
  if (!isCourseInCart) {
    const data = {
      _id: selectedCourse._id,
      imageUrl: selectedCourse.imageUrl,
      title: selectedCourse.title,
      price: selectedCourse.price,
      description: selectedCourse.description,
      uid: localStorage.getItem("userId")
    };
    cart.push(data);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = '/cart';
  }
};

const CourseCard = ({ course, setCourseId, courseEnrolled, loading }) => {
  const isEnrolled = courseEnrolled.some((courseId) => courseId.toString() === course._id.toString());


  return (
    <button
      onClick={() => {
        setCourseId(course._id);
      }}
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-max">
        <Link href={`courses/${course._id}`} prefetch={true}>
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-60 object-cover rounded-xl p-2"
          />
        </Link>
        <div className="px-3 pb-5">
          <Link href={`courses/${course._id}`} prefetch={true}>
            <h3
              className="text-xl text-left font-semibold mb-2 line-clamp-1"
              style={{ fontFamily: "Times New Roman" }}
            >
              {course.title}
            </h3>
          </Link>
          <Link href={`courses/${course._id}`} prefetch={true}>
            <p className="text-gray-700 text-left mb-4 line-clamp-2">
              {course.description}
            </p>
          </Link>
          <Link href={`courses/${course._id}`} prefetch={true}>
            <div className="mt-2.5 mb-5 flex items-center">
              <p className="text-gray-700 font-bold mr-2">
                {Math.round(course.rating * 100) / 100}
              </p>
              <span className="text-blue-800 text-md font-semibold flex-row px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                <RatingStars Review_Count={course.rating} />
              </span>
            </div>
          </Link>

          {isEnrolled ? (
            <Link href={`/courses/${course._id}`} prefetch={true}>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  <p className="text-gray-600">₹ {course.price}</p>
                </span>
                <p className="text-green-500 font-bold">Already Enrolled</p>
              </div>
            </Link>
          ) : (
            <Link href={`cart`} prefetch={true}>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  <Link href={`courses/${course._id}`} prefetch={true}>
                    <p className="text-gray-600">₹ {course.price}</p>
                  </Link>
                </span>
                <button
                  onClick={() => addToCart(course)}
                  className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  {loading ? "Adding..." : "Add to cart"}
                </button>
              </div>
            </Link>
          )}

        </div>
      </div>
    </button>
  );
};

export default CourseCard;

