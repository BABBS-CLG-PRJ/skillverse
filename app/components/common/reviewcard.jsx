import React from 'react';
import { Star, StarHalf, User } from 'lucide-react';

const ReviewCard = ({
  createdAt ,
  rating,
  reviewText,
  student,
}) => {
  // Format the date to be more readable
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Generate rating stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`star-${i}`} 
          className="w-5 h-5 fill-yellow-400 text-yellow-400" 
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf 
          key="half-star" 
          className="w-5 h-5 fill-yellow-400 text-yellow-400" 
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star 
          key={`empty-star-${i}`} 
          className="w-5 h-5 text-gray-300" 
        />
      );
    }

    return stars;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 rounded-full p-2">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Student ID: {student}</p>
            <p className="text-xs text-gray-400">{formatDate(createdAt)}</p>
          </div>
        </div>
        <div className="flex">
          {renderStars(rating)}
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-gray-700 leading-relaxed">{reviewText}</p>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
      </div>
    </div>
  );
};

export default ReviewCard;