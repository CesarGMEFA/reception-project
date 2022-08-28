import React, { useState, useEffect } from "react"

import Home from "./Home"
import Auth from "../components/Auth"

import { supabase } from "../utils/supabaseClient"

const Index = (props) => {
  // const [isLoading, setIsLoading] = useState(true)
  // const [session, setSession] = useState(null)

  // useEffect(() => {
  //   setSession(supabase.auth.session())

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })
  // }, [])

  return (
    // <React.Fragment>
    //   {!session ? (
    //     <Auth />
    //   ) : (
    //     <Home />
    //   )}
    // </React.Fragment>
    <Home />
   )
}

export default Index