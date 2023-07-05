import React from 'react'
import CTAButton from './CTAButton'
import HighLightText from './HighLightText'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({position, heading, subheading, backgroundGradient, codeColor, ctabtn1, ctabtn2, codeblock}) => {

  return (
    <div className={`flex flex-row ${position} my-20 justify-between gap-10`}>
    {/* Section 1 */}
    <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='font-semibold text-richblack-200'>
            {subheading}
        </div>

        <div className=' flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
              <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
                <AiOutlineArrowLeft/>
              </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              {ctabtn2.btnText}
            </CTAButton>
        </div>
    </div>

    {/* Section 2 */}
    <div className='flex flex-row h-fit w-[100%] py-4 lg:w-[500px]  '>
      {/* BG gradient */}
      <div className='text-center felx-col w-[10%] text-richblack-400 font-inter font-bold'>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
      </div>

      <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
        <TypeAnimation 
          sequence={[codeblock, 2000, ""]}
          repeat={Infinity}
          cursor={true}
          style={
            {
              whiteSpace: "pre-line",
              display: "block"
            }
          }
          omitDeletionAnimation={true}
        />
      </div>
    </div>
    </div>
  )
}

export default CodeBlocks