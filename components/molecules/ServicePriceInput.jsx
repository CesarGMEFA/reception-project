import React from 'react'

const ServicePriceInput = ({ addOrder, service, setService, price, setPrice }) => {
  return (
		<section className='col-span-2 flex flex-col'>
			<div className='mb-3 flex'>
				<p className='flex justify-center items-center mr-2'>
					<label htmlFor='service'>
						Service:
						<br />
						<input
							className='mt-1 px-2 py-1 w-72'
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
							className='mt-1 px-2 py-1 w-20'
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