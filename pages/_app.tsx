import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createRef, useEffect, useState } from 'react'

import Container from '../components/Container'
import Navbar from '../components/NavBar'
import initialize from '../modules/mediapipe'
import HandsProvider  from '../context/hands'
import { useHandsContext } from '../context'

const sx = {
  main: {
    height: '100vh',
    width: '100vw',
    paddingTop: '15px',
  },
  container: {
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 10px)',
    margin: '0 10px 0 10px',
  },
  navbar: {
    marginBot: '10px',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  // const videoElement = createRef<HTMLVideoElement>()
  // let handsContext = useHandsContext()

  // useEffect(() => {
  //   console.log(handsContext)
  //   if (handsContext) {
  //     console.log(handsContext)
  //     initialize(handsContext, videoElement)
  //   }
  // }, [handsContext])

  return (
    <div style={sx.main}>
      <HandsProvider>
        <Container title="Theremin" style={sx.container}>
          <Navbar />
          <Component {...pageProps} />
          {/* <video ref={videoElement} hidden></video> */}
        </Container>
      </HandsProvider>
    </div>
  )
}
