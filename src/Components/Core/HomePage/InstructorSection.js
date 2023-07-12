import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighLightText from './HighLightText'
import CTAButton from './CTAButton'
import { AiOutlineArrowRight } from 'react-icons/ai'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex gap-20 items-center'>

            <div className='w-[50%]'>
                <img
                    src={Instructor}
                    alt='Instructor'
                    className='shadow shadow-white'
                />
            </div>

            <div className='w-[50%] flex flex-col gap-5'>

                <div className='text-4xl md:text-3xl font-inter font-semibold w-[50%]'>
                    Become an 
                    <HighLightText text={"Instructor"}/>
                </div>

                <p className='font-medium text-base w-[90%] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                <div className='mt-10 w-fit text-base font-inter font-weight: 500'>
                    <CTAButton active={true}>
                        <div className='flex gap-3 items-center'>
                            <p>Start Teaching Today</p>
                            <AiOutlineArrowRight/>
                        </div>
                    </CTAButton>
                </div>

            </div>
        </div>
    </div>
  )
}

export default InstructorSection