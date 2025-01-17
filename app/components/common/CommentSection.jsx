import React, { useState } from 'react';
import { Star } from "lucide-react";
import { apiConnector } from "../../services/apiConnector";
import { postcommentendpoint } from "../../services/apis";
import toast from "react-hot-toast";
import axios from "axios";

const ReviewCard = ({ createdAt, rating, reviewText, student }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            {student?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="font-medium">{student?.name || 'User'}</div>
            <div className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }).replace(/(\d+)/, (match) => {
                const day = parseInt(match);
                const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 || day > 20) ? 0 : day % 10];
                return `${day}${suffix}`;
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index}
              className={`w-4 h-4 ${
                index < rating 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700">{reviewText}</p>
    </div>
  );
};

const CommentSection = ({ courseId, courseData }) => {
  const ITEMS_PER_PAGE = 5;
  const [comments, setComments] = useState(
    [...(courseData?.reviews || [])].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  );
  const [visibleItems, setVisibleItems] = useState(
    Math.min(ITEMS_PER_PAGE, comments.length)
  );
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const showLoadMore = visibleItems < comments.length;

  const handleLoadMore = () => {
    setVisibleItems((prev) => 
      Math.min(prev + ITEMS_PER_PAGE, comments.length)
    );
  };

  const handleAddComment = async () => {
    if (newComment === "") {
      toast.error("Empty Comment not allowed");
      return;
    }

    const authtoken = localStorage.getItem("authtoken");

    if (!authtoken) {
      toast.error("Please login to post a comment");
      return;
    }

    try {
      const response = await axios.post("/api/verifytoken", {
        token: authtoken,
      });

      const comment = {
        student: response.data.decodedToken.userObject._id,
        reviewText: newComment,
        rating: rating,
        createdAt: new Date().toISOString(),
        courseId: courseId,
      };

      toast.promise(
        apiConnector("POST", postcommentendpoint.POST_COMMENT_API, comment),
        {
          loading: "Posting comment...",
          success: (res) => {
            if (res.data.is_spam) {
              throw new Error("Spam comments are not allowed.");
            }
            
            setComments((prevComments) => [res.data.comment, ...prevComments]);
            setNewComment("");
            setRating(0);
            return "Comment added successfully!";
          },
          error: (err) => {
            console.error("Error posting comment:", err);
            return err.message || "Error posting comment. Please try again.";
          },
        }
      );
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Error posting comment. Please try again.");
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Comment Input Section */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-blue-900 border-b pb-3">
          Share Your Feedback
        </h2>

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

        <div className="mb-6">
          <label className="block text-blue-900 text-sm font-medium mb-2">
            Your Comment
          </label>
          <textarea
            rows="4"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-4 border border-blue-100 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none text-blue-900 placeholder-blue-300"
          />
        </div>

        <button
          onClick={handleAddComment}
          disabled={!newComment.trim() || rating === 0}
          className="w-full bg-yellow-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 hover:scale-95 disabled:bg-yellow-100 transition-all duration-150"
        >
          Submit Feedback
        </button>
      </div>

      {/* Comments Display Section */}
      <div className="space-y-4 w-full">
        {comments.length > 0 ? (
          <>
            <div className="space-y-4">
              {comments.slice(0, visibleItems).map((review, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <ReviewCard {...review} />
                </div>
              ))}
            </div>
            
            {showLoadMore && (
              <div className="flex justify-center py-4">
                <button 
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-400 transition-colors duration-150"
                >
                  Load More Reviews
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;