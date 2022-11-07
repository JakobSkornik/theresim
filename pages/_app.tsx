import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Container from '../components/Container'
import Navbar from '../components/NavBar'
import HandsProvider from '../context/hands'
import { gray } from '../modules/const'

const sx = {
  main: {
    height: '100vh',
    width: '100vw',
    paddingTop: '15px',
    backgroundColor: gray,
  },
  container: {
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 10px)',
    margin: '0 10px 0 10px',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={sx.main}>
      <HandsProvider>
        <Container title="Theremin" style={sx.container} icon="/theremin.png">
          <Navbar />
          <Component {...pageProps} />
        </Container>
      </HandsProvider>
    </div>
  )
}
