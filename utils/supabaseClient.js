import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const supabaseServiceRole = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE

export const supa = createClient(supabaseUrl, supabaseServiceRole)
