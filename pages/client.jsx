import Layout from '../layout/Layout'

import Inputs from "../components/atom/Inputs"
import Button from "../components/atom/Button"

import { useForm } from "react-hook-form"
import { supabase } from '../utils/supabaseClient'
import { useState } from 'react'
import Loader from '../components/atom/Loader'

const Client = (props) => {
  const [loadingAddUser, setLoadingAddUser] = useState(false)
  const { register, handleSubmit, formState: {error} } = useForm()

  const firstLettersToUpperCase = (name) => {
		return name.split(" ").map( word => word[0].toUpperCase() + word.substring(1)).join(" ")
	}

  const onSubmit = async (data) => {
    try {
      setLoadingAddUser(true)
      const name = firstLettersToUpperCase(data.name)

      const { data: d, error: e } = await supabase
      .from('clients')
      .insert([
        { 
          name: name,
          identity: data.identity,
          date_birth: data.dateBirth,
          email: data.emailClient,
          phone_number: data.phoneNumber,
        }
      ])
      console.log('d: ', d)
      if (e) throw e
    } catch(e) {
      alert(e.message || e.description)
    } finally {
      setLoadingAddUser(false)
    }
  }
  if (error) throw error

  return (
		<Layout>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid grid-cols-6 gap-3 p-6 bg-white rounded-lg'
			>
				<Inputs
					register={register}
					classP="col-span-full mobile:col-[1/4] tablet:col-[1/3]"
          classN='
            text-base font-normal text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300 rounded
            transition ease-in-out
            px-2 py-1 m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					label='Name'
					f='name'
				/>
				<Inputs
					register={register}
          classP="col-span-full mobile:col-[4/7] tablet:col-[3/5]"
					classN='
            text-base font-normal text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300 rounded
            transition ease-in-out
            px-2 py-1 m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					label='Identity Number'
					f='identity'
				/>
				<Inputs
					register={register}
          classP="col-span-full tablet:col-[5/7]"
					classN='
            text-base font-normal text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300 rounded
            transition ease-in-out
            px-2 py-1 m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none pl-14 pr-10'
					label='Date of Birth'
					f='dateBirth'
					type='date'
				/>
				<Inputs
					register={register}
          classP="col-span-full mobile:col-[1/4] tablet:col-[1/3]"
					classN='
            text-base font-normal text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300 rounded
            transition ease-in-out
            px-2 py-1 m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					label='Email'
					f='emailClient'
					type='email'
				/>
				<Inputs
					register={register}
					classP="col-span-full mobile:col-[4/7] tablet:col-[3/5]"
          classN='
            text-base font-normal text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300 rounded
            transition ease-in-out
            px-2 py-1 m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					label='Phone Number'
					f='phoneNumber'
					type='tel'
				/>
        <button type='submit' className='col-span-full flex justify-center bg-zinc-600 w-20 mx-auto mt-5 px-5 py-2 text-white font-bold cursor-pointer hover:bg-zinc-800 active:bg-black`}'>
          {loadingAddUser ? <Loader /> : "Add"}
        </button>
				{/* <Button type='submit' addValue='Add' addClass='col-span-full' /> */}
			</form>
		</Layout>
  );
}

export default Client