import { v4 } from 'uuid';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { useState } from 'react';


export default function UserStaff({ users }) {
  const [staff, setStaff] = useState(users)

  const deleteUser = (id) => {
    const newData = staff.filter( user => user.id !== id)
    setStaff([...newData])
  }

	return (
		<section className='h-72 border border-black overflow-y-scroll'>
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
                onClick={() => deleteUser(user.id)}
							>
								<FaTrashAlt className='text-xs text-white' />
							</i>
						</div>
					</article>
				))}
		</section>
	);
}
