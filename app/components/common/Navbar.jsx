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
import { Button, Input } from "@mui/material";
import { TextInput } from "flowbite-react";
import { cn } from "@/app/lib/utils"
import HamburgerButton from "../core/hamburger";
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


const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const show = useRef();
  const overlay = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHamburgurMenuOpen, setIsHamburgurMenuOpen] = useState(false)

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

  

  const redirects = ["Home", "About", "Catalogs", "Contact Us"];
  const menuItems = [
    'Category1',
    ['Category2', ['Sub Cat 1', 'Sub Cat 2']],
    'Category3',
    ['Category4', ['Sub Cat 1', 'Sub Cat 2']],
    // Add more items as needed
  ];
  return (
    <div
      className={` flex sm:relative bg-[#1F1E20]
     w-screen relative z-50 h-[64px] items-center justify-evenly border-b-[4px] border-b-primary-yellow translate-y-  transition-all duration-500 py-[10px]`}
    >
      <div className="flex w-11/12 h-full max-w-maxContent items-center justify-between">
        {/* SkillVerse Logo */}
        <Link href="/" className=" text-richblack-25 font-bold text-2xl ">
          Logo
        </Link>

        {/* Searchbar Desktop */}
        <form className="hidden md:flex  w-[calc(100%-340px)] rounded-full mx-auto px-10   justify-center">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative  w-full lg:w-fit ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className={cn(
              "block w-full h-[40px]  rounded-full lg:w-[520px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50",
              "focus:ring-transparent focus:border-transparent dark:bg-gray-700 dark:border-gray-600",
              " dark:placeholder-gray-400 dark:text-white "
            )} placeholder="Search Courses, Tags, Instructors..." required />
          </div>
        </form>
        {/* Search Mobile */}
        <div className="flex flex-row justify-center items-center">
          <div className="flex md:hidden relative pt-[4px] w-[calc(100%-340px)] h-10 px-5 justify-end items-center">
            <div className=" ps-3 hover:cursor-pointer " onClick={() => setIsSearchOpen(true)}>
              <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
          </div>
          {/* Hamburger Button */}
          <div 
          className="pt-2"
          onClick={() => {
            console.log("hellos")
            setIsHamburgurMenuOpen(!isHamburgurMenuOpen);
          }} >
            <div className="sm:hidden">
              <HamburgerButton twClass="sm:hidden" />
            </div>
          </div>


          {/* Redirect buttons */}
          <div className="hidden sm:flex flex-row space-x-3 font-bold w-[280px] ">
            {redirects.map((item, index) =>
              <div key={index}>
                {item !== 'Catalogs'
                  ? <div className="text-white" onClick={() => item === 'Catalogs' && setIsDropdownOpen(!isDropdownOpen)}>
                    {item}
                  </div>
                  : <DropdownMenu >
                    <DropdownMenuTrigger asChild >
                      <button variant="outline" className="text-white">{item}</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white cursor-pointer overflow-auto max-h-[50vh]">
                      {menuItems.map((item, index) => Array.isArray(item) ? (
                        <DropdownMenuGroup key={index}>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="cursor-pointer">{item[0]}</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="bg-white overflow-auto max-h-[50vh]">
                                {item[1].map((subItem, subIndex) => (
                                  <DropdownMenuItem key={subIndex} className="cursor-pointer">{subItem}</DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                      ) : (
                        <DropdownMenuItem key={index} className="cursor-pointer">{item}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>}
              </div>
            )}
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-999999 flex flex-col items-center justify-start ">
          <div className="flex flex-row w-full px-10 space-x-5  h-[60px] border-b-2 border-grey">
            <input type="search" id="default-search" className={cn(
              "block w-full h-full  text-md sm:text-lg text-gray-900 border border-transparent ",
              "focus:ring-transparent focus:border-transparent dark:bg-gray-700 dark:border-gray-600",
              " dark:placeholder-gray-400 dark:text-white "
            )} placeholder="Search Courses, Tags, Instructors..." required />
            <button className="" onClick={() => setIsSearchOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

          </div>
          {/* ... rest of your content ... */}
        </div>
      )}
      {/* Hamburger menu */}
      {isHamburgurMenuOpen && (
        <div className="sm:hidden px-3 pt-5 text-white text-lg font-semibold space-y-5 fixed top-[64px] right-0 h-[calc(100vh-64px)] max-w-[300px] w-full bg-[#1F1E20] z-40 flex flex-col">
          <OuterAccordion type="single" collapsible className="cursor-pointer ">
            {redirects.map((item, index) =>
              <div key={index}>
                {item !== 'Catalogs'
                  ? <div className="text-white h-[60px] flex  items-center" onClick={() => item === 'Catalogs' && setIsDropdownOpen(!isDropdownOpen)}>
                    {item}
                  </div>
                  : <OuterAccordionItem value="catalogs" className="border-none ">
                    <OuterAccordionTrigger>Catalogs</OuterAccordionTrigger>
                    <OuterAccordionContent className="pl-4">
                      <InnerAccordion type="single" collapsible >
                        {menuItems.map((item, index) => Array.isArray(item) ? (
                          <InnerAccordionItem key={index} value={`item-${index}`} className="border-none ">
                            <InnerAccordionTrigger>{item[0]}</InnerAccordionTrigger>
                            <InnerAccordionContent className="pl-4">
                              {item[1].map((subItem, subIndex) => (
                                <p key={subIndex}>{subItem}</p>
                              ))}
                            </InnerAccordionContent>
                          </InnerAccordionItem>
                        ) : (
                          <p key={index} className="font-semibold text-white">{item}</p>
                        ))}
                      </InnerAccordion>
                    </OuterAccordionContent>
                  </OuterAccordionItem>}
              </div>
            )}
          </OuterAccordion>
        </div>
      )}
    </div>
  );
};

export default Navbar;
