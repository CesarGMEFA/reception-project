import Link from 'next/link'
import * as duration from 'duration-fns'
import { BsStopwatch } from 'react-icons/bs'
import { ImEye } from 'react-icons/im'
import { AiOutlineFilePdf } from 'react-icons/ai'

import { getDeliveryTime } from '../../utils/getDeliveryTime'

const ListItem = ({ data }) => {

	const dateDelivery = getDeliveryTime(data.created_at, data.delivery_time)

  return (
    <>
      <section className='grid grid-cols-5 gap-1 tablet:gap-3 w-full tablet:max-w-[700px] bg-white py-4 px-4 my-1 border-b-2 rounded'>
				<div className='col-[1/4] row-span-1 mobile:col-span-2'>
					<span>#: {data.id}</span>
					<span className='ml-4 w-28 text-blue-600 font-medium'>
						{data.status}
					</span>
				</div>
				<div className='col-[1/5] row-[2/3] mobile:row-span-1 mobile:col-[3/5]'>
					<span className='mr-4'>{data.name}</span>
					<span>{data.model}</span>
				</div>
				<div className='col-[4/6] mobile:col-[5] mobile:row-span-1 justify-self-end'>
					<BsStopwatch className='inline-block' />
					<span className='ml-2'>{dateDelivery}</span>
				</div>
				<div className='col-[5/6]  mobile:col-[6] mobile:row-span-1 justify-self-end'>
					<Link href={`/receipt/${data.id}`}>
						<a target="_blanket">
							<ImEye className='inline-block mr-2 cursor-pointer' />
						</a>
					</Link>
					<AiOutlineFilePdf className='inline-block cursor-pointer' />
				</div>
			</section>
    </>
  )
}

export default ListItem


{/* <section className='grid grid-cols-5 gap-1 tablet:gap-3 w-full tablet:max-w-[700px] bg-white py-4 px-4 my-1 border-b-2 rounded'>
	<div className='col-[1/4] row-span-1 mobile:col-span-2'>
		<span>#: 1706</span>
		<span className='ml-4 w-28 text-green-600 font-medium'>
			delivered
		</span>
	</div>
	<div className='col-[1/5] row-[2/3] mobile:row-span-1 mobile:col-[3/5]'>
		<span className='mr-4'>Johanna T</span>
		<span>iphone X</span>
	</div>
	<div className='col-[4/6] mobile:col-[5] mobile:row-span-1 justify-self-end'>
		<BsStopwatch className='inline-block' />
		<span className='ml-2'>30 minutos</span>
	</div>
	<div className='col-[5/6]  mobile:col-[6] mobile:row-span-1 justify-self-end'>
		<ImEye className='inline-block mr-2' />
		<AiOutlineFilePdf className='inline-block' />
	</div>
</section>

<section className='grid grid-cols-5 gap-1 tablet:gap-3 w-full tablet:max-w-[700px] bg-white py-4 px-4 my-1 border-b-2 rounded'>
	<div className='col-[1/4] row-span-1 mobile:col-span-2'>
		<span>#: 34</span>
		<span className='ml-4 w-28 text-red-600 font-medium'>
			Undelivered
		</span>
	</div>
	<div className='col-[1/5] row-[2/3] mobile:row-span-1 mobile:col-[3/5]'>
		<span className='mr-4'>Theodore R</span>
		<span>iphone 13 pro</span>
	</div>
	<div className='col-[4/6] mobile:col-[5] mobile:row-span-1 justify-self-end'>
		<BsStopwatch className='inline-block' />
		<span className='ml-2'>5 horas</span>
	</div>
	<div className='col-[5/6]  mobile:col-[6] mobile:row-span-1 justify-self-end'>
		<ImEye className='inline-block mr-2' />
		<AiOutlineFilePdf className='inline-block' />
	</div>
</section> */}