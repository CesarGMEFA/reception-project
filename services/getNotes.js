import { format } from "date-fns"

import { supabase } from "../utils/supabaseClient";

export async function getNotes(id) {
  const { data, error } = await supabase
      .from('notes')
      .select('created_at, note')
      .eq('IDreceipt', id)

  if (error) throw error

	const send = data.map( value => {
	  return {
      ...value,
      created_at: format(new Date(value.created_at), 'dd/MM/yyyy')
    }
  })

  return send
}