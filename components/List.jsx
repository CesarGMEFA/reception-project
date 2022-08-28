import { BsStopwatch } from 'react-icons/bs'
import { ImEye } from 'react-icons/im'
import { AiOutlineFilePdf } from 'react-icons/ai'

import { supabase } from '../utils/supabaseClient'

const List = () => {

	async function a() {
		let { data: clients, error } = await supabase
			.from('clients')
			.select('first_name,last_name,identity')
		console.log(clients)
	}
	a()
  return (
		<section>
			<section className='w-full flex flex-wrap justify-around items-center bg-gray-200 p-4 mx-6 border-b-2 border-gray-400'>
				<div>
          <span>id: 1</span>
					<span className='mx-4 text-red-600 font-medium'>
						Repacaci&oacute;n
					</span>
				</div>
        <div>
          <span className='mr-4'>Andres J</span>
					<span>iphone 8</span>
        </div>
				<div>
          <BsStopwatch className='inline-block' />
					<span className='ml-2'>3 horas</span>
					<ImEye className='inline-block mx-4' />
					<AiOutlineFilePdf className='inline-block' />
				</div>
			</section>

			<section className='w-full flex flex-wrap justify-around items-center bg-gray-200 p-4 mx-6 border-b-2 border-gray-400'>
				<div>
          <span>id: 1</span>
					<span className='mx-4 text-blue-600 font-medium'>
						Entregado
					</span>
				</div>
        <div>
          <span className='mr-4'>Alejandra W</span>
					<span>iphone 8</span>
        </div>
				<div>
					<BsStopwatch className='inline-block' />
					<span className='ml-2'>3 horas</span>
					<ImEye className='inline-block mx-4' />
					<AiOutlineFilePdf className='inline-block' />
				</div>
			</section>
		</section>
  );
}

export default List