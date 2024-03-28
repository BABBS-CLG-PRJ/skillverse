"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import Tag from "./tag";
import Btn from "./Btn";
import toast from "react-hot-toast";
const Info = ({setFormData,setstep,step,setOpenModal, setImageUrl}) => {
  const [isTagInputEmpty, setIsTagInputEmpty] = useState(false);
  const [tags, setTags] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if(tags.length===0){
        toast.error("Enter Tags and press Space or comma");

    }
    const price = parseFloat(data.price);
      if (isNaN(price)) {
        // Alert the user or handle the error accordingly
        toast.error("Price must be a Number");
        return; // Stop further execution
      }
    if (tags.length) {
      
      const formData = {
        title: data.Title,
        description: data.description,
        price: data.price,
        tags: tags,
      };
      setFormData(formData);
      setstep(step+1);
      setOpenModal(true);
      setImageUrl(false);
      

    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[4px] border-bodydark bg-primary-body p-10 "
    >
      <div className="flex flex-col space-y-2">
        <label
          className="text-sm text-richblack-900 font-bold"
          htmlFor="courseTitle"
        >
          Course Title<sup className="text-red-600">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("Title", { required: true })}
          className="form-style font-bold w-full"
        />
        {errors.Title && (
          <span className="ml-2 tracking-wide text-red-600 font-bold text-sm">
            Course Title is Required**
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label
          className="text-sm text-richblack-900 font-bold"
          htmlFor="courseShortDesc"
        >
          Course Short Description<sup className="text-red-600">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("description", { required: true })}
          className="form-style font-bold resize-x-none min-h-[130px] w-full"
        />
        {errors.description && (
          <span className="ml-2 tracking-wide font-bold text-sm text-red-600">
            Course Description is required**
          </span>
        )}
      </div>

      <div className="relative flex flex-col space-y-2">
        <label
          className="text-sm text-richblack-900 font-bold"
          htmlFor="coursePrice"
        >
          Course Price<sup className="text-red-600">*</sup>
        </label>
        <input
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("price", {
            required: true,
            valueAsNumber: true,
          })}
          className="form-style font-bold w-full !pl-12"
        />
        <HiOutlineCurrencyRupee
          size={30}
          className="mt-[11px] ml-2 absolute top-7 text-richblack-400"
        />
        {errors.price && (
          <span className="ml-2 tracking-wide text-red-600 font-bold text-sm">
            Course Price is Required**
          </span>
        )}
      </div>

      {/* Handling tags input */}
      <Tag
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        tags={tags}
        setTags={setTags}
      />
      {isTagInputEmpty && (
        <span className="ml-2 tracking-wide text-red-600 font-bold text-sm">
          Tags are Required**
        </span>
      )}
      {/* {errors && (
        <span className="ml-2 tracking-wide text-red-600 font-bold text-sm">
          Tags are Required**
        </span>
      )} */}
      <div className="flex justify-end gap-x-2">

        <Btn type={"submit"}  className={`bg-yellow-500 `} text={"Continue to CourseBuilder"} />
      </div>
    </form>
  );
};

export default Info;
