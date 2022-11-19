import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Auth from "../../components/Auth"
import { supabase } from "../../utils/supabaseClient"

export default function login() {

  
  return (
    <main className="flex justify-center items-center min-h-[100vh]  px-4 pt-32 pb-12 bg-[#edeced]">
      <Auth />
    </main>
  )
}

export const getServerSideProps = async (ctx) => {
  const s = createServerSupabaseClient(ctx)

  const {
    data: { session }
  } = await s.auth.getSession()

  
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialSession: session
		}
  }

}