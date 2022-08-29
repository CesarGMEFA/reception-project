import { supabase } from "../utils/supabaseClient";

export async function getMolds() {
  try {
    const {data, error: e} = await supabase.from('molds').select('brand, model, color')
    if(e) throw e
    return data
  } catch(error) {
    alert(error)
    console.log(error)
  }
}