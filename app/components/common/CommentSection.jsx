// components/CommentSection.js
"use client";
import React, { useState } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <div className="mb-4">
        <textarea
          rows="4"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-md"
        ></textarea>
      </div>
      <button
        onClick={handleAddComment}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Comment
      </button>
      <div className="mt-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded-md mb-2">
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
