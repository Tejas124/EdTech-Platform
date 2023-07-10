import React from 'react'
import HighLightText from './HighLightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.svg'
import compare_with_others from '../../../assets/Images/Compare_with_others.svg'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div className=' mt-24 mb-28'>
      <div className='flex flex-col gap-8'>
        <div className='text-4xl font-inter font-semibold text-center text-richblack-900'>
          Your Swiss Knife for 
          <HighLightText text={" Learning any Language"}/>
        </div>

        <div className=' w-[70%] text-center text-richblack-700 mx-auto text-base'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='mx-auto w-[90%]  mt-5'>
            <div className=' flex justify-center items-center'>

              <img 
                src={know_your_progress}
                alt='Know your progress'
                className=' object-cover -mr-36'
              />

              <img 
                src={compare_with_others}
                alt='compare with others'
                className='object-cover'
              />

              <img 
                src={plan_your_lessons}
                alt='plan your lessons'
                className=' object-cover -ml-36'
              />          
            </div>
        </div>

        <div className=' w-fit mx-auto'>
          <CTAButton active={true} linkto={'/signup'}>
            <div className=' text-richblack-900 font-inter text-base'>
                Learn More
            </div>
          </CTAButton>
        </div>


      </div>
    </div>
  )
}

export default LearningLanguageSection