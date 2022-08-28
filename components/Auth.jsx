import { useState } from 'react'
import Inputs from './atom/Inputs'

import { supabase } from '../utils/supabaseClient'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
      })
      console.log('session', session)
      console.log('user', user)
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
		<main className='flex items-center justify-center w-full h-screen'>
			<section className='bg-gray-200 py-4 px-5 flex items-center justify-center flex-col'>
				<p className='mb-3 flex justify-center flex-col items-center'>
					<label htmlFor="emailSignIn" >
						Email:<br />
						<input
							className='mt-1 px-2 py-1'
							type="email"
              required
							id="emailSignIn"
							value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
			</section>
		</main>
  );
}

export default Auth