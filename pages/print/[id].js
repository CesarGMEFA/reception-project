import React, { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { v4 } from 'uuid';

// Component to print
import { ComponentToPrint } from '../../components/organisms/ComponentToPrint';

// Services
import { getDataId, getPaths } from '../../services/getPaths'

// Utils
import { formatDate } from '../../utils/formatDate';


function PrintReceipt({ receipt }) {
	const [services, setServices] = useState([])
	const [pieces, setPieces] = useState("Sin accesorios")
	const [total, setTotal] = useState(0)
	
	const data = receipt.data
	const created = formatDate(data.created_at)

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

	const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
	})
	// const handlePrint = () => window.print()

  return (
		<div>
			<ComponentToPrint
				ref={componentRef}
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
  );
};

export default PrintReceipt;


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