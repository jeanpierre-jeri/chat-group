import { useState } from 'react'
import type { AppProps } from 'next/app'
import { Noto_Sans } from 'next/font/google'
import {
  SessionContextProvider,
  type Session
} from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

import '@/styles/globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
})

interface Props extends AppProps {
  initialSession: Session
}

export default function App({ Component, pageProps, initialSession }: Props) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <div className={notoSans.className}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </div>
  )
}
