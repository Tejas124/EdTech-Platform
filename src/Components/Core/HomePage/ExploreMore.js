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
        <div className='text-4xl font-semibold font-inter text-center'>
            Unlock the 
            <HighLightText text={" Power of Code"}/>
        </div>

        <p className='text-richblack-300 text-center text-base font-medium mt-3'>Learn to Build Anything You Can Imagine</p>

        <div className='flex gap-1 justify-center rounded-full bg-richblack-800 px-1 py-1 mt-7 mb-7'>
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

        <div className='lg:h-[150px]'></div>

        {/* Course card ka group */}

        <div className='absolute flex gap-10 justify-between w-full '>
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