import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { HandsProvider } from '../context/hands'

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <HandsProvider>
    <Component {...pageProps} />
  </HandsProvider>
  </>
}
