// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../types/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: 'Invalid method' })

  const supabase = createServerSupabaseClient<Database>({ req, res })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    return res.status(401).json({
      error: 'not_authenticated',
      description:
        'The user does not have an active session or is not authenticated'
    })
  }

  const { count } = await supabase
    .from('rooms')
    .select('id', { count: 'exact' })
    .eq('created_by', session.user.id)

  if (count !== null && count >= 5) {
    return res
      .status(406)
      .json({
        message: 'You reached the limit of 5 created rooms',
        error: 'limit_reached'
      })
  }

  const { error, data } = await supabase.from('rooms').insert(req.body).select()

  return res.status(200).json({ data, error })
}
