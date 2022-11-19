import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import { useState } from 'react'

import '../styles/global.css'

import ProfileContext from '../utils/context/ProfileContext'
import useProfile from '../utils/hooks/useProfile'

const MyApp = ({ Component, pageProps }) => {
  
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ProfileContext.Provider value={useProfile()}>
        <Component {...pageProps} />
      </ProfileContext.Provider>
    </SessionContextProvider>
  )
}
export default MyApp