import { useEffect, useState } from "react"

import { supabase } from '../supabaseClient'

function useProfile() {
  const [session, setSession] = useState(null)
  const [event, setEvent] = useState(null)
  const [profile, setProfile] = useState([{
    role: "",
    userId: "",
    username: ""
  }])

  // const session = supabase.auth.session()
    
  supabase.auth.onAuthStateChange( (event, _session) => {
    setEvent(event)
  })
  
  const profileValidation = async (id) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username,role,userId')
        .eq('userId', id)
        if(error) throw error
      return data
    } catch(e) {
      alert(e.message)
    }
  }


  return {
    profile,
    setProfile,
    profileValidation,
    session,
    event
  }
}

export default useProfile