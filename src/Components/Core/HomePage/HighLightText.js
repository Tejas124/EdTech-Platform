import React from 'react'
import "./HighLightText.css";

const HighLightText = ({text}) => {
  return (
    <span className='highlighted_text font-bold'>
        {" "}
        {text}
    </span>
  )
}

export default HighLightText