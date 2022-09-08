import React from 'react'

import { MdAdd } from 'react-icons/md'

function InputTag({register}) {
  return (
		<React.Fragment>
			<input
				className='px-3 py-1 m-0 mr-2
          text-base font-normal text-gray-700
        bg-white bg-clip-padding
          border border-solid border-gray-300 rounded
          transition ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
				type='text'
				placeholder='Add'
				{...register}
			/>
			<button
				type='submit'
				className='col-span-full bg-green-600 py-1.5 px-4 rounded cursor-pointer'
			>
				<MdAdd className='text-lg text-white' />
			</button>
		</React.Fragment>
  );
}

export default InputTag