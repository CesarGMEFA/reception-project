import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import { useState } from 'react'
import { useRouter } from 'next/router'

import '../styles/global.css'

import ProfileContext from '../utils/context/ProfileContext'
import useProfile from '../utils/hooks/useProfile'
import ProtectedRoutes from '../utils/constants/rutas/protectedRoutes'

const MyApp = ({ Component, pageProps }) => {

  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  // console.log('pageProps', pageProps)
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
    // <ProfileContext.Provider value={useProfile()}>
    //   <ProtectedRoutes router={router}>
    //     <Component {...pageProps} />
    //   </ProtectedRoutes>
    // </ProfileContext.Provider>