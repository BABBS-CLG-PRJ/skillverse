// components/CommentSection.js
"use client";
import React, { useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { postcommentendpoint } from "../../services/apis";
import { verifytokenEndpoint } from "../../services/apis";
const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async() => {
    console.log(newComment);
    const authtoken = localStorage.getItem("authtoken");

    // Check if authtoken exists
    if (!authtoken) {
      console.error("No auth token found in localStorage");
      return;
    }
    try{
      const res1 = await apiConnector(
        "POST",
        verifytokenEndpoint.VERIFY_TOKEN_API,
        {
          token: authtoken,
        }
      );
    
      const comment={
        studentId:res1.data.decodedToken.userId,
        commentText: newComment,
        rating:3.5,
        courseId:'658cffe7dd3268d060b0f724'
      }
      console.log(comment);
      const res2 = await apiConnector("POST", postcommentendpoint.  POST_COMMENT_API,{
        comment
      });
      console.log(res2);
    }catch(error){
      console.log(error);
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
