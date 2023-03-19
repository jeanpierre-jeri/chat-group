import { useSupabaseClient as useClient } from '@supabase/auth-helpers-react'
import { Database } from '../../types/supabase'

export function useSupabaseClient() {
  const supabase = useClient<Database>()

  return supabase
}
