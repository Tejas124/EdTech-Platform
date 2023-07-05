import React from 'react'

const HighLightText = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
        {" "}
        {text}
    </span>
  )
}

export default HighLightText