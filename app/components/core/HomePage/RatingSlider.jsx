import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ratings from "../../../assets/Images/rating.svg";
import Image from "next/image";
import RatingStars from '../../common/RatingStars';
const RatingSlider = () => {
  const Reviews = [
    {
      image: ratings,
      firstName: "Mithun",
      lastName: "Chakroborty",
      courseName: "Acting course",
      review:
        "A program at the Corvallis-Benton County Public Library where a reviewer with expertise on a book's topic or theme explores the book in depth. The program is held on the second Wednesday of each month from September through June.",
      rating: "1.4",
    },
    {
      image: ratings,
      firstName: "Mithun",
      lastName: "Chakroborty",
      courseName: "Acting course",
      review:
        "A program at the Corvallis-Benton County Public Library where a reviewer with expertise on a book's topic or theme explores the book in depth. The program is held on the second Wednesday of each month from September through June.",
      rating: "1.4",
    },
    {
      image: ratings,
      firstName: "Mithun",
      lastName: "Chakroborty",
      courseName: "Acting course",
      review:
        "A program at the Corvallis-Benton County Public Library where a reviewer with expertise on a book's topic or theme explores the book in depth. The program is held on the second Wednesday of each month from September through June.",
      rating: "1.4",
    },
    {
      image: ratings,
      firstName: "Mithun",
      lastName: "Chakroborty",
      courseName: "Acting course",
      review:
        "A program at the Corvallis-Benton County Public Library where a reviewer with expertise on a book's topic or theme explores the book in depth. The program is held on the second Wednesday of each month from September through June.",
      rating: "3.4",
    },
    {
      image: ratings,
      firstName: "Mithun",
      lastName: "Chakroborty",
      courseName: "Acting course",
      review:
        "A program at the Corvallis-Benton County Public Library where a reviewer with expertise on a book's topic or theme explores the book in depth. The program is held on the second Wednesday of each month from September through June.",
      rating: "3.4",
    },
    {
      image: ratings,
      firstName: "Mithun",
      lastName: "Chakroborty",
      courseName: "Acting course",
      review:
        "A program at the Corvallis-Benton County Public Library where a reviewer with expertise on a book's topic or theme explores the book in depth. The program is held on the second Wednesday of each month from September through June.",
      rating: "3.4",
    },
    {
      image: ratings,
      firstName: "Mithun",
      lastName: "Chakroborty",
      courseName: "Acting course",
      review:
        "A program at the Corvallis-Benton County Public Library where a reviewer with expertise on a book's topic or theme explores the book in depth. The program is held on the second Wednesday of each month from September through June.",
      rating: "3.4",
    },
    // Add more review objects here
  ];
  return (
    <div>
     <Swiper
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          
        }}
        
    
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
            300: { slidesPerView: 1.1, spaceBetween: 10 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.1 },
          }}
      >

        {Reviews.map((Review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-3 min-h-[150px] bg-primary-body border-primary-violet border-2 p-3 text-[14px] rounded-md">
              <div className="flex items-center gap-4">
                <Image
                  src={Review.image}
                  alt="user"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-richblack-900">
                    {Review.firstName} {Review.lastName}
                  </h3>
                  <p className="text-[12px] font-medium text-richblack-900">
                    {Review.courseName}
                  </p>
                </div>
              </div>
              <div className="font-medium text-richblack-900 ">
                {Review.review.slice(0, 250)}...
              </div>
              <RatingStars  Review_Count={Review.rating}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RatingSlider;
