import React from 'react'

const IconButton = (
    {text, 
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,}
) => {
  return (
    <button
    disabled={disabled}
    onClick={onclick}
    >
    {
        children ? (
            <>
            <span>
                {text}
            </span>
            {children}
            </>
        ) : (text) 
    }

    </button>
  )
}

export default IconButton