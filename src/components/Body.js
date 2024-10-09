import React from 'react'
import "../style.css"
import Options from "./Options"
import TextArea from "./TextArea"
const Body = () => {
  return (
    <div className="bg-gray-50">
    <div className="flex flex-col items-center justify-center h-96 bg-transparent">
      <h1 className="text-5xl font-bold mb-4 animate-slide-in-left">TextFlair</h1>
      <p className="text-xl text-gray-700 text-center animate-slide-in-right">Turn your plain text into beautiful Markdown effortlessly.</p>
      </div>
      <Options/>
      <TextArea/>
    </div>
  )
}

export default Body;