"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/app/lib/utils"
import HamburgerButton from "../core/hamburger";
import Image from 'next/image';
import { useCookies } from "next-client-cookies";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"

import {
  Accordion as OuterAccordion,
  AccordionContent as OuterAccordionContent,
  AccordionItem as OuterAccordionItem,
  AccordionTrigger as OuterAccordionTrigger,
} from "@/app/components/ui/accordion"

import {
  Accordion as InnerAccordion,
  AccordionContent as InnerAccordionContent,
  AccordionItem as InnerAccordionItem,
  AccordionTrigger as InnerAccordionTrigger,
} from "@/app/components/ui/accordion"
import axios from "axios";




const fetchUserDetails = async (authToken) => {
  try {
    const response = await axios.post("/api/verifytoken", {
      token: authToken,
    });
    return response.data.decodedToken;
  } catch (error) {
    console.error(error);
  }
}


const isTokenValid = async (authToken) => {
  const result = await fetchUserDetails(authToken);
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return currentTime < result.exp;
};


const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const show = useRef();
  const overlay = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHamburgurMenuOpen, setIsHamburgurMenuOpen] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  const cookieStore = useCookies();
  const authToken = cookieStore.get('authtoken');

  useEffect(() => {
    if (authToken) {
      isTokenValid(authToken).then((data) => {
        setTokenValid(data);
      });
    }
    console.log("Token Valid: ", tokenValid);
  }, [tokenValid]);

  // Handle navbar scroll
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
      <Link href={`/search/${searchValue}`}></Link>;
      setSearchValue("");
    }
  };

  const [sublinks, setsublinks] = useState([]);

  const redirects = ["Home", "About", "Courses", "Contact Us", "Login"];
  const menuItems = [
    "Category1",
    ["Category2", ["Sub Cat 1", "Sub Cat 2"]],
    "Category3",
    ["Category4", ["Sub Cat 1", "Sub Cat 2"]],
  ];

  return (
    <div
      className={`flex sm:relative bg-[#1F1E20] w-screen relative z-50 h-[64px] items-center justify-evenly border-b-[4px] border-b-primary-yellow translate-y- transition-all duration-500 py-[10px]`}
    >
      <div className="flex w-11/12 h-full max-w-maxContent items-center justify-between">
        {/* SkillVerse Logo */}
        <Link href="/" className="text-richblack-25 font-bold text-2xl">
          <Image
            src="/skillverse.png"
            alt="website logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>

        {/* Searchbar Desktop */}
        <form className="hidden md:flex w-[calc(100%-340px)] rounded-full mx-auto px-10 justify-center z-999999">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative w-full lg:w-fit">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
              className={cn(
                "block w-full h-[40px] rounded-full lg:w-[520px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50",
                "focus:ring-transparent focus:border-transparent dark:bg-gray-700 dark:border-gray-600",
                "dark:placeholder-gray-400 dark:text-white"
              )}
              placeholder="Search Courses, Tags, Instructors..."
              required
            />
          </div>
        </form>

        {/* Search Mobile */}
        <div className="flex flex-row justify-center items-center z-999999">
          <div className="flex md:hidden relative pt-[4px] w-[calc(100%-340px)] h-10 px-5 justify-end items-center">
            <div className="ps-3 hover:cursor-pointer" onClick={() => setIsSearchOpen(true)}>
              <svg
                className="w-4 h-4 text-white"
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
          </div>

          {/* Hamburger Button */}
          <div
            className="pt-2 sm:hidden" // Ensure the hamburger button is visible on mobile
            onClick={() => {
              console.log("Hamburger button clicked");
              setIsHamburgurMenuOpen(!isHamburgurMenuOpen);
            }}
          >
            <HamburgerButton twClass="sm:hidden" />
          </div>

          {/* Redirect buttons */}
          <div className="hidden sm:flex flex-row space-x-3 font-bold w-[325px]">
            {redirects.map((item, index) => (
              <div key={index}>
                {item !== "Catalogs" ? (
                  <Link
                    href={
                      item === "About"
                        ? "/aboutus"
                        : item === "Courses"
                          ? "/courses"
                          : item === "Contact Us"
                            ? "/contactus"
                            : item === "Login" && !tokenValid
                              ? "/login"
                              : item === "Dashboard" && tokenValid
                                ? "/dashboard"
                                : "/"
                    }
                  >
                    <div className="text-white hover:text-primary-yellow transition-colors duration-200">
                      {item}
                    </div>
                  </Link>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button variant="outline" className="text-white">
                        {item}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white cursor-pointer overflow-auto max-h-[50vh]">
                      {menuItems.map((item, index) =>
                        Array.isArray(item) ? (
                          <DropdownMenuGroup key={index}>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger className="cursor-pointer">
                                {item[0]}
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent className="bg-white overflow-auto max-h-[50vh]">
                                  {item[1].map((subItem, subIndex) => (
                                    <DropdownMenuItem key={subIndex} className="cursor-pointer">
                                      {subItem}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          </DropdownMenuGroup>
                        ) : (
                          <DropdownMenuItem key={index} className="cursor-pointer">
                            {item}
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-999999 flex flex-col items-center justify-start">
          <div className="flex flex-row w-full px-10 space-x-5 h-[60px] border-b-2 border-grey">
            <input
              type="search"
              id="default-search"
              className={cn(
                "block w-full h-full text-md sm:text-lg text-gray-900 border border-transparent",
                "focus:ring-transparent focus:border-transparent dark:bg-gray-700 dark:border-gray-600",
                "dark:placeholder-gray-400 dark:text-white"
              )}
              placeholder="Search Courses, Tags, Instructors..."
              required
            />
            <button onClick={() => setIsSearchOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Hamburger Menu */}
      {isHamburgurMenuOpen && (
        <div className="sm:hidden px-3 pt-5 text-white text-lg space-y-5 fixed top-0 right-0 h-full max-w-[300px] w-full bg-[#1F1E20] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100 z-999 flex flex-col">
          <OuterAccordion type="single" collapsible className="cursor-pointer">
            {redirects.map((item, index) => (
              <div key={index}>
                {item !== "Courses" ? (
                  <Link
                    href={
                      item === "About"
                        ? "/aboutus"
                        : item === "Courses"
                          ? "/courses"
                          : item === "Contact Us"
                            ? "/contactus"
                            : item === "Login"
                              ? "/login"
                              : "/"
                    }
                  >
                    <div className="text-white font-bold text-xl h-[60px] flex items-center hover:text-primary-yellow transition-colors duration-200">
                      {item}
                    </div>
                  </Link>
                ) : (
                  <OuterAccordionItem value="catalogs" className="border-none">
                    <OuterAccordionTrigger className="font-bold text-xl">
                      Courses
                    </OuterAccordionTrigger>
                    <OuterAccordionContent className="pl-4">
                      <InnerAccordion type="single" collapsible>
                        {menuItems.map((item, index) =>
                          Array.isArray(item) ? (
                            <InnerAccordionItem key={index} value={`item-${index}`} className="border-none">
                              <InnerAccordionTrigger className="font-bold">
                                {item[0]}
                              </InnerAccordionTrigger>
                              <InnerAccordionContent className="pl-4">
                                {item[1].map((subItem, subIndex) => (
                                  <p className="font-semibold" key={subIndex}>
                                    {subItem}
                                  </p>
                                ))}
                              </InnerAccordionContent>
                            </InnerAccordionItem>
                          ) : (
                            <p key={index} className="font-bold text-white">
                              {item}
                            </p>
                          )
                        )}
                      </InnerAccordion>
                    </OuterAccordionContent>
                  </OuterAccordionItem>
                )}
              </div>
            ))}
          </OuterAccordion>
        </div>
      )}
    </div>
  );
};

export default Navbar;
