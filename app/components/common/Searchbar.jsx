import React, { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";

const SearchBar = ({ className, placeholder }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch search results
  const fetchSearchResults = async (searchQuery) => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/searchcourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: searchQuery }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const courses = await response.json();
      setSearchResults(courses);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSearchResults(value);
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        value={query}
        onChange={handleInputChange}
        className={`block w-full h-[40px] rounded-full xl:w-[520px] p-4 ps-10 text-sm 
          text-gray-900 border border-gray-300 bg-gray-50 
          focus:ring-transparent focus:border-transparent 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          ${className}`}
        placeholder={placeholder}
        required
      />
      {/* Loading Indicator */}
      {loading && (
        <div className="absolute right-3 top-3">
          <FaSpinner className="animate-spin text-gray-500" />{" "}
          {/* Loading spinner icon */}
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="absolute z-10 mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg w-full">
          <ul>
            {searchResults.map((course) => (
              <li
                key={course._id}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center"
                onClick={() =>
                  (window.location.href = `/courses/${course._id}`)
                } // Navigate to course detail
              >
                <FaSearch className="mr-2 text-gray-400" /> {/* Search icon */}
                {course.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
