import React from 'react'
import CTAButton from './CTAButton'
import HighLightText from './HighLightText'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const CodeBlocks = ({position, heading, ctabtn1, ctabtn2, codeblock}) => {

  return (
    <div className={`flex flex-row ${position} my-20 justify-between gap-10`}>
    {/* Section 1 */}
    <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='font-bold text-richblack-200'>
            {subheading}
        </div>

        <div className=' flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}></CTAButton>

            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}></CTAButton>
        </div>
    </div>
    </div>
  )
}

export default CodeBlocks