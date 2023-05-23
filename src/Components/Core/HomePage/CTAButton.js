import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] rounded
          `}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton