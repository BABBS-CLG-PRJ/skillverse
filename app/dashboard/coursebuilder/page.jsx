import React from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import Courseform from "../components/common/courseform";

const page = ({ user }) => {
  return (
    <>
      <Breadcrumb pageName="CourseBuilder" />

      <Courseform user={user}/>
    </>
  );
};

export default page;
