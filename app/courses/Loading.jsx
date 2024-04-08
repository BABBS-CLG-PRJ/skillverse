// SkeletonLoader.js

import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-max animate-pulse">
      <div className="animate-pulse">
        <div className="w-full h-60 bg-gray-300 rounded-xl"></div>
        <div className="px-5 pb-5">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
