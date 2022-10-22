import { useEffect, useState } from "react"

import { supabase } from "../supabaseClient"

function useProfile() {
  const [profile, setProfile] = useState({})
  const [event, setEvent] = useState(null)

  const session = supabase.auth.session()
    
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

  useEffect(() => {
    (async() => {
      if (session) {
        const p = await profileValidation(session.user.id)
        setProfile(p)
      }
    })()
  }, [])

  return {
    profile,
    setProfile,
    profileValidation,
    session,
    event
  }
}

export default useProfile