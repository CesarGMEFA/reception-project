import { v4 } from 'uuid';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { useState } from 'react';

import { Toaster } from 'react-hot-toast';

import { notifySucess, notifyError } from '../../utils/notify';

import { deleteUserStaff } from '../../pages/api/deleteUserStaff';
import { supabase } from '../../utils/supabaseClient';

export default function UserStaff({ users }) {
  const [staff, setStaff] = useState(users)

  const deleteUser = async (id, userId) => {
		try {
			const newData = staff.filter( user => user.id !== id)
			setStaff([...newData])
			console.log('staff', staff)
			const { data, error: e } = await deleteUserStaff(userId)
			const { d, error } = await supabase
			.from('profiles')
			.delete()
			.eq('userId', userId)
			if (e) {
				notifyError()
				throw e
			}
			if (error) {
				notifyError()
				throw error
			}

			notifySucess()
			console.log('data =>', data)
			console.log('d =>', d)
		} catch(error) {
			alert(error.message || error.description)
			console.log('error', error)
		}
  }

	return (
		<section className='UserStaff h-72 border border-black overflow-y-scroll'>
			{staff &&
				staff.map((user) => (
					<article className='p-2 border-b-[1px] border-gray-500 flex flex-wrap' key={v4()}>
						<div className='mx-2 w-36'>
							<p>usuario: {user.username}</p>
							<p>role: {user.role}</p>
						</div>
						<div className='mx-2 w-60'>
							<p>email: {user.email}</p>
							<p>contrase&ntilde;a: {user.password}</p>
						</div>
						<div className='mx-2 my-1 ml-auto flex flex-nowrap items-center justify-center'>
							<i
								className='bg-blue-600 mx-1 p-2 inline-block rounded cursor-pointer 
            hover:bg-blue-500'
							>
								<FaPencilAlt className='text-xs text-white' />
							</i>
							<i
								className='bg-red-600 mx-1 p-2 inline-block rounded cursor-pointer
              hover:bg-red-500'
                onClick={() => deleteUser(user.id, user.userId)}
							>
								<FaTrashAlt className='text-xs text-white' />
							</i>
						</div>
					</article>
				))}
				<Toaster />
		</section>
	);
}
