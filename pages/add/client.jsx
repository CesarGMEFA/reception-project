import Layout from '../../layout/Layout'

import Inputs from "../../components/atom/Inputs"
import Button from "../../components/atom/Button"

import { useForm } from "react-hook-form"
import { supabase } from '../../utils/supabaseClient'

const Client = (props) => {
  const { register, handleSubmit, formState: {error} } = useForm()
  const onSubmit = async (data) => {
    try {
      const { data: d, error: e } = await supabase
      .from('clients')
      .insert([
        { 
          name: data.name.toLowerCase(),
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
    }
  }
  if (error) throw error

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 sm:grid-cols-2 h-full w-full bg-gray-200 p-6 m-6'>
        <Inputs register={register} label="Name" f="name"/>
        <Inputs register={register} label="Identity Number" f="identity"/>
        <Inputs register={register} label="Date of Birth" f="dateBirth" type="date" classN="pl-14 pr-10"/>
        <Inputs register={register} label="Email" f="emailClient" type="email"/>
        <Inputs register={register} label="Phone Number" f="phoneNumber" type="tel"/>
        <Button type="submit" addValue="Add" addClass="col-span-full"/>
      </form>
    </Layout>
   )
}

export default Client