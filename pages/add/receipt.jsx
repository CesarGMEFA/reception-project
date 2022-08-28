import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { v4 } from 'uuid'
import { GrFormSearch } from 'react-icons/gr'

import Layout from '../../layout/Layout'

import Inputs from '../../components/atom/Inputs'
import Button from '../../components/atom/Button'

import FindUserReceipt from '../../components/molecules/FindUserReceipt'
import ServicePriceInput from '../../components/molecules/ServicePriceInput'

import Checkboxes from '../../components/organisms/Checkboxes'
import ReceivedTechnical from '../../components/organisms/ReceivedTechnical'
import TableTotal from '../../components/organisms/TableTotal'
import CentralFromReceipt from '../../components/organisms/CentralFromReceipt'

import { supabase } from '../../utils/supabaseClient'
import { getClients, getClientsIdentity } from '../../services/getClients'

const Receipt = ({ clientsPrepared }) => {
	const [search, setSearch] = useState('')
	const [userSelected, setUserSelected] = useState(null)
	const [service, setService] = useState('')
	const [price, setPrice] = useState('')
	const [orders, setOrders] = useState([])

  const { register, handleSubmit, control, watch, setValue, formState: {error: errorForm} } = useForm()

	
	// console.log('clients: ', clients)
	// console.log('clients prepared: ', clientsPrepared)
  // console.log('search: ', search)
  // console.log('service: ', service)
  // console.log('price: ', price)

	const onSubmit = (d) => {
		console.log('d:', d)
	}

	const addOrder = () => {
		setOrders((prevState) => [...prevState, {
			"service": service,
			"price": price
		}])
	}

	const sumTotal = () => {
		const reducer = (accumalator, currentValue) => accumalator + Number(currentValue.price)
		const sum = orders.reduce(reducer, 0)
		return sum
	}

	const getClient = async () => {
		const userIdentity = search.match(/[0-9]/g).join('')
		try {
			const { data, error } = await supabase
					.from('clients')
					.select('name, identity, email, date_birth, phone_number')
					.eq('identity', userIdentity)
			if (error) throw error
			setUserSelected(data)
			console.log('data', data)
		} catch(e) {
			console.error(e)
		}
	}

	useEffect(() => {
		console.log(orders)
	}, [orders])
	

	useEffect(() => {
		if (userSelected) {
			console.log('userSelected: ',userSelected)
			setValue('name', userSelected[0].name)
			setValue('identity', userSelected[0].identity)
			setValue('phone_number', userSelected[0].phone_number)
			setValue('email', userSelected[0].email)
			setValue('date_birth', userSelected[0].date_birth)
		}
	}, [userSelected])

  return (
		<Layout>
			<section className='bg-gray-200 p-6 my-6'>
				<p className='flex justify-center items-center'>
					<label htmlFor='search'>
						Search:
						<br />
						<input
							className='mt-1 px-2 py-1'
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
						<GrFormSearch />
					</button>
					<datalist id='browsers'>
						{search.length > 2 &&
							clientsPrepared.map((user) => (
								<option value={user.client} key={v4()} />
							))}
					</datalist>
				</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='grid grid-cols-1 sm:grid-cols-3 bg-gray-200 p-6'
				>
					<FindUserReceipt register={register} userSelected={userSelected}/>
					<CentralFromReceipt register={register} />
					<section className='col-span-full my-2'>
						<Checkboxes
							options={[
								"Battery",
								"SD Memory",
								"SIM Card",
								"Back Cover",
							]}
							control={control}
							name='pieces'
						/>
					</section>
					<ReceivedTechnical register={register} />
					<ServicePriceInput
						addOrder={addOrder}
						service={service}
						setService={setService}
						price={price}
						setPrice={setPrice}
					/>
					<TableTotal orders={orders} sumTotal={sumTotal} v4={v4} />
					<Button
						type='submit'
						addValue='Create'
						addClass='col-span-full w-24'
					/>
				</form>
			</section>
		</Layout>
  );
}
export default Receipt

export async function getServerSideProps() {
	const a = await getClientsIdentity()
  return {
    props: {
			clientsPrepared: a
		}
  }
}