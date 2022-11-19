import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react/dist'

import Loader from './atom/Loader'

import ProfileContext from '../utils/context/ProfileContext'
import { FaLessThanEqual } from 'react-icons/fa'

const Auth = () => {
	const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('nmdc.qdejr15@kygur.com')
  const [password, setPassword] = useState('123456')

  const { setProfile, profileValidation } = useContext(ProfileContext)
	const router = useRouter()
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (email) => {
    try {
      setLoading(true)
			const {
				data: { user },
				error,
			} = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      const p = await profileValidation(user.id)
      setProfile(p)
      setLoading(1)
    } catch (error) {
      alert(error.error_description || error.message)
      setLoading(false)
    } finally {
			router.push("/")
			setLoading(false)
    }
  }

  return (
		<section className='flex flex-col items-center mobile:flex-row'>
      <section className='w-[243px] h-[268px] border-2 border-black bg-white py-4 px-3 mb-3 mobile:mb-0 mx-3'>
        <p>
          Cuenta para que ingreses y hagas pruebas es la que aparece ya en los campos de email y contrase&ntilde;a.
        </p>
        <hr />
        <p className='border-b border-black w-min font-bold pt-2'>Email:</p>
        <p>nmdc.qdejr15@kygur.com</p>
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