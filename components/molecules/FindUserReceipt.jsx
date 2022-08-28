import React from 'react'

const FindUserReceipt = ({ register, userSelected }) => {
  return (
		<section className='col-span-full grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 '>
			<p className='flex justify-center items-center'>
				<label htmlFor='name'>
					Name:
					<br />
					<input
						className='mt-1 px-2 py-1'
						type='text'
						id='name'
						// {userSelected[0].name && value={userSelected[0].name}}
						disabled={true}
						{...register("name")}
					/>
				</label>
			</p>
			<p className='flex justify-center items-center'>
				<label htmlFor='identity'>
					Identity:
					<br />
					<input
						className='mt-1 px-2 py-1'
						type='text'
						id='identity'
						disabled={true}
						{...register("identity")}
					/>
				</label>
			</p>
			<p className='flex justify-center items-center'>
				<label htmlFor='phone_number'>
					Phone Number:
					<br />
					<input
						className='mt-1 px-2 py-1'
						type='text'
						id='phone_number'
						disabled={true}
						{...register("phone_number")}
					/>
				</label>
			</p>
			<p className='flex justify-center items-center'>
				<label htmlFor='email'>
					Email:
					<br />
					<input
						className='mt-1 px-2 py-1'
						type='text'
						id='email'
						disabled={true}
						{...register("email")}
					/>
				</label>
			</p>
			<p className='flex justify-center items-center'>
				<label htmlFor='date_birth'>
					Date Birth:
					<br />
					<input
						className='mt-1 px-2 py-1'
						type='text'
						id='date_birth'
						disabled={true}
						{...register("date_birth")}
					/>
				</label>
			</p>
		</section>
  );
}

export default FindUserReceipt