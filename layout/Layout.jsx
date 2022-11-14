import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FaRegListAlt } from 'react-icons/fa'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { FaRegAddressCard } from 'react-icons/fa'
import { AiOutlineBarChart } from 'react-icons/ai'

// import { supabase } from '../utils/supabaseClient'
import { useSupabaseClient } from '@supabase/auth-helpers-react/dist'

import ProfileContext from '../utils/context/ProfileContext'

const Layout = ({children}) => {
	const supabase = useSupabaseClient()
	const { profile, setProfile } = useContext(ProfileContext)
	const router = useRouter()

	const signOut = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if (error) throw error
			router.push('/login')

		} catch (e) {
			alert(e)
		} finally {
			setProfile([])
		}
	}

  return (
		<React.Fragment>
			<header className='flex justify-between items-center fixed w-full bg-white border-gray-200 px-2 sm:px-4 py-6 drop-shadow-lg z-50'>
				{/* <span>Management</span> */}
				{/* <nav className='flex'>
          <span className='mx-4 text-2xl cursor-pointer' title='reception list'><FaRegListAlt /></span>
          <span className='mx-4 text-2xl cursor-pointer' title='create receipt'><AiOutlineFileAdd /></span>
          <span className='mx-4 text-2xl cursor-pointer' title='add costumer'><AiOutlineUserAdd /></span>
        </nav> */}
				<nav className='flex items-center'>
					<Link href='/'>
						<span
							className='mx-2 text-2xl cursor-pointer p-2 rounded hover:bg-gray-300'
							title='lista de recepciones'
						>
							<FaRegListAlt />
						</span>
					</Link>
					<Link href='/recepcion'>
						<span
							className='mx-2 text-2xl cursor-pointer p-2 rounded hover:bg-gray-300'
							title='crear recepcion'
						>
							<AiOutlineFileAdd />
						</span>
					</Link>
					<Link href='/cliente'>
						<span
							className='mx-2 text-2xl cursor-pointer p-2 rounded hover:bg-gray-300'
							title='agregar cliente'
						>
							<AiOutlineUserAdd />
						</span>
					</Link>
					{profile[0] && (
						profile[0].role === "admin" && (
							<>
							<Link href='/agregar'>
								<span
									className='mx-2 text-2xl cursor-pointer p-2 rounded hover:bg-gray-300'
									title='data empleo'
								>
									<FaRegAddressCard />
								</span>
							</Link>
							{/* <span
								className='mx-2 text-2xl cursor-pointer p-2 rounded hover:bg-gray-300'
								title='análisis'
							>
								<AiOutlineBarChart />
							</span> */}
						</>
						)
					)}
				</nav>
				<section>
					{profile[0] && (
						<>
							<p className='inline-block font-bold'>
								{profile[0].username} -
							</p>
							<button
								onClick={signOut}
								className='px-3 py-2.5 ml-1
								bg-red-600
								text-white
								font-medium
								text-xs
								leading-tight
								uppercase
								rounded
								shadow-md
								hover:bg-red-700 hover:shadow-lg
								focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
								transition
								duration-150'
							>
								Cerrar sesi&oacute;n
							</button>
						</>
					)}{" "}
				</section>
			</header>
			<main className='flex justify-center items-center min-h-[100vh]  px-4 pt-32 pb-12 bg-[#edeced]'>
				{children}
			</main>
		</React.Fragment>
  );
}

export default Layout