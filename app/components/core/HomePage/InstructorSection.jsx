import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import Instructor from '../../../assets/Images/Instructor.json'
import Lottie from 'lottie-react'
const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col md:flex-row gap-20 items-center'>

        <div className='w-full md:w-1/2'>
          <Lottie animationData={Instructor}/>
        </div>

        <div className='md:w-[50%] flex flex-col gap-10 justify-start'>
            <div className='text-4xl font-bold md:w-[50%]'>
              Transform into an 
                <HighlightText text={"Educator."} />
            </div>

            <p className='text-[16px] w-[80%] text-richblack-900 font-bold text-xl'>
            Skillverse is a global platform that unites instructors from around the world, working to empower and cultivate your passions by educating and enlightening millions of eager learners. We equip you with the necessary tools and skills to effectively teach the subjects that resonate with your heart.
            </p>

            <div className='w-fit '>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Instructing Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection
