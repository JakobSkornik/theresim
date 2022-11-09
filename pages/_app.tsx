import '../styles/globals.css'
import { MouseEvent, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'

import Container from '../components/Container'
import Navbar from '../components/NavBar'
import HandsProvider from '../context/hands'
import { getInformationText, gray } from '../modules/const'
import Button from '../components/Button'
import Popup from '../components/Popup'
import Message from '../components/Message'
import { useRouter } from 'next/router'

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
  infoBtn: {
    position: 'fixed',
    top: '55px',
    left: 'calc(100vw - 120px)',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [infoOpen, setInfo] = useState(false)
  const [msgOpen, setMsg] = useState(true)

  const msgText = 'Click here for more details.'

  useEffect(() => {
    const timeId = setTimeout(() => {
      setMsg(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  const onToggleInfo = (e: MouseEvent<HTMLButtonElement>) => {
    setInfo(!infoOpen)
  }

  return (
    <div style={sx.main}>
      <HandsProvider>
        <Container title="Theremin" style={sx.container} icon="theremin.png">
          <Navbar />
          <Component {...pageProps} />
          <Message
            style={{ opacity: msgOpen && !infoOpen ? '100' : '0' }}
            text={msgText}
            icon="arrow.svg"
            iconSize={30}
          />
          {!infoOpen && (
            <Button
              style={sx.infoBtn}
              text=""
              value="info"
              onClick={onToggleInfo}
              icon="info.svg"
              iconSize={40}
            />
          )}
          <Popup
            style={{ opacity: infoOpen ? '100' : '0' }}
            text={getInformationText(router.route)}
            icon="close.svg"
            togglePopup={onToggleInfo}
          />
        </Container>
      </HandsProvider>
    </div>
  )
}
