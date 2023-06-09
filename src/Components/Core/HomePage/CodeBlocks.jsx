import React from 'react'
import CTAButton from './CTAButton'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({position, heading, subheading, backgroundGradient, codeColor, ctabtn1, ctabtn2, codeblock}) => {

  return (
    <div className={`flex flex-row max-md:flex-wrap ${position} my-20 justify-center gap-24`}>
    {/* Section 1 */}
    <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className=' font-medium text-richblack-300'>
            {subheading}
        </div>

        <div className=' flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
              <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
                <AiOutlineArrowRight/>
              </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              {ctabtn2.btnText}
            </CTAButton>
        </div>
    </div>

    {/* Section 2 */}
    <div className={` flex flex-row h-fit w-[100%] py-4 lg:w-[500px] border border-richblack-700 shadow-inner bg-richblack-800 rounded-sm`}>
      {/* BG gradient */}
      <div className={`${backgroundGradient} absolute h-[200px] w-[400px] rounded-full blur-3xl opacity-20`}></div>
      <div className='text-center flex-col w-[10%] text-richblack-400 font-inter font-bold'>
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