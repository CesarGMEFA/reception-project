import { useState } from "react"
import { useRouter } from "next/router"

import { supabase } from "../utils/supabaseClient"

// Este componente no sera utilizado ya que el la interfaz de modificar la clave esta adentro
function Reset() {
  // RequireRecoveryType()
  const [loading, setLoading] = useState(false)
  const [primeraClave, setPrimeraClave] = useState("")
  const [segundaClave, setSegundaClave] = useState("")
  const router = useRouter()

  const handleReset = async () => {
    try {
      const { error } = await supabase.auth.update({
        password: segundaClave
      })
      if (error) throw  error
      alert("Contraseña actualizada correctamente")
      router.push("/")
    } catch(e) {
      alert(e)
    }
  }

  return (
    <h1>a</h1>
  )
}

export default Reset