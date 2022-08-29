import { GrFormSearch } from 'react-icons/gr'

import Loader from '../atom/Loader';

const ReceiptSearch = ({ search, loadingSearch, setSearch, getClient, clientsPrepared, v4 }) => {
  return (
		<p className='flex justify-center items-center'>
			<label htmlFor='search'>
				Search:
				<br />
				<input
					className='mt-1 px-2 py-1 text-base
					font-normal
					text-gray-700
					bg-white bg-clip-padding
					border border-solid border-gray-300
					rounded
					transition
					ease-in-out
					m-0
					focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					type='text'
					id='search'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					list='browsers'
				/>
			</label>
			<button
				type='button'
				onClick={getClient}
				className='bg-green-500 rounded text-white text-2xl p-1 ml-2 self-end'
			>
				{!loadingSearch ? <GrFormSearch /> : <Loader />}
			</button>
			<datalist id='browsers'>
				{search.length > 2 &&
					clientsPrepared.map((user) => (
						<option value={user.client} key={v4()} />
					))}
			</datalist>
		</p>
  );
}

export default ReceiptSearch