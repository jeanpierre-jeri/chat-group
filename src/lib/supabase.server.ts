import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { GetServerSidePropsContext, PreviewData } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import type { Database } from '../../types/supabase'

export function createSupabaseServer(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const supabase = createServerSupabaseClient<Database>(ctx)

  return supabase
}
