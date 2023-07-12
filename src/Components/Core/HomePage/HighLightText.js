import React from 'react'

const HighLightText = ({text}) => {
  return (
    <span className='bg-gradient-to-bl from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] font-bold text-transparent bg-clip-text'>
        {" "}
        {text}
    </span>
  )
}

export default HighLightText