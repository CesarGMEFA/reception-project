import { Fragment, useEffect, useState } from "react";
import { v4 } from "uuid";

const CentralFromReceipt = ({ register, molds, brand, setBrand }) => {
	const [toShow, setToShow] = useState(undefined);

	console.log(brand);

	useEffect(() => {
		const a = molds.find((obj) => obj.brand === brand);
		setToShow(a);
	}, [brand]);

	return (
		<Fragment>
			<input
				list='b'
				{...register("brand", { required: true })}
				onChange={(e) => setBrand(e.target.value)}
				className="col-span-full mobile:col-[1/4] tablet:col-[1/3]
				text-base font-normal text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300 rounded
        transition ease-in-out
        px-2 py-1 m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
			/>
			<datalist id='b'>
				{molds.map((m) => (
					<option key={v4()} value={m.brand}>
						{m.brand}
					</option>
				))}
			</datalist>
			<select
				{...register("model", { required: true })}
				className='bg-white w-52 h-8 col-span-full mobile:col-[4/7] tablet:col-[3/5]
					bg-clip-padding
					border border-solid border-gray-300
					rounded'
				disabled={toShow ? false : true}
			>
				{toShow ? (
					<>
						<option value=''>Select model</option>
						{toShow.model.map( m => <option key={v4()} value={m}>{m}</option> )}			
					</>
				) : (
					<>
						<option value=''>Select a brand</option>
					</>
				)}
			</select>
			<select
				{...register("color", { required: true })}
				className='bg-white w-52 h-8 col-span-full mobile:col-[1/4] tablet:col-[5/7]
					bg-clip-padding
					border border-solid border-gray-300
					rounded'
				disabled={toShow ? false : true}
			>
				{toShow ? (
					<>
						<option value=''>Select color</option>
						{toShow.color.map( m => <option key={v4()} value={m}>{m}</option> )}			
					</>
				) : (
					<>
						<option value=''>Select a brand</option>
					</>
				)}
			</select>
			<textarea
				className='col-span-full h-72 mobile:h-52 mt-3 rounded border-black border-2 p-1 resize-none'
				{...register("description")}
				placeholder='Description'
			/>
		</Fragment>
	);
};

export default CentralFromReceipt;
