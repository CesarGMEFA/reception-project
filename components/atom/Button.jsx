import React from 'react'

const Button = ({ type, addValue, addClass }) => {
  return (
    <input type={type} value={addValue} className={`${addClass} bg-zinc-600 w-20 mx-auto mt-5 px-5 py-2 text-white font-bold cursor-pointer hover:bg-zinc-800 active:bg-black`}/>
  )
}

export default Button