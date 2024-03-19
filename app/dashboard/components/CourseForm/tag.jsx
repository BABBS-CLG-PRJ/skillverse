import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const Tag = ({ label, name, placeholder, tags, setTags }) => {
  const handleChange = (newTags) => {
    setTags(newTags);

  };

  return (
    <div>
      <label className="text-sm text-richblack-900 font-bold" htmlFor={name}>
        {label}
        <sup className="text-red-600">*</sup>
      </label>
      <TagsInput
        value={tags}
        id={name}
        inputProps={{
          style: {
            width: "30%",
            backgroundColor: "rgba(44, 239, 190, 0.824)",
          },
          placeholder: placeholder,
        }}
        onChange={handleChange}
        className="form-style font-bold"
      />
    </div>
  );
};

export default Tag;
