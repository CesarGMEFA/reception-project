import React from 'react'

const ServicePriceInput = ({ addOrder, service, setService, price, setPrice }) => {
  return (
		<section className='col-span-full tablet:col-[3/7] flex flex-col'>
			<div className='mb-3 flex flex-wrap'>
				<p className='flex justify-center items-center mr-2'>
					<label htmlFor='service'>
						Service:
						<br />
						<input
							className='mobile:w-72
								text-base font-normal text-gray-700
        			bg-white bg-clip-padding
        				border border-solid border-gray-300 rounded
        				transition ease-in-out
        				px-2 py-1 m-0
        			focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							type='text'
							id='service'
							step='.01'
							value={service}
							onChange={(e) => setService(e.target.value)}
						/>
					</label>
				</p>
				<p className='flex justify-center items-center'>
					<label htmlFor='price'>
						Price:
						<br />
						<input
							className='w-20
								text-base font-normal text-gray-700
        			bg-white bg-clip-padding
        				border border-solid border-gray-300 rounded
        				transition ease-in-out
        				px-2 py-1 m-0
        			focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							type='number'
							id='price'
							pattern='[0-9]+'
							// step='.01'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</label>
				</p>
			</div>
			<button
				className='bg-green-500 text-white py-1 w-20'
				type='button'
				onClick={() => addOrder()}
			>
				Add
			</button>
		</section>
  );
}

export default ServicePriceInput