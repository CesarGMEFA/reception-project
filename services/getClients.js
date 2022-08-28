import { supabase } from '../utils/supabaseClient'
export async function getClients() {
  try {
    const { data, error } = await supabase
        .from('clients')
        .select('name, identity, email, date_birth')
    if (error) throw error
    return data
  } catch(e) {
    console.error(e)
  }
}

export async function getClientsIdentity() {
  const res = []
  const o = await getClients()
  for (const i of o) {
    res.push({'client': i.name + ' ' + i.identity})
  }
  return res
}