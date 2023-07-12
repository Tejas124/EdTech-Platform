import React, { useState} from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Career Path"

];


const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setcurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        console.log(result);
        setCourses(result[0].courses);
        setcurrentCard(result[0].courses[0].heading);
    }


  return (
    <div className=''>
        <div className='text-4xl max-md:text-3xl font-semibold font-inter text-center'>
            Unlock the 
            <HighLightText text={" Power of Code"}/>
        </div>

        <p className='text-richblack-300 text-center text-base font-medium mt-3 mb-3'>Learn to Build Anything You Can Imagine</p>

        <div className='hidden lg:flex gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {
                tabsName.map( (element, index) => {
                    return (
                        <div
                        className={`text-base font-inter flex justify-between items-center gap-5
                        ${currentTab === element 
                        ? "bg-richblack-900 text-richblack-5 font-medium" 
                        : " text-richblack-200" }
                        rounded-full duration-200 transition-all cursor-pointer
                        hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                        key={index}
                        onClick={ () => setMyCards(element)} 
                        >

                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='hidden lg:block lg:h-[300px]'></div>

        {/* Course card ka group */}

        <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[25%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
            {
                courses.map( (element, index) => {
                  return (
                    <CourseCard
                        key={index}
                        cardData = {element}
                        currentCard = {currentCard}
                        setCurrentTab = {setCurrentTab}
                     />
                  )  
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore