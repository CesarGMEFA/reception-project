import { Fragment, useContext, useState } from 'react'

import { supabase } from '../utils/supabaseClient'

import Loader from './atom/Loader'

import ProfileContext from '../utils/context/ProfileContext'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('curzaculte@gufum.com')
  const [password, setPassword] = useState('123456')

  const { setProfile, profileValidation } = useContext(ProfileContext)

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password
      })
      if (error) throw error
      const p = await profileValidation(user.id)
      setProfile(p)
      setLoading(1)
    } catch (error) {
      alert(error.error_description || error.message)
      setLoading(false)
    } finally {
      setEmail("")
      setPassword("")
    }
  }

  return (
		<section class='flex  flex-col items-center'>
      <section className='w-[243px] border-2 border-black bg-white py-4 px-3 mb-3'>
        <p>
          Cuenta para que ingreses y hagas pruebas es la que aparece ya en los campos de email y contrase&ntilde;a.
        </p>
        <hr />
        <p className='border-b border-black w-min font-bold pt-2'>Email:</p>
        <p>curzaculte@gufum.com</p>
        <p className='border-b border-black w-min font-bold pt-2'>Contrase&ntilde;a:</p>
        <p>123456</p>
      </section>
			<section className='border-2 border-black'>
				<section className='bg-white py-4 px-5 flex items-center justify-center flex-col'>
					<h2 className='text-black font-semibold text-xl mb-1'>
						Iniciar Sesi&oacute;n
					</h2>
					<p className='mb-3 flex justify-center flex-col items-center'>
						<label htmlFor='emailSignIn'>
							Email:
							<br />
							<input
								className='col-span-full mobile:col-[1/4] tablet:col-[1/3]
              text-base font-normal text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300 rounded
              transition ease-in-out
              px-2 py-1 m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								type='email'
								required
								autoComplete='email'
								id='emailSignIn'
								value={email}
								onChange={changeEmail}
							/>
						</label>
					</p>
					<p className='mb-3 flex justify-center flex-col items-center'>
						<label htmlFor='passwordSignIn'>
							Contrase&ntilde;a:
							<br />
							<input
								className='col-span-full mobile:col-[1/4] tablet:col-[1/3]
              text-base font-normal text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300 rounded
              transition ease-in-out
              px-2 py-1 m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								type='password'
								required
								id='passwordSignIn'
								value={password}
								onChange={changePassword}
							/>
						</label>
					</p>
					<div>
						<button
							onClick={(e) => {
								e.preventDefault();
								handleLogin(email);
							}}
							className='bg-zinc-600 mx-auto mt-5 px-5 py-2 text-white font-bold cursor-pointer hover:bg-zinc-800 active:bg-black'
							disabled={loading}
						>
							<span>
								{loading || loading === 1 ? (
									<Loader />
								) : (
									"Iniciar"
								)}
							</span>
						</button>
					</div>
				</section>
			</section>
		</section>
  );
}

export default Auth