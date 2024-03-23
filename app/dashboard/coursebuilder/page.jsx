import React from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import CourseForm from "../components/CourseForm/index"
const page = () => {
  
  return (
    <>
      <Breadcrumb pageName="CourseBuilder" />
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-900 dark:text-white">
            Add Course
          </h1>
        <CourseForm/>
        </div>
        <div class="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-primary-body p-6 xl:block">
          <p class="mb-8 text-lg text-richblack-900 font-bold">
            ✌ Helpful Pointers for Uploading Courses
          </p>
          <ul class="ml-5 list-item list-disc space-y-4 text-richblack-900 font-bold text-sm">
            <li>
              Consider adding supplementary resources to enrich your course
              content.
            </li>
            <li>
              Regularly update course materials to keep them relevant and
              engaging.
            </li>
            <li>
              Encourage student interaction through discussion forums or live
              Q&A sessions.
            </li>
            <li>
              Provide clear learning objectives to guide students through the
              course.
            </li>
            <li>
              Include practical exercises or assignments to reinforce learning
              concepts.
            </li>
            <li>
              Optimize course metadata for better search engine visibility and
              discoverability.
            </li>
            <li>
              Offer discounts or promotions to attract more students to your
              course.
            </li>
            <li>
              Seek feedback from enrolled students to continuously improve the
              course experience.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default page;
