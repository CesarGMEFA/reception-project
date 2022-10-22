import { useState, useEffect, useContext, memo } from 'react';

import ListItem from './molecules/ListItem'

import ProfileContext from '../utils/context/ProfileContext';

const List = ({ allData }) => {
	const [currentPage, setCurrentPage] = useState(0)
	const [numberOfItems, setNumberOfItems] = useState(6)
	const [search, setSearch] = useState("")

	const { profile } = useContext(ProfileContext)

	const filteredReceiptsList = () => {

		if ( search === 0 )
			return allData.slice(currentPage, currentPage + 6)

		const filtered = allData.filter( receipt => receipt.name.includes(search) || receipt.identity.includes(search))
		return filtered.slice(currentPage, currentPage + 6)
	}

	const onSearchChange = ({ target }) => {
		setCurrentPage(0)
		setSearch( target.value )
	}

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage( currentPage - 6)
		}
	}
	
	const conditionNextPage = allData.filter( receipt => receipt.name.includes(search) || receipt.identity.includes(search))
	const nextPage = () => {
		if (conditionNextPage.length > currentPage + 6)
		setCurrentPage(currentPage + 6)
	}

	const lengthOfArrayData = allData.length
	
	useEffect(() => {
		if (currentPage + 6 > lengthOfArrayData) {
			const sumUltimated = lengthOfArrayData - currentPage
			setNumberOfItems(currentPage + sumUltimated)
		} else {
			setNumberOfItems(currentPage + 6)
		}
	}, [prevPage, nextPage])

  return (
		<section className='flex flex-col items-center self-start'>
			<section>
				<input 
					className="self-start
						px-3
						py-1.5
						text-base
						font-normal
						text-gray-700
						bg-white bg-clip-padding
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
					type="text"
					placeholder="Buscar"
					value={ search }
					onChange={ onSearchChange }
				/>
				{filteredReceiptsList().map((data) => (
					<ListItem key={data.id} data={data} />
				))}
			</section>
			<section className='mt-3'>
				<button
					type='button'
					className='px-6
							py-2.5
							bg-blue-600
							text-white
							font-medium
							text-xs
							leading-tight
							uppercase
							rounded
							shadow-md
							hover:bg-blue-700 hover:shadow-lg
							focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
							transition
							duration-150
							ease-in-out'
					onClick={prevPage}
				>
					Anteriores
				</button>
				&nbsp;
				{numberOfItems}/{lengthOfArrayData}
				&nbsp;
				<button
					type='button'
					className='px-6
							py-2.5
							bg-blue-600
							text-white
							font-medium
							text-xs
							leading-tight
							uppercase
							rounded
							shadow-md
							hover:bg-blue-700 hover:shadow-lg
							focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
							transition
							duration-150
							ease-in-out'
					onClick={nextPage}
				>
					Siguientes
				</button>
			</section>
		</section>
  );
}

export default memo(List)