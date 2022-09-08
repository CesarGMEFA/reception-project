import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'

const HeaderAdds = ({ children, onPrev, onNext}) => {
  return (
		<div className='bg-gray-200 w-44 py-1 px-4 mb-2 rounded-lg flex justify-between items-center'>
			<button
				type='button'
				onClick={onPrev}
				className='text-blue-600 bg-white'
			>
				<BsFillArrowLeftSquareFill />
			</button>
			<span className='font-semibold text-xl'>
				{children}
			</span>
			<button
				type='button'
				onClick={onNext}
				className='text-blue-600 bg-white'
			>
				<BsFillArrowRightSquareFill />
			</button>
		</div>
  );
}

export default HeaderAdds