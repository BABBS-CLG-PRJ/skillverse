"use client";
import React, { useState, useEffect } from "react";
import { apiConnector } from "../../services/apiConnector";
import { postcommentendpoint } from "../../services/apis";
import toast from "react-hot-toast";
import axios from "axios";
import ReviewCard from "../../components/common/reviewcard";
import { Star } from "lucide-react";
const CommentSection = ({ courseId, courseData }) => {
  const [comments, setComments] = useState(
    [...courseData.reviews].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  );
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [newComment, setNewComment] = useState(""); // Store new comment input by user
  useEffect(() => {
    console.log(courseData);
  }, []);

  const handleAddComment = async () => {
    if (newComment === "") {
      toast.error("Empty Comment not allowed");
      return;
    }

    const authtoken = localStorage.getItem("authtoken");

    if (!authtoken) {
      console.error("No auth token found in localStorage");
      return;
    }

    try {
      const response = await axios.post("/api/verifytoken", {
        token: authtoken,
      });

      const comment = {
        student: response.data.decodedToken.userObject._id,
        reviewText: newComment,
        rating: rating, // Assuming a default rating
        createdAt: new Date().toISOString(),
        courseId: courseId,
      };

      console.log(comment);

      toast.promise(
        apiConnector("POST", postcommentendpoint.POST_COMMENT_API, comment),
        {
          loading: "Posting comment...",
          success: (res) => {
            console.log(res.data);
            
            // Handle spam case first
            if (res.data.is_spam) {
              throw new Error("Spam comments are not allowed."); // This will trigger the error handler
            }
            
            // Only execute if not spam
            setComments((prevComments) => [res.data.comment, ...prevComments]);
            setNewComment("");
            setRating(0);
            return "Comment added successfully!";
          },
          error: (err) => {
            console.error("Error posting comment:", err);
            return err.message || "There was an error posting your comment. Please try again later.";
          },
        }
      );
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div>
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-blue-900 border-b pb-3">
          Share Your Feedback
        </h2>

        {/* Rating Input */}
        <div className="mb-6">
          <label className="block text-blue-900 text-sm font-medium mb-2">
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((index) => (
              <button
                key={index}
                onMouseEnter={() => setHoveredRating(index)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(index)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    index <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  } transition-colors duration-150`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <div className="mb-6">
          <label className="block text-blue-900 text-sm font-medium mb-2">
            Your Comment
          </label>
          <textarea
            rows="4"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-4 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-blue-900 placeholder-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAddComment}
          disabled={!newComment.trim() || rating === 0}
          className="w-full bg-yellow-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 hover:scale-95 disabled:bg-yellow-100 transition-all duration-150"
        >
          Submit Feedback
        </button>
      </div>
      <div className="mt-4">
        {comments.length > 0 ? (
          comments.map((review, index) => (
            <div className="p-4">
              <ReviewCard
                createdAt={review.createdAt}
                rating={review.rating}
                reviewText={review.reviewText}
                student={review.student}
              />
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
