import '../styles/globals.css'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { Landmark } from '@mediapipe/hands'

import Container from '../components/Container'
import Navbar from '../components/NavBar'
import HandsProvider from '../context/hands'
import { getInformationText, gray } from '../modules/const'
import Button from '../components/Button'
import Popup from '../components/Popup'
import Message from '../components/Message'
import { useRouter } from 'next/router'
import FullscreenProvider from '../context/fullscreen'
import { FullscreenContextType, HandsContextType, Props } from '../types'
import { useFullScreenContext } from '../context'

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
  hoverContainer: {
    position: 'fixed' as 'fixed',
    top: 'calc(100vh - 100px)',
    left: 'calc(50vw - 167px)',
    height: '400px',
    width: '314px',
    borderRadius: '30%',
  },
  ctrlPanel: {
    paddingLeft: '10px',
    paddingRight: '10px',
    position: 'fixed' as 'fixed',
    left: 'calc(50vw - 75px)',
    height: '60px',
    width: '150px',
    backdropFilter: 'blur(3px)',
    border: '1px solid white',
    borderFilter: 'blur(3px)',
    borderRadius: '20px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    transition: 'top 0.2s ease-out',
  },
  btn: {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    margin: '-5px',
  },
}

function AppWrapper(props: Props) {
  const router = useRouter()
  const { toggleFullscreen } = useFullScreenContext()

  const [ctrlPanel, setCtrlPanel] = useState(true)
  const [infoOpen, setInfo] = useState(false)
  const [msgOpen, setMsg] = useState(true)

  const msgText = 'You can find more information in the control panel.'

  useEffect(() => {
    const timeId = setTimeout(() => {
      setMsg(false)
      setCtrlPanel(false)
    }, 2000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  const openCtrlPanel = () => {
    setCtrlPanel(true)
  }

  const closeCtrlPanel = () => {
    setCtrlPanel(false)
  }

  const onToggleFullscreen = () => {
    toggleFullscreen()
  }

  const onToggleInfo = () => {
    setInfo(!infoOpen)
  }
  return (
    <Container title="Theremin" style={sx.container} icon="theremin.png">
      <Navbar />
      {props.children}
      <Message
        style={{ opacity: msgOpen && !infoOpen ? '100' : '0' }}
        text={msgText}
        icon="arrow-down.svg"
        iconSize={50}
      />
      <div
        style={sx.hoverContainer}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      ></div>
      <div
        style={{
          ...sx.ctrlPanel,
          ...{
            top: ctrlPanel ? 'calc(100vh - 80px)' : 'calc(100vh - 20px)',
          },
        }}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      >
        {ctrlPanel && (
          <Button
            style={sx.btn}
            text=""
            value="fullscreen"
            onClick={onToggleFullscreen}
            icon="expand.svg"
            iconSize={40}
          />
        )}
        {ctrlPanel && (
          <Button
            style={sx.btn}
            text=""
            value="info"
            onClick={onToggleInfo}
            icon="info.svg"
            iconSize={40}
          />
        )}
      </div>
      <Popup
        style={{ opacity: infoOpen ? '100' : '0' }}
        text={getInformationText(router.route)}
        icon="close.svg"
        togglePopup={onToggleInfo}
      />
    </Container>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const [fullscreen, toggleFullscreen] = useState(false)
  const [rightHand, setRightHand] = useState<Landmark[]>([])
  const [leftHand, setLeftHand] = useState<Landmark[]>([])

  const updateRightHand = (hand: Landmark[]) => {
    setRightHand(hand)
  }

  const updateLeftHand = (hand: Landmark[]) => {
    setLeftHand(hand)
  }

  const updateFullscreen = async () => {
    toggleFullscreen(!fullscreen)
  }

  return (
    <div style={sx.main}>
      <HandsProvider
        value={
          {
            rightHand,
            leftHand,
            updateRightHand,
            updateLeftHand,
          } as HandsContextType
        }
      >
        <FullscreenProvider
          value={
            {
              fullscreen: fullscreen,
              toggleFullscreen: updateFullscreen,
            } as FullscreenContextType
          }
        >
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </FullscreenProvider>
      </HandsProvider>
    </div>
  )
}
