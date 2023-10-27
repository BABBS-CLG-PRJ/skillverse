import React from 'react'
import  {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import { useState } from 'react';
import CourseCard from './CourseCard';


const tabsName = [
    "Free",
    "New to Photography",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const SupraSlider = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);


    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
       
    }


  return (
    <div >

      <div className='text-3xl font-bold text-center lg:text-4xl'>
        Unlock the 
        <HighlightText text={"Power of Learning"} />
      </div>

      <p className='text-center text-richblack-700 font-bold text-xl mt-3'>
        Learn to build anything you can imagine
      </p>  

      <div className='mt-5 flex flex-row rounded-lg bg-primary-body mb-3 border-[#652429] border-2
      px-1 py-1 lg:p-4'>
      {
        tabsName.map( (element,index) => {
            return (
                <div
                className={` text-[13px] lg:text-[16px] flex flex-row items-center gap-2 
                ${currentTab === element 
                ? "bg-primary-yellow text-richblack-900 font-bold text-lg lg:text-xl"
                : " font-semibold" } rounded-lg transition-all duration-200 cursor-pointer
                hover:bg-primary-yellow hover:text-richblack-900 hover:mx-2 text-center px-3 py-1 lg:px-7 lg:py-2`}
                key={index}
                onClick={() => setMyCards(element)}
                >
                    {element}
                </div>
            )
        })
      }

      </div>


      {/* course card  */}

      <div className=' flex gap-9 w-full justify-center mt-5 flex-wrap lg:absolute right-0 left-0 mr-auto ml-auto'>
        {
            courses.map(  (element,index) => {
                return (
                    <CourseCard 
                    key={index}
                    cardData = {element}
                    />
                )
            } )
        }
      </div>


    </div>
  )
}

export default SupraSlider
