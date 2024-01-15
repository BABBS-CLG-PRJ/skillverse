"use client";
import randomColor from "randomcolor";
import { ApexOptions } from "apexcharts";
import React, { useState ,useEffect} from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const ElearningChart: React.FC = () => {
const [chartData, setChartData] = useState<{
  series: { name: string; data: number[] }[];
  options: ApexOptions;
}>({
  series: [
    {
      name: "Data Science Essentials",
      data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 45, 40],
    },
    {
      name: "Cybersecurity Fundamentals",
      data: [8, 12, 15, 20, 25, 30, 28, 22, 18, 15, 12, 10],
    },
    {
      name: "Artificial Intelligence Concepts",
      data: [25, 30, 35, 40, 45, 50, 55, 60, 55, 50, 45, 40],
    },
    {
      name: "Blockchain Fundamentals",
      data: [30, 28, 25, 22, 20, 18, 15, 12, 10, 8, 5, 2],
    },
  ],
  options: {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
  
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 100,
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
    series: prevData.series.map((item, index) => ({
      ...item,
      color: newColors[index],
    })),
  }));
}, []); // Empty dependency array ensures this effect runs only once on mount

// NextJS Requirement
const isWindowAvailable = () => typeof window !== "undefined";

if (!isWindowAvailable()) return <></>;


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
              <p className="font-semibold text-secondary">Total Revenue</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
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
            type="area"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ElearningChart;
