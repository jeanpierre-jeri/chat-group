import type { AppProps } from 'next/app'
import { Noto_Sans } from 'next/font/google'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
})

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={notoSans.className}>
      <Component {...pageProps} />
    </div>
  )
}
