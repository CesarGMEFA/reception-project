import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { notifySucess, notifyError } from '../../utils/notify';

import Loader from '../atom/Loader';

import UserStaff from "../molecules/UserStaff";

import { supabase } from '../../utils/supabaseClient';

export default function AddStaff({ users }) {
  const [loading, setLoading] = useState(false)
  
  const {
		register,
		handleSubmit,
		setValue,
		formState: { Error },
	} = useForm();

  const onSubmit = async (d) => {
    setLoading(true)
    try {
      const { user, error } = await supabase.auth.signUp({
        email: d.email,
        password: d.password,
      })
      if (error) throw error
      try {
        const { data, error: e } = await supabase
        .from('profiles')
        .insert([
          { email: d.email,
            password: d.password,
            username: d.username,
            role: d.role,
            userId: user.id
          }
        ])
        if (e) {
          notifyError()
          throw e
        }
        notifySucess()
        console.log('data', data)
      } catch(error) {
        alert(error.message)
        console.error(error)
      }
    } catch(error) {
      alert(error.message)
    } finally {
      setLoading(false)
      setValue("email", "")
      setValue("password", "")
      setValue("username", "")
    }
  }

  return (
		<section className='py-4'>
			<h2 className='text-black font-bold text-2xl mb-2'>Staff</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<section className='flex items-center flex-wrap'>
					<div className='mr-4'>
						<label htmlFor='emailUser'>
							Email:
							<br />
							<input
								className='mobile:w-72
                  text-base font-normal text-gray-700
                bg-white bg-clip-padding
                  border border-solid border-gray-300 rounded
                  transition ease-in-out
                  px-2 py-1 m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								type='email'
								required
								id='emailUser'
                {...register("email")}
							/>
						</label>
					</div>
					<div className='mr-4'>
						<label htmlFor='passwordUser'>
							Contrase&ntilde;a:
							<br />
							<input
								className='mobile:w-72
                  text-base font-normal text-gray-700
                bg-white bg-clip-padding
                  border border-solid border-gray-300 rounded
                  transition ease-in-out
                  px-2 py-1 m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								type='text'
								required
                minLength={6}
                maxLength={12}
								id='passwordUser'
                {...register("password")}
							/>
						</label>
					</div>
					<div className='mr-4'>
						<label htmlFor='username'>
							Usuario:
							<br />
							<input
								className='mobile:w-72
                  text-base font-normal text-gray-700
                bg-white bg-clip-padding
                  border border-solid border-gray-300 rounded
                  transition ease-in-out
                  px-2 py-1 m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								type='text'
								required
                maxLength={10}
								id='username'
                {...register("username")}
							/>
						</label>
					</div>
					<div className='mr-2'>
						<label htmlFor='role'>
							Role:
							<br />
							<select
								className='bg-white mobile:w-72 h-8 col-span-full mobile:col-[1/4] tablet:col-[5/7]
                bg-clip-padding
                border border-solid border-gray-300
                rounded'
								id='role'
                {...register("role")}
							>
								<option value='asistente'>asistente</option>
								<option value='admin'>admin</option>
							</select>
						</label>
					</div>
				</section>
				<button
					className='py-2 px-4 my-3 bg-green-600 text-white
          hover:bg-green-400 hover:shadow-lg
          focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0'
				>
					{loading ? <Loader /> : "Add"}
				</button>
			</form>

      <UserStaff users={users} />

		</section>
  );
}