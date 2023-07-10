import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineArrowRight} from 'react-icons/ai'
import HighLightText from '../Components/Core/HomePage/HighLightText'
import CTAButton from '../Components/Core/HomePage/CTAButton'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../Components/Core/HomePage/CodeBlocks'
import TimeLineSection from '../Components/Core/HomePage/TimeLineSection'
import LearningLanguageSection from '../Components/Core/HomePage/LearningLanguageSection'
import InstructorSection from '../Components/Core/HomePage/InstructorSection'
import ExploreMore from '../Components/Core/HomePage/ExploreMore'
import Footer from '../Components/common/Footer'

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative max-w-maxContent flex mx-auto flex-col w-10/12 items-center text-white justify-between mt-16'>

            <Link to={"/signup"}>
                <div className='group mx-auto rounded-full py-0.5 bg-richblack-800 font-inter font-medium text-lg text-richblack-200 transition-all duration-200 hover:scale-95  w-fit'>
                    <div className='flex items-center gap-2 rounded-full px-8 py-2  group-hover:bg-richblack-900 transition-all duration-200 '>
                        <p>Become an Instructor</p>
                        <AiOutlineArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighLightText text={"Coding Skills"}/>
            </div>

            <div className='w-[80%] text-center text-richblack-200 mt-4'>
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

            <div className='  mx-3 my-14'>
                <video className='shadow-2xl shadow-blue-200 '
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
                        <div className='text-4xl font-semibold'>
                            Unlock Your 
                            <HighLightText text={"coding potential"}/>
                            {" "}with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true

                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false

                        }
                    }
                    codeColor={"text-yellow-25"}
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}

                />
            </div>

            {/* Code Section 2 */}
             <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start {" "}
                            <HighLightText text={"coding"}/>
                            <br/>
                            <HighLightText text={" in seconds"}/>
                            
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true

                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false

                        }
                    }
                    codeColor={"text-yellow-25"}
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}

                />
            </div>

            <ExploreMore /> 
        </div>

        {/* Section 2 */}
        <div className=' bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[300px]'>
                <div className='w-10/12 max-w-maxContent flex gap-5 justify-center mx-auto'>

                    <div className='flex gap-10 text-white  mt-40'>
                            
                            <CTAButton active={true} linkto={"/signup"} >
                                <div className='flex gap-5 items-center'>
                                    Explore Full Catalog
                                    <AiOutlineArrowRight/>
                                </div>
                                
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn More    
                                </div>
                            </CTAButton>
                    </div>

                </div>
            </div>

            <div className='w-10/12 mx-auto flex flex-col max-w-maxContent items-center justify-between gap-10'>
                    <div className='flex flex-row gap-10 mt-24 mb-24'>
                        <div className='text-4xl font-semibold font-inter w-[50%]'>
                            Get the Skills you need for a 
                            <HighLightText text={"job that is in demand"}/>
                        </div>

                        <div className='w-[50%] flex flex-col gap-10'>
                            <p className='text-richblack-700 font-inter text-base font-medium'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </p>

                            <div className=' max-w-max'>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div className=' font-inter font-bold text-[16px]'>
                                    Learn More
                                    </div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>

                    <TimeLineSection/>

                    <LearningLanguageSection/>
            </div>

            

            
        </div>

        {/* Section 3 */}

        <div className='w-10/12 mx-auto max-w-maxContent flex flex-col items-center justify-between
                        gap-8 bg-richblack-900 text-white'>
            
            <InstructorSection/>

            <h2 className='text-4xl text-center font-semibold mt-10'>Reviews from other learners</h2>

            {/* Review Slider here */}

        </div>

        {/* Section 4 */}

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default Home