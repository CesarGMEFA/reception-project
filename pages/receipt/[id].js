import { useState, useEffect } from "react"
import { format } from "date-fns"
import { v4 } from "uuid"
import { useForm } from "react-hook-form"
import Layout from "../../layout/Layout"

import { getDataId, getPaths } from '../../services/getPaths'
import { supabase } from "../../utils/supabaseClient"

const ReceiptIdPage = ({ receipt }) => {
	const [pieces, setPieces] = useState("Sin accesorios")
	const [services, setServices] = useState([])
	const [notes, setNotes] = useState(null)
	const [total, setTotal] = useState(0)

	const { register, handleSubmit, formState: {error: errorForm} } = useForm()

	const data = receipt.data

	useEffect(() => {
		if (data.pieces) {
			let p = data.pieces.filter( item => item !== null).join(' / ')
			setPieces(p)
		}

		for (let i = 0; i < data.order.length; i++) {
			services.push(JSON.parse(data.order[i]))
		}

		let t = services.reduce((acum, e) => acum + Number(e.price), 0)
		setTotal(t)
	}, [])

	const created = format(new Date(data.created_at), 'dd/MM/yyyy')

	if (errorForm) throw errorForm

	const onSubmit = async ({note}) => {
		const { data: sending, error } = await supabase
			.from('notes')
			.insert([
				{ note: note, IDreceipt: receipt.id },
			])
		if (error) throw error
		console.log('data', sending)
	}
	console.log('receipt', receipt)
	useEffect(() => {
		const { data, error } = supabase.from("notes")
																	.select("created_at, note")
																	.eq("IDreceipt", receipt.id)
		if (error) throw error
		console.log('note', data)
	}, [])

  return (
		<Layout>
			<section className="flex flex-row flex-wrap self-start tablet:w-[90%] tablet:max-w-[1200px]">
				<section className='bg-white rounded-lg p-6 font-medium w-full min-h-min tablet:max-w-[68%]'>
					<section className='flex justify-between tablet:max-w-[1000px]'>
						<p>ID: {receipt.id}</p>
						<p>Created: {created}</p>
					</section>
					<section className='flex justify-between flex-wrap'>
						<div className='mt-4'>
							<p>Name: {data.name}</p>
							<p>Identity: {data.identity}</p>
							<p>Email: {data.email}</p>
							<p>Date of birth: {data.date_birth}</p>
							<p>Phone number: {data.phone_number}</p>
						</div>
						<div className='mt-4'>
							<p>Brand: {data.brand}</p>
							<p>Model: {data.model}</p>
							<p>Color: {data.color}</p>
							<p>Received: {data.received}</p>
							<p>Technical: {data.technical}</p>
						</div>
					</section>
					<section>
						<p className='my-2'>Entregado con: {pieces} </p>
						<p>Description:</p>
						<p className='border-2 border-black rounded-lg min-h-[150px] p-2'>
							{data.description}
						</p>
					</section>
					<section className='mt-2'>
						<p>Service:</p>
						{services.map((s) => (
							<p key={v4()}>
								{s.service} {s.price}$
							</p>
						))}
						<p className='text-xl mt-2'>Total: {total}$</p>
					</section>
				</section>
				<section className='bg-white rounded-lg p-6 mt-4 font-medium w-full tablet:mt-0 tablet:max-w-[30%] tablet:ml-1'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<textarea
							className='w-full h-32 mobile:h-32 mt-3 rounded border-black border-2 p-1 resize-none'
							{...register("note")}
							maxLength={600}
						/>
						<input
							type="submit"
							className="cursor-pointer px-6 py-2.5
							bg-blue-600
							text-white font-medium text-xs
							leading-tight
							uppercase
							rounded
							shadow-md
							hover:bg-blue-700 hover:shadow-lg
							focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
							transition
							duration-150
							ease-in-out"
						/>
					</form>
					<div className="mt-3">
						<p>
							lorem asjdfsdklfkla rqweurqwe0r asjdfasdlkfjafjkla afjkdaskldjfklasdfj
						</p>
						<p className="text-zinc-500">
							Creado: 03/09/2022 4:47
						</p>
					</div>
				</section>
			</section>
		</Layout>
  );
}

export default ReceiptIdPage

export async function getStaticPaths() {
	const paths = await getPaths()
	
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const receipt = await getDataId(params.id)
	
	return {
		props: {
			receipt
		}
	};
}
