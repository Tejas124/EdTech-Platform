import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineArrowRight} from 'react-icons/ai'
import HighLightText from '../Components/Core/HomePage/HighLightText'
import CTAButton from '../Components/Core/HomePage/CTAButton'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../Components/Core/HomePage/CodeBlocks'

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative max-w-maxContent flex mx-auto flex-col w-11/12 items-center text-white justify-between'>

            <Link to={"/signup"}>
                <div className='mx-auto rounded-full mt-16 p-1 bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 group'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[] group-hover: bg-richblack-900 transition-all duration-200 '>
                        <p>Become an Instructor</p>
                        <AiOutlineArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighLightText text={"Coding Skills"}/>
            </div>

            <div className='w-[90%] text-center text-richblack-200 mt-4'>
                <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Book a demo
                </CTAButton>
            </div>

            <div className='shadow-blue-200 mx-3 my-14'>
                <video className=''
                muted
                loop
                autoPlay>
                    <source src={Banner} type='video/mp4'></source>
                </video>
            </div>


            {/* Code Section 1 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className=''>
                            Unlock
                        </div>
                    }
                />
            </div>
        </div>

        {/* Section 2 */}

        {/* Section 3 */}

        {/* Section 4 */}

        {/* Footer */}
    </div>
  )
}

export default Home