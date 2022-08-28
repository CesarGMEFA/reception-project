import React from 'react'

const Inputs = ({register, label, type, f, onChange, classN}) => {
  return (
    <p className='mb-3 flex justify-center flex-col items-center'>
      <label htmlFor={f}>{label}:<br />
        <input className={`${classN} mt-1 px-2 py-1`} type={type} {...register(f)} id={f} onChange={onChange} autoComplete="true" required/>
      </label>
    </p>
  )
}

export default Inputs