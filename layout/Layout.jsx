import React from 'react'
import Link from 'next/link'

import { FaRegListAlt } from 'react-icons/fa'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { FaRegAddressCard } from 'react-icons/fa'
import { AiOutlineBarChart } from 'react-icons/ai'

const Layout = ({children}) => {
  return (
		<React.Fragment>
			<header className='flex justify-between items-center border-gray-200 px-2 sm:px-4 py-6'>
				<span>Management</span>
				{/* <nav className='flex'>
          <span className='mx-4 text-2xl cursor-pointer' title='reception list'><FaRegListAlt /></span>
          <span className='mx-4 text-2xl cursor-pointer' title='create receipt'><AiOutlineFileAdd /></span>
          <span className='mx-4 text-2xl cursor-pointer' title='add costumer'><AiOutlineUserAdd /></span>
        </nav> */}
				<nav className='flex items-center'>
          <Link href="/">
            <span
              className='mx-2 text-2xl cursor-pointer p-2 rounded hover:bg-gray-300'
              title='reception list'
            >
              <FaRegListAlt />
            </span>
          </Link>
					<Link href="/add/receipt">
						<span
							className='mx-2 text-2xl cursor-pointer p-2 rounded hover:bg-gray-300'
							title='create receipt'
						>
							<AiOutlineFileAdd />
						</span>
					</Link>
          <Link href="/add/client">
            <span
              className='mx-2 text-2xl cursor-pointer p-2 rounded hover:bg-gray-300'
              title='add costumer'
            >
              <AiOutlineUserAdd />
            </span>
          </Link>
					<Link href="/employees">
						<span
							className='mx-2 text-2xl cursor-pointer p-2 rounded hover:bg-gray-300'
							title='employees'
						>
							<FaRegAddressCard />
						</span>
					</Link>
					<span
						className='mx-2 text-2xl cursor-pointer p-2 rounded hover:bg-gray-300'
						title='estadistic'
					>
						<AiOutlineBarChart />
					</span>
				</nav>
				<span>Logout</span>
			</header>
      <main className='flex justify-center items-center'>
        {children}
      </main>
		</React.Fragment>
  );
}

export default Layout