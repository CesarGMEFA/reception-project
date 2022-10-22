import { useContext, useEffect, useState } from 'react'

import { supabase } from '../utils/supabaseClient'

import ProfileContext from '../utils/context/ProfileContext'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    } catch (error) {
      alert(error.error_description || error.message)
      console.error(error)
    } finally {
      setLoading(false)
      setEmail("")
      setPassword("")
    }
  }

  return (
		<main>
			<section className='bg-white py-4 px-5 flex items-center justify-center flex-col'>
				<p className='mb-3 flex justify-center flex-col items-center'>
					<label htmlFor="emailSignIn" >
						Email:<br />
						<input
							className='col-span-full mobile:col-[1/4] tablet:col-[1/3]
              text-base font-normal text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300 rounded
              transition ease-in-out
              px-2 py-1 m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							type="email"
              required
              autoComplete='email'
							id="emailSignIn"
							value={email}
              onChange={changeEmail}
						/>
					</label>
				</p>
				<p className='mb-3 flex justify-center flex-col items-center'>
					<label htmlFor="passwordSignIn" >
						Password:<br />
						<input
							className='col-span-full mobile:col-[1/4] tablet:col-[1/3]
              text-base font-normal text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300 rounded
              transition ease-in-out
              px-2 py-1 m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							type="password"
              required
							id="passwordSignIn"
							value={password}
              onChange={changePassword}
						/>
					</label>
				</p>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="bg-zinc-600 mx-auto mt-5 px-5 py-2 text-white font-bold cursor-pointer hover:bg-zinc-800 active:bg-black"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Iniciar'}</span>
          </button>
        </div>
			</section>
		</main>
  );
}

export default Auth