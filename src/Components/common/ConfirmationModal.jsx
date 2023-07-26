import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({modaalData}) => {
  return (
    <div>
        <div>
            <p>
                {modaalData.text1}
            </p>

            <p>
                {modaalData.text2}
            </p>

            <div>
                <IconButton 
                    onclick={modaalData?.btn1Handler}
                    text={modaalData?.btn1Text}
                />

                <button onClick={modaalData?.btn2Handler}>
                    {modaalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal