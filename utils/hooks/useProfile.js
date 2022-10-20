import { useEffect, useState } from "react"

import { supabase } from "../supabaseClient"

function useProfile() {
  const [profile, setProfile] = useState({})

  const checkingSession = supabase.auth.session()
  
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
      if (checkingSession) {
        profileValidation(checkingSession.user.id)
          .then((res) => {
            setProfile(res)
          })
          .catch((error) => {
            alert(error)
          })
      } else {
        console.log('no')
        console.log(checkingSession)
      }
    }, [])

  return {
    profile,
    setProfile,
    profileValidation
  }
}

export default useProfile