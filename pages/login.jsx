import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Auth from "../components/Auth"
import { supabase } from "../utils/supabaseClient"

export default function login() {
  const [session, setSession] = useState()
  const router = useRouter()
  
  useEffect(() => {
    setSession(supabase.auth.session())
  }, [])

  if (session) {
    router.push('/')
  }
  return (
    <main className="flex justify-center items-center min-h-[100vh]  px-4 pt-32 pb-12 bg-[#edeced]">
      <Auth />
    </main>
  )
}
