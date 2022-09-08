import { FaTrashAlt } from 'react-icons/fa'

function RowModelsColors({ features, deleteTag }) {
  return (
		<div
			key={features}
			className='flex items-center justify-between bg-white border-b py-4 px-6'
		>
			<span className=''>{features}</span>
			<i
				className='bg-red-600 py-1 px-2 ml-3 rounded cursor-pointer'
				onClick={() => deleteTag(features)}
			>
				<FaTrashAlt className='text-xs text-white' />
			</i>
		</div>
  );
}

export default RowModelsColors