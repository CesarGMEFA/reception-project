import React from 'react'

const ReceivedTechnical = ({ register }) => {
  return (
		<section className='col-span-full tablet:col-[1/3]'>
			<label className='block'>Who received the client: </label>
			<select
				{...register("received", { required: true })}
				className='bg-white w-52 h-8 mb-2 
					bg-clip-padding
					border border-solid border-gray-300
					rounded'
				placeholder='Who received the client'
			>
				<option value='Santa Claus'>Santa Claus</option>
				<option value='Fiona Talbot'>Fiona Talbot</option>
			</select>
			<br />
			<label className='block'>Technical: </label>
			<select
				{...register("technical", { required: true })}
				className='bg-white w-52 h-8
					bg-clip-padding
					border border-solid border-gray-300
					rounded'
				placeholder='Who received the client'
			>
				<option value='Snowflake'>Snowflake</option>
				<option value='Buddy'>Buddy</option>
				<option value='Merry'>Merry</option>
				<option value='Lola'>Lola</option>
			</select>
		</section>
  );
}

export default ReceivedTechnical