import { Fragment } from 'react'

const CentralFromReceipt = ({ register }) => {
  return (
		<Fragment>
			<select
				{...register("brand", { required: true })}
				className='bg-white w-52 h-8'
			>
				<option value=''>Select brand</option>
				<option value='apple'>Apple</option>
				<option value='samsung'>Samsung</option>
				<option value='motorola'>Motorola</option>
			</select>
			<select
				{...register("model", { required: true })}
				className='bg-white w-52 h-8'
			>
				<option value=''>Select model</option>
				<option value='iphone 8'>iphone 8</option>
				<option value='iphone x'>iphone x</option>
				<option value='iphone 12 plus'>iphone 12 plus</option>
			</select>
			<select
				{...register("color", { required: true })}
				className='bg-white w-52 h-8'
			>
				<option value=''>Select color</option>
				<option value='gray'>Gray</option>
				<option value='gold'>Gold</option>
				<option value='gold rose'>Gold Rose</option>
			</select>
			<textarea
				className='col-span-full h-40 mt-3 rounded border-black border-2 p-1 resize-none'
				{...register("description")}
				placeholder='Description'
			/>
		</Fragment>
  );
}

export default CentralFromReceipt