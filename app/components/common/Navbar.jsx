"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCookies } from "next-client-cookies";
import axios from "axios";
import HamburgerButton from "../core/hamburger";
import { FaCartPlus } from "react-icons/fa";
import SearchBar from "../common/Searchbar";
import { Accordion } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
// Constants
const NAVIGATION_ITEMS = {
  redirects: ["Home", "About", "Courses", "Contact Us", "Login", "Dashboard"],
  menuItems: [
    "Category1",
    ["Category2", ["Sub Cat 1", "Sub Cat 2"]],
    "Category3",
    ["Category4", ["Sub Cat 1", "Sub Cat 2"]],
  ],
};

// Fetch user details from the server
const fetchUserDetails = async (authToken) => {
  try {
    const response = await axios.post("/api/verifytoken", { token: authToken });
    return response.data.decodedToken;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

const isTokenValid = async (authToken) => {
  const result = await fetchUserDetails(authToken);
  if (!result) return false;
  return Math.floor(Date.now() / 1000) < result.exp;
};

// Subcomponents

const MobileSearchOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-999999 flex flex-col items-center justify-start">
      <div className="flex flex-row w-full px-10 space-x-5 h-[60px] border-b-2 border-grey">
        <SearchBar className="border-transparent text-md sm:text-lg pt-[27px]" placeholder="Search Courses, Tags, Instructors..." />
        <button onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

const getNavigationConfig = (item, tokenValid) => {
  switch (item) {
    case "Home":
      return { path: "/", show: true };
    case "About":
      return { path: "/aboutus", show: true };
    case "Courses":
      return { path: "/courses", show: true };
    case "Contact Us":
      return { path: "/contactus", show: true };
    case "Login":
      return { path: "/login", show: !tokenValid };
    case "Dashboard":
      return { path: "/dashboard", show: tokenValid };
    default:
      return { path: "#", show: false };
  }
};

// Use the function in both the NavigationLinks component and the mobile navigation menu
const NavigationLinks = ({ redirects, tokenValid }) => {
  return (
    <div className="hidden md:flex flex-row space-x-3 font-bold w-[380px]">
      {redirects.map((item, index) => {
        const { path, show } = getNavigationConfig(item, tokenValid);
        if (!show) return null;
        return (
          <Link key={index} href={path}>
            <div className="text-white hover:text-primary-yellow transition-colors duration-200">
              {item}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHamburgurMenuOpen, setIsHamburgurMenuOpen] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const router = useRouter()

  const cookieStore = useCookies();
  const authToken = cookieStore.get("authtoken");

  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cartData);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    if (authToken) {
      isTokenValid(authToken).then(setTokenValid);
    }
  }, [authToken]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(currentScrollPos <= prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div className={`flex sm:relative bg-[#1F1E20] w-screen relative z-50 h-[64px] items-center justify-evenly border-b-[4px] border-b-primary-yellow translate-y- transition-all duration-500 py-[10px]`}>
      <div className="flex w-11/12 h-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-richblack-25 font-bold text-2xl pl-8">
          <Image
            src="/skillverse.png"
            alt="website logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>

        {/* Desktop Search */}
        <form className="hidden md:flex w-[calc(100%-500px)] rounded-full mx-auto  justify-center z-999999">
          <SearchBar placeholder="Search Courses, Tags, Instructors..." />
        </form>

        {/* Navigation */}
        <div className="flex flex-row justify-center items-center z-999999">
          {/* Mobile Search Button */}
          <div className="flex md:hidden relative pt-[4px] w-[calc(100%-340px)] h-10 px-5 justify-end items-center">
            <div className="ps-3 hover:cursor-pointer" onClick={() => setIsSearchOpen(true)}>
              <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
          </div>

          {/* Hamburger Menu Button */}
          <div className="pt-2 md:hidden" onClick={() => setIsHamburgurMenuOpen(!isHamburgurMenuOpen)}>
            <HamburgerButton twClass="md:hidden" />
          </div>

          {/* Navigation Links */}
          <NavigationLinks redirects={NAVIGATION_ITEMS.redirects} tokenValid={tokenValid} />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Navigation Menu */}
      {isHamburgurMenuOpen && (
        <div className="md:hidden px-3 pt-[64px] text-white text-lg space-y-5 fixed top-0 right-0 h-full max-w-[300px] w-full bg-[#1F1E20] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100 z-999 flex flex-col">
          <Accordion type="single" collapsible className="cursor-pointer">
            {NAVIGATION_ITEMS.redirects.map((item, index) => {
              const { path, show } = getNavigationConfig(item, tokenValid);
              if (!show) return null;
              return (
                <Link key={index} href={path}>
                  <div className="text-white font-bold text-xl h-[60px] flex items-center hover:text-primary-yellow transition-colors duration-200">
                    {item}
                  </div>
                </Link>
              );
            })}
          </Accordion>
        </div>
      )}

      {/* Cart Icon */}
      <button
        onClick={() => router.push("/cart")}
        className="relative pr-8 w-[64px] h-full flex flex-col justify-center">
        <div className="absolute z-9999 ">
          <FaCartPlus className="text-white text-2xl cursor-pointer" />
        </div>
        <span className="mr-8 absolute z-99999 top-2 right-0 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-yellow text-white text-xs font-bold w-5 h-5 flex items-center justify-center">
          {cartItems.length}
        </span>
      </button>
    </div>
  );
};

export default Navbar;
