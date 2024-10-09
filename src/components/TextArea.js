import React from 'react'
import { setInputText } from '../utils/textSlice'
import { useDispatch, useSelector } from 'react-redux'

const TextArea = () => {
  const dispatch = useDispatch();
  const inputText = useSelector((store)=> store.text.inputText)
  return (
    <div className='flex w-full flex-col sm:flex-row'>
      <textarea
        className='p-2 m-2 rounded border h-96 sm:w-1/2'
        placeholder='Enter your text here...'
        value={inputText}
        onChange={(e)=> dispatch(setInputText(e.target.value))}
      ></textarea>

       <textarea
        className='p-2 m-2 rounded border h-96 sm:w-1/2 bg-gray-100'
        placeholder='Formatted text'
        value={inputText}
        readOnly
      ></textarea>
    </div>
  )
}

export default TextArea