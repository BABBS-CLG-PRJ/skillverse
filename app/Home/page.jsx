
"use client";
import Image from "next/image";
// import Head from "next/head";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Hero from "../assets/Images/hero.png";
import Herobg from "../assets/Images/hero-bg.png";
export default function Home() {
  return (
    <div>
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="hero__title mx-8">
          Your gateway to a bright future begins here
          </h1>
          <p className="hero__subtitle mx-8">
          Let's begin your journey with our well designed set of courses and up-skill you to be corporate ready. Boosting confidence with guided projects, aptitude, email writings and creative generative AI solutions.
          </p>
          <button
            disabled={false}
            type={"button"}
            className="custom-btn bg-primary-yellow text-black text-xl font-bold rounded-full mt-10 mb-5 ml-5
            p-8
            tansition all duration-700 hover:scale-95 hover:bg-primary-blue hover:text-white hover:text-xl
            "
          >
            <span className={"flex-1"}>Explore Courses</span>
          </button>
        </div> 
        <div className="hero__image-container overflow-hidden relative">
          <div className="hero__image">
            <Image
              src={Hero}
              alt="Hero Image"
              fill
              className="object-contain "
            />
          </div>

          <Image
            src={Herobg}
            alt="Hero BackGround"
            className="absolute xl:-top-24 xl:-right-1/2 -right-1/4  bg-repeat-round -z-10 w-full xl:h-screen h-[590px] xl:mt-24 xl:mr-72  "
          />
        </div>
      </div>
    </div>
  );
}
