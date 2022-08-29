import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { v4 } from 'uuid'

// Layout
import Layout from '../../layout/Layout'

import Loader from '../../components/atom/Loader'

// Search
import ReceiptSearch from '../../components/search/ReceiptSearch'

// Molecules
import FindUserReceipt from '../../components/molecules/FindUserReceipt'
import ServicePriceInput from '../../components/molecules/ServicePriceInput'

// Organisms
import Checkboxes from '../../components/organisms/Checkboxes'
import ReceivedTechnical from '../../components/organisms/ReceivedTechnical'
import TableTotal from '../../components/organisms/TableTotal'
import CentralFromReceipt from '../../components/organisms/CentralFromReceipt'

// other things
import { supabase } from '../../utils/supabaseClient'
import { getClientsIdentity } from '../../services/getClients'
import { getMolds } from '../../services/getMolds'

const Receipt = ({ clientsPrepared, molds }) => {
	const [search, setSearch] = useState('')
	const [loadingSearch, setLoadingSearch] = useState(false)
	const [loadingCreate, setLoadingCreate] = useState(false)
	const [userSelected, setUserSelected] = useState(null)
	const [brand, setBrand] = useState("");
	const [service, setService] = useState('')
	const [price, setPrice] = useState('')
	const [orders, setOrders] = useState([])

  const { register, handleSubmit, control, setValue, getValues, formState: {error: errorForm} } = useForm()

	console.log(orders)
	
	// console.log(molds)
	// console.log('clients: ', clients)
	// console.log('clients prepared: ', clientsPrepared)
  // console.log('search: ', search)
  // console.log('service: ', service)
  // console.log('price: ', price)
	const cleanInputs = () => {
		setSearch('')
		setService('')
		setPrice('')
		setOrders([])
		setUserSelected(null)
		setBrand('')
		setValue('name', '')
		setValue('identity', '')
		setValue('phone_number', '')
		setValue('email', '')
		setValue('date_birth', '')
		setValue('brand', '')
		setValue('model', '')
		setValue('color', '')
	}
	const onSubmit = (d) => {
		try {
			setLoadingCreate(true)
			d['orders'] = orders
			console.log('d:', d)
		} catch(error) {
			alert(error)
		} finally {
			cleanInputs()
			setLoadingCreate(false)
		}
	}

	const addOrder = () => {
		setOrders((prevState) => [...prevState, {
			"service": service,
			"price": price
		}])
		setService('')
		setPrice('')
	}

	const sumTotal = () => {
		const reducer = (accumalator, currentValue) => accumalator + Number(currentValue.price)
		const sum = orders.reduce(reducer, 0)
		return sum
	}

	const getClient = async () => {
		const userIdentity = search.match(/[0-9]/g).join('')
		try {
			setLoadingSearch(true)
			const { data, error } = await supabase
					.from('clients')
					.select('name, identity, email, date_birth, phone_number')
					.eq('identity', userIdentity)
			if (error) throw error
			setUserSelected(data)
			console.log('data', data)
		} catch(e) {
			console.error(e)
		} finally {
			setLoadingSearch(false)
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
			<section className='bg-white rounded-lg p-6'>
				<ReceiptSearch
					search={search}
					loadingSearch={loadingSearch}
					setSearch={setSearch}
					getClient={getClient}
					clientsPrepared={clientsPrepared}
					v4={v4}
				/>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='grid grid-cols-6 gap-3 p-6'
				>
					<FindUserReceipt
						register={register}
					/>
					<CentralFromReceipt register={register} molds={molds} brand={brand} setBrand={setBrand}/>
					<section className='col-span-full mb-2 flex flex-wrap'>
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
					<button
						type='submit'
						className='col-span-full flex justify-center items-center py-2 px-4 bg-zinc-600 text-white'
					>{loadingCreate ? <Loader /> : 'Create'}</button>
				</form>
			</section>
		</Layout>
  );
}
export default Receipt

export async function getServerSideProps() {
	const a = await getClientsIdentity()
	const m = await getMolds()
  return {
    props: {
			clientsPrepared: a,
			molds: m
		}
  }
}