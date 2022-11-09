// import { supabase } from "../../utils/supabaseClient";
import { supa } from "../../utils/supabaseClient"

export async function deleteUserStaff(userId) {
  const { data, error } = await supa.auth.api.deleteUser(userId)
  return {
    data,
    error
  }
}