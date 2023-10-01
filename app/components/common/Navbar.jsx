//Author:Supratik De//
"use client";
import React from "react";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef } from "react";
import { HiSearch } from "react-icons/hi"; 
import { useSelector } from "react-redux";  
import { TiShoppingCart } from "react-icons/ti";
import { Drawer } from "flowbite";
import Link from "next/link";
// import Head from "next/head";
import SwipeableTemporaryDrawer from "./Hamburger";
const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const show = useRef();
  const overlay = useRef();

  const shownav = () => {
    show.current.classList.toggle("navshow");
    overlay.current.classList.toggle("hidden");
  };
  //handeling navbar scroll
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handelSearch = (e) => {
    e.preventDefault();
    if (searchValue?.length > 0) {
      <Link href="/search/${searchValue}"></Link>;
      setSearchValue("");
    }
  };
  const [sublinks, setsublinks] = useState([]);
  return (
    <div
      className={` flex sm:relative bg-slate-950
     w-screen relative z-50 h-14 items-center justify-evenly border-b-[6px] border-b-primary-yellow translate-y-  transition-all duration-500 py-[40px]`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* SkillVerse Logo */}
        <Link href="/" className=" text-richblack-25 font-bold text-2xl ">
          Logo
        </Link>
        {/* Nav Links */}
        <ul className="flex-row gap-x-14 text-richblack-25 hidden md:flex items-center text-lg font-bold">
          {/* Home */}
          <li>
            <Link href="/">Home</Link>
          </li>
          {/* About Us */}
          <li>
            <Link href="/AboutUs">About Us</Link>
          </li>
          {/* Catalog */}
          <li>
            <Link href="/Catalog">
              <div className=" flex items-center group relative cursor-pointer">
                <p>Catalog</p>
                <svg
                  width="25px"
                  height="20px"
                  viewBox="0 0 24.00 24.00"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(0)"
                  stroke="#000000"
                  strokeWidth="0.00024000000000000003"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="0.384"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>

                <div
                  className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 
                                            group-hover:visible 
                                            group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                >
                  <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                  {sublinks?.length < 0 ? (
                    <div></div>
                  ) : (
                    sublinks?.map((element, index) => (
                      <Link
                        to={`/catalog/${element?.name}`}
                        key={index}
                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                      >
                        <p className="">{element?.name}</p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </Link>
          </li>
          {/* Contact Us */}
          <li>
            <Link href="/ContactUs">Contact Us</Link>
          </li>
          {/* Search Bar */}
          <li>
            {/* <form onSubmit={handelSearch} className='flex items-center relative'>
                            <input value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} id='searchinput' type="text" placeholder="Search" className=' absolute top-0 left-0 border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 text-[15px] w-28 text-richblack-50 focus:outline-none focus:border-transparent bg-richblack-700' />
                            <HiSearch type='submit' id='searchicon' size={20} className=" text-richblack-100 top-1 absolute cursor-pointer left-20" />
                        </form> */}
            <form onSubmit={handelSearch}>
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search ..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </li>
        </ul>
        {/* Buttons Log in and Sign Up */}
        <div className="flex-row gap-5 hidden md:flex items-center">
          <Link href="/LogIn">
            <div className="buttons">
              <button className="btn-hover color-9">Login</button>
            </div>
          </Link>
          <Link href="/SignUp">
            <div className="buttons">
              <button className="btn-hover color-9">Sign Up</button>
            </div>
          </Link>
        </div>
        {/* Hamburger Button */}
        <div className="md:hidden text-white">
                  <SwipeableTemporaryDrawer/>
                  
        </div>
      </div>
    </div>
  );
};

export default Navbar;
