import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Auth from "../../components/Auth"
import { supabase } from "../../utils/supabaseClient"

export default function login() {
  const [session, setSession] = useState()
  const router = useRouter()
  
  useEffect(() => {
    (async() => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    })();

  }, [])
  
  useEffect(() => {
    if (session) {
      router.push('/')
      return
    }
  }, [session])

  
  return (
    <main className="flex justify-center items-center min-h-[100vh]  px-4 pt-32 pb-12 bg-[#edeced]">
      <Auth />
    </main>
  )
}

export async function getServerSideProps(ctx) {
  // const s = createServerSupabaseClient(ctx)

  // const {
  //   data: { session }
  // } = await s.auth.getSession()

  // let a = await s.auth.getSession()

  // console.log('review => ', a)
  
  // console.log('login => ', session)
  
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }
  // const z = JSON.stringify(s)
  return {
    props: {
      // z
		}
  }

}