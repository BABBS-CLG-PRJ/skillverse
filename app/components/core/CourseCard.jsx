// components/CourseCard.js
import React, { useState } from "react";
import RatingStars from "../common/RatingStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const addToCart = (selectedCourse, e) => {
  // Prevent event bubbling to avoid navigation
  e.stopPropagation();
  e.preventDefault();
  
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

const CourseCard = ({ course, setCourseId, courseEnrolled, loading, onEnrollmentUpdate }) => {
  const [localEnrollmentState, setLocalEnrollmentState] = useState(null);
  
  // Check enrollment status - prioritize local state if available
  const isEnrolled = localEnrollmentState !== null 
    ? localEnrollmentState 
    : courseEnrolled.some((courseId) => courseId.toString() === course._id.toString());

  // Function to handle successful enrollment
  const handleEnrollmentSuccess = () => {
    setLocalEnrollmentState(true);
    
    // Dispatch custom event to notify parent components
    window.dispatchEvent(new CustomEvent('courseEnrollmentSuccess', {
      detail: { courseId: course._id }
    }));
    
    // Call parent's update function if provided
    if (onEnrollmentUpdate) {
      onEnrollmentUpdate();
    }
  };

  // Enhanced add to cart function that handles post-purchase updates
  const enhancedAddToCart = (selectedCourse, e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Store reference to this course for post-purchase handling
    sessionStorage.setItem('lastAddedCourse', selectedCourse._id);
    
    // Add to cart normally
    addToCart(selectedCourse, e);
  };

  // Listen for purchase completion (you can call this from your purchase success page)
  React.useEffect(() => {
    const handleStorageChange = () => {
      const lastAddedCourse = sessionStorage.getItem('lastAddedCourse');
      const purchaseSuccess = sessionStorage.getItem('purchaseSuccess');
      
      if (purchaseSuccess && lastAddedCourse === course._id) {
        handleEnrollmentSuccess();
        // Clean up
        sessionStorage.removeItem('lastAddedCourse');
        sessionStorage.removeItem('purchaseSuccess');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check on component mount
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [course._id]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-max hover:shadow-lg transition-shadow duration-200">
      <Link href={`courses/${course._id}`} prefetch={true}>
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-60 object-cover rounded-xl p-2 cursor-pointer"
        />
      </Link>
      <div className="px-3 pb-5">
        <Link href={`courses/${course._id}`} prefetch={true}>
          <h3
            className="text-xl text-left font-semibold mb-2 line-clamp-1 hover:text-blue-600 cursor-pointer"
            style={{ fontFamily: "Times New Roman" }}
          >
            {course.title}
          </h3>
        </Link>
        <Link href={`courses/${course._id}`} prefetch={true}>
          <p className="text-gray-700 text-left mb-4 line-clamp-2 hover:text-gray-900 cursor-pointer">
            {course.description}
          </p>
        </Link>
        <Link href={`courses/${course._id}`} prefetch={true}>
          <div className="mt-2.5 mb-5 flex items-center cursor-pointer">
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
            <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                <p className="text-gray-600">₹ {course.price}</p>
              </span>
              <p className="text-green-500 font-bold">Already Enrolled</p>
            </div>
          </Link>
        ) : (
          <div className="flex items-center justify-between">
            <Link href={`courses/${course._id}`} prefetch={true}>
              <span className="text-3xl font-bold text-gray-900 dark:text-white cursor-pointer">
                <p className="text-gray-600 hover:text-gray-800">₹ {course.price}</p>
              </span>
            </Link>
            <button
              onClick={(e) => enhancedAddToCart(course, e)}
              className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              {loading ? "Adding..." : "Add to cart"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;