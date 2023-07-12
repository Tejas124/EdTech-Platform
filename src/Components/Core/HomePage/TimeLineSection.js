import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png"
 
const timeLine = [
    {
        Logo: logo1,
        Heading: "Leadership",
        Description: "Fully commited to the success of the company"
    },
    {
        Logo: logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority"
    },
    {
        Logo: logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills"
    },
    {
        Logo: logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution"
    }

]

const TimeLineSection = () => {
  return (
    <div>
        <div className='flex gap-10 items-center'>

            <div className='w-[45%] flex flex-col gap-7'>
                {
                    timeLine?.map( (element, index) => {
                        return(
                            <div className='flex flex-row gap-6 md:gap-4' key={index}>
                                <div className='w-[50px] h-[50px] md:w-[35px] md:h-[35px] bg-white flex items-center justify-center rounded-full'>
                                    <img src={element.Logo} alt='logo' className='md:w-[15px] md:h-[24px]'/>
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px] md:text-[16px]'>{element.Heading}</h2>
                                    <p className='text-base md:text-[14px] '>{element.Description}</p>
                                </div>

                            </div>
                        )
                    })
                }

            </div>

            <div className='relative shadow-blue-200'>

                <img 
                    src={timelineImage} 
                    alt='timelineImage'
                    className='shadow-white object-cover md:w-[300px] md:h-[300px]'
                />

                <div className='flex justify-center '>
                    <div className='absolute bg-caribbeangreen-700 flex md:flex-col md:gap-8 text-white uppercase p-10 md:p-6 translate-y-[-50%] md:w-[200px] md:h-[150px]'>

                        <div className='flex items-center gap-5 border-r md:border-0 border-caribbeangreen-300 px-7 md:p-0'>
                            <p className='text-3xl md:text-[28px] font-bold'>10</p>
                            <p className="text-caribbeangreen-300 text-sm">Years <br></br> Experiences</p>
                            
                        </div>

                        <div className='flex gap-5 items-center px-7 md:p-0'>
                        <p className='text-3xl md:text-[28px] font-bold'>250</p>
                            <p className="text-caribbeangreen-300 text-sm">Types of <br/> courses</p>

                        </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default TimeLineSection;