import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import ChartOne from "../components/Charts/ChartOne";
import ChartThree from "../components/Charts/ChartThree";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "My Courses | Skillverse Instructor Dashboard",
  description:
    "Explore and manage your courses on the Skillverse Instructor Dashboard.",
};

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="My Courses" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />

        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
