import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] rounded-md px-6 py-3 font-bold
        ${active ? "bg-yellow-50 text-black shadow-[2px_2px_0px_0px_rgba(255,249,112)]" : "bg-richblack-800 shadow-[2px_2px_0px_0px_rgba(88,93,105)]"}
        hover:scale-95 transition-all duration-200 hover:font-bold
          `}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton