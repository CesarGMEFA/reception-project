import { supabase } from '../utils/supabaseClient'

export async function getPaths() {
  const data = await getData()
  
  const ids = data.map( obj => {
    return {
      params: {
        id: obj.id.toString()
      }
    }
  })

  return ids
}

export async function getDataId(id) {
  const d = await getData()

  const objData = d.find( obj => obj.id.toString() === id)

  return {
    id: id,
    data: objData
  }
}

export async function getData() {
  try { 
    let { data: receptions, error: e } = await supabase
        .from('receptions')
        .select('*')

    if (e) throw e
     return receptions
  } catch ( error ) {
    alert(error.message || error.description)
  }
}