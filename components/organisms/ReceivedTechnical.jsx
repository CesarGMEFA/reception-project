import React from 'react'

const ReceivedTechnical = ({ register }) => {
  return (
		<section className='received-technical'>
			<label>Who received the client: </label>
			<select
				{...register("received", { required: true })}
				className='bg-white w-52 h-8 mb-2'
				placeholder='Who received the client'
			>
				<option value='Santa Claus'>Santa Claus</option>
				<option value='Fiona Talbot'>Fiona Talbot</option>
			</select>
			<br />
			<label>Technical: </label>
			<select
				{...register("technical", { required: true })}
				className='bg-white w-52 h-8'
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