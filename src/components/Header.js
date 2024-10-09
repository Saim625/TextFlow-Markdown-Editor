import React from 'react'
import  LOGO from "../TEXTFLAIR.png"
const Header = () => {
  return (
    <div className='flex justify-center bg-gray-100'>
        <img  className='w-48 h-20 object-cover' alt='logo' src={LOGO}/>
    </div>
  )
}

export default Header