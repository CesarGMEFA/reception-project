import Link from 'next/link'

import { BsStopwatch } from 'react-icons/bs'
import { ImEye } from 'react-icons/im'
import { AiOutlineFilePdf } from 'react-icons/ai'

import { getDeliveryTime } from '../../utils/getDeliveryTime'

const ListItem = ({ data }) => {
	let color;
	const dateDelivery = getDeliveryTime(new Date(), data.delivery_time)

	switch (data.status) {
		case "reparación":
			color = "text-blue-600";
			break;
		case "no reparado":
			color = "text-red-600";
			break;
		case "entregado":
			color = "text-green-600";
			break;
		
		default:
			break;
	}

  return (
    <>
      <section className='grid grid-cols-5 gap-1 tablet:gap-3 w-full tablet:max-w-[700px]  bg-white py-4 px-4 my-1 border-b-2 rounded'>
				<div className='col-[1/4] row-span-1 mobile:col-span-2'>
					<span>#: {data.id}</span>
					<span className={`ml-4 w-28 font-medium ${color}`}>
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
				<div className='underline col-[5/6]  mobile:col-[6] mobile:row-span-1 justify-self-end'>
					<Link href={`/recepcion/${data.id}`}>
						<a target="_blanket" className='hover:text-blue-800 ml-2'>
							<span className='mr-2'>
								ver
							</span>
							<ImEye className='inline-block mr-2 cursor-pointer' />
						</a>
					</Link>
				</div>
			</section>
    </>
  )
}

export default ListItem