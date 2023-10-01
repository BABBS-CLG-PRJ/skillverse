//Author:Supratik De//
import React from 'react'

function HighlightText({text}) {
  return (
    <span className='bg-gradient-to-b from-[#ff0606] via-[#fa5412] to-[#def604] text-transparent bg-clip-text font-bold text-[50px]'>
        {" "}
        {text}
    </span>
  )
}
  
export default HighlightText