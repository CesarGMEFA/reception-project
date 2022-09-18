import { useState, useEffect, useRef } from "react"
import { useReactToPrint } from 'react-to-print'
import { format } from "date-fns"
import { v4 } from "uuid"
import { useForm } from "react-hook-form"
import { Toaster } from "react-hot-toast"

// Layout
import Layout from "../../layout/Layout"

// Component to print
import { ComponentToPrint } from "../../components/organisms/ComponentToPrint"

// Atom components
import Loader from '../../components/atom/Loader'
import Note from "../../components/atom/Note"

// Services
import { getNotes } from "../../services/getNotes"
import { getDataId, getPaths } from '../../services/getPaths'

// Utils
import { formatDate } from "../../utils/formatDate"
import { notifySucess, notifyError } from '../../utils/notify'
import { supabase } from "../../utils/supabaseClient"

const ReceiptIdPage = ({ receipt }) => {
	const [pieces, setPieces] = useState("Sin accesorios")
	const [services, setServices] = useState([])
	const [notes, setNotes] = useState([])
	const [loading, setLoading] = useState(false)
	const [total, setTotal] = useState(0)

	const { register, handleSubmit, setValue, formState: {error: errorForm} } = useForm()
	
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

	const created = formatDate(data.created_at)

	if (errorForm) throw errorForm

	useEffect(() => {
		getNotes(receipt.id)
			.then( (value) => setNotes(value))
			.catch( error => console.error(error))
	}, [])

	useEffect(() => {
		console.log('notes', notes)
	}, [notes])

	const onSubmit = async ( d ) => {
		try {
			setLoading(true)
			const { data: sending, error } = await supabase
				.from('notes')
				.insert([
					{ note: d.notes, IDreceipt: receipt.id },
				])
	
			if (error) {
				notifyError()
				throw error
			}
	
			notifySucess()
			setValue("notes", "")
			setNotes( [...notes, {
				note: sending[0].note,
				created_at: formatDate(sending[0].created_at)
			}])

		} catch(e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}

	const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
		<Layout>
			<section className='flex flex-row flex-wrap justify-center tablet:max-w-[1200px]'>
				<div>
						<div className="hidden" >
							<div ref={componentRef} >
								<ComponentToPrint
									data={data}
									services={services}
									created={created}
									pieces={pieces}
									total={total}
								/>
								<ComponentToPrint
									data={data}
									services={services}
									created={created}
									pieces={pieces}
									total={total}
								/>
							</div>
					</div>
					<ComponentToPrint
						data={data}
						services={services}
						created={created}
						pieces={pieces}
						total={total}
					/>
					<button
						className='bg-green-600 py-1.5 px-4 rounded cursor-pointer 
				text-white font-semibold fixed bottom-0 right-0.5 mx-5 mb-2 w-36'
						onClick={handlePrint}
					>
						Print this page
					</button>
				</div>
				<section className='bg-white rounded-lg p-6 mt-4 font-medium w-full tablet:mt-0 tablet:max-w-[30%] tablet:ml-1'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<textarea
							className='w-full h-32 mobile:h-32 mt-3 rounded border-black border-2 p-1 resize-none'
							{...register("notes")}
							maxLength={600}
						/>
						<button
							type='submit'
							className='cursor-pointer px-6 py-2.5 bg-blue-600
							text-white font-medium text-xs leading-tight uppercase rounded shadow-md
							hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
							transition duration-150 ease-in-out'
						>
							{loading ? <Loader /> : "Send"}
						</button>
					</form>
					{notes &&
						notes.map(({ note, created_at }) => (
							<Note
								key={v4()}
								note={note}
								created_at={created_at}
							/>
						))}
				</section>
				<Toaster />
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