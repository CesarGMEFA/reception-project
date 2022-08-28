import React, { useEffect } from 'react'

import Layout from '../layout/Layout'

import Inputs from '../components/atom/Inputs'
import Button from '../components/atom/Button'

import { supabase } from '../utils/supabaseClient'
import { useForm } from "react-hook-form"

const Employees = () => {
  const { register, handleSubmit, formState: {error} } = useForm()
  const onSubmit = async (datos) => {
    try {
      console.log('datos', datos)
      const { user, session, error } = await supabase.auth.signUp({
        email: datos.Email,
        password: datos.Password,
      })
      console.log('session', session)
      console.log('user', user)
      const { data, error: e} = await supabase
        .from("profiles")
        .insert([{
          username: datos.Username,
          role: datos.role,
          userId: datos.id
        }])
      console.log('data', data)
      if(e) throw Error(e.message)
      if (error) throw Error(error.message)
    } catch(error) {
      console.log('error', error)
    }
  }

  return (
    <Layout>
      <section className='grid grid-cols-1 sm:grid-cols-2 h-full w-full bg-gray-200 p-6 m-6'>
        <form className='border border-black' onSubmit={handleSubmit(onSubmit)}>
          <Inputs register={register} label="Username" type="text" f="Username"/>
          <Inputs register={register} label="Email" type="email" f="Email"/>
          <Inputs register={register} label="Password" type="password" f="Password"/>
          <select {...register("role")} className="block bg-white px-2 py-1 ml-9">
            <option value="employee">employee</option>
            <option value="admin">admin</option>
          </select>
          <Button type="submit" addValue="Add" addClass="ml-9"/>
        </form>
      </section>
    </Layout>
  )
}

export default Employees