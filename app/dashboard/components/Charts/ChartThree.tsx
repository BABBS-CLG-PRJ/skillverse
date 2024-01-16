'use client'
import randomColor from "randomcolor";
import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ElearningChart: React.FC = () => {
  const [chartData, setChartData] = useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: [25, 30, 20, 15], // Sample data for donut chart
    options: {
      legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
      },
      colors: ["#3C50E0", "#80CAEE", "#4CAF50", "#FFC107"],
      chart: {
        fontFamily: "Satoshi, sans-serif",
        type: "donut",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
       
        style: {
          colors: ['#F44336', '#E91E63', '#9C27B0','#000']
        }
      },
      labels: ["Data Science", "Cybersecurity", "AI Concepts", "Blockchain"],
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
          },
        },
      },
      
      
    },
  });

  // Function to generate random colors and update state on component mount
  useEffect(() => {
    const newColors = Array.from({ length: chartData.series.length }, () =>
      randomColor()
    );

    setChartData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        colors: newColors,
      },
    }));
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // NextJS Requirement
  const isWindowAvailable = () => typeof window !== "undefined";

  if (!isWindowAvailable()) return <></>;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Course Analytics</p>
             
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5 h-[355px] w-[105%]">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ElearningChart;
