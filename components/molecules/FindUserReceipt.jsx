import React from 'react'

const FindUserReceipt = ({ register }) => {
  return (
		<section className='col-span-full grid grid-cols-6 gap-3 mb-4'>
			<p className='flex justify-center items-center col-span-full mobile:col-[1/4] tablet:col-[1/3]'>
				<label htmlFor='name'>
					Name:
					<br />
					<input
						className='mt-1 px-2 py-1 bg-[#f5f5f5] text-base
						font-normal
						text-gray-700
						bg-clip-padding
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
						type='text'
						id='name'
						disabled={true}
						{...register("name")}
					/>
				</label>
			</p>
			<p className='flex justify-center items-center col-span-full mobile:col-[4/7] tablet:col-[3/5]'>
				<label htmlFor='identity'>
					Identity:
					<br />
					<input
						className='mt-1 px-2 py-1 bg-[#f5f5f5] text-base
						font-normal
						text-gray-700
						bg-clip-padding
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
						type='text'
						id='identity'
						disabled={true}
						{...register("identity")}
					/>
				</label>
			</p>
			<p className='flex justify-center items-center col-span-full mobile:col-[1/4] tablet:col-[5/7]'>
				<label htmlFor='phone_number'>
					Phone Number:
					<br />
					<input
						className='mt-1 px-2 py-1 bg-[#f5f5f5] text-base
						font-normal
						text-gray-700
						bg-clip-padding
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
						type='text'
						id='phone_number'
						disabled={true}
						{...register("phone_number")}
					/>
				</label>
			</p>
			<p className='flex justify-center items-center col-span-full mobile:col-[4/7] tablet:col-[1/3]'>
				<label htmlFor='email'>
					Email:
					<br />
					<input
						className='mt-1 px-2 py-1 bg-[#f5f5f5] text-base
						font-normal
						text-gray-700
						bg-clip-padding
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
						type='text'
						id='email'
						disabled={true}
						{...register("email")}
					/>
				</label>
			</p>
			<p className='flex justify-center items-center col-span-full mobile:col-[1/4] tablet:col-[3/5]'>
				<label htmlFor='date_birth'>
					Date Birth:
					<br />
					<input
						className='mt-1 px-2 py-1 bg-[#f5f5f5] text-base
						font-normal
						text-gray-700
						bg-clip-padding
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
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