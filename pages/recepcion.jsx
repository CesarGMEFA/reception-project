import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form"
import { Toaster } from 'react-hot-toast'
import { v4 } from 'uuid'

// Layout
import Layout from '../layout/Layout'

import Loader from '../components/atom/Loader'

// Search
import ReceiptSearch from '../components/search/ReceiptSearch'

// Molecules
import FindUserReceipt from '../components/molecules/FindUserReceipt'
import ServicePriceInput from '../components/molecules/ServicePriceInput'

// Organisms
import Checkboxes from '../components/organisms/Checkboxes'
import ReceivedTechnical from '../components/organisms/ReceivedTechnical'
import TableTotal from '../components/organisms/TableTotal'
import CentralFromReceipt from '../components/organisms/CentralFromReceipt'

// Utils
import { notifySucess, notifyError } from '../utils/notify'
import { supabase } from '../utils/supabaseClient'

// Services
import { getClientsIdentity } from '../services/getClients'
import { getMolds } from '../services/getMolds'

const Receipt = ({ clientsPrepared, molds }) => {
	const [search, setSearch] = useState('')
	const [loadingSearch, setLoadingSearch] = useState(false)
	const [loadingCreate, setLoadingCreate] = useState(false)
	const [userSelected, setUserSelected] = useState(null)
	const [brand, setBrand] = useState("");
	const [service, setService] = useState('')
	const [price, setPrice] = useState('')
	const [orders, setOrders] = useState([])

  const { register, handleSubmit, control, setValue, formState: {error: errorForm} } = useForm()

	const router = useRouter()

	if (errorForm) throw errorForm

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
		setValue('description', '')
		setValue('deliveryTime', '')
	}

	const onSubmit = async (d) => {
		try {
			setLoadingCreate(true)
			const { data, error: e } = await supabase
			.from('receptions')
			.insert([
				{ name: d.name,
					identity: d.identity,
					email: d.email,
					phone_number: d.phone_number,
					delivery_time: d.delivery_time,
					date_birth: d.date_birth,
					brand: d.brand,
				  model: d.model,
					color: d.color,
					description: d.description,
					pieces: d.pieces,
					received: d.received,
					technical: d.technical,
					order: orders,
					status: "reparación"
				}
			])

			if (e) {
				notifyError()
				throw e
			};
			notifySucess()

			router.push(`/receipt/${data[0].id}`)
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
		console.log(/[0-9]/g.test(search))
		if (!(/[0-9]/g.test(search))) {
			notifyError()
			return true
		}

		const userIdentity = search.match(/[0-9]/g).join('')
		try {
			setLoadingSearch(true)
			const { data, error } = await supabase
					.from('clients')
					.select('name, identity, email, date_birth, phone_number')
					.eq('identity', userIdentity)
			
			if (error) {
				notifyError()
				throw error
			}
			notifySucess()
			setUserSelected(data)

		} catch(e) {
			console.error(e)
		} finally {
			setLoadingSearch(false)
		}
	}
	
	useEffect(() => {
		if (userSelected) {
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
					<FindUserReceipt register={register} />
					<CentralFromReceipt
						register={register}
						molds={molds}
						brand={brand}
						setBrand={setBrand}
					/>
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
					<p className='flex justify-center items-center col-span-full'>
						<label htmlFor='delivery_time'>
							Delivery time:
							<br />
							<input
								className='text-base font-normal text-gray-700
        			bg-white bg-clip-padding
        				border border-solid border-gray-300 rounded
        				transition ease-in-out
        				px-2 py-1 m-0
        			focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								type='datetime-local'
								{...register("delivery_time", {required:true})}
								id='delivery_time'
							/>
						</label>
					</p>
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
						title='Create a Receipt'
						className='col-span-full flex justify-center items-center py-2 px-4 bg-zinc-600 text-white
						hover:bg-zinc-400 hover:shadow-lg
			      focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0'
					>
						{loadingCreate ? <Loader /> : "Create"}
					</button>
				</form>
				<Toaster />
			</section>
		</Layout>
  );
}
export default Receipt


export async function getServerSideProps(ctx) {
  const s = createServerSupabaseClient(ctx)

	const {
    data: { session }
  } = await s.auth.getSession()

  console.log('recepcion => ', session)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

	const a = await getClientsIdentity()
	const m = await getMolds()
  return {
    props: {
			clientsPrepared: a,
			molds: m
		}
  }

}