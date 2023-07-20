import React from 'react'
import HighLightText from '../HomePage/HighLightText'


const Quote = () => {
  return (
    <div>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighLightText text={"combines technology"}/>
        {","}
        <span className='bg-gradient-to-bl from-[#FF512F] to-[#F09819] font-bold text-transparent bg-clip-text'>
          {" "}
          expertise
        </span>
        , and community to create an
        <span className='bg-gradient-to-bl from-[#E65C00] to-[#F9D423] font-bold text-transparent bg-clip-text'>
          {" "}
          unparalleled educational experience.
        </span>

    </div>
  )
}

export default Quote