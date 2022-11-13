import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Landmark } from '@mediapipe/hands'
import type { AppProps } from 'next/app'

import Background from '../components/Background'
import Button from '../components/Button'
import Container from '../components/Container'
import FullscreenProvider from '../context/fullscreen'
import HandsProvider from '../context/hands'
import Message from '../components/Message'
import Navbar from '../components/NavBar'
import Popup from '../components/Popup'
import VideoPlaybackProvider from '../context/playback'
import { BooleanContextType, HandsContextType, Props } from '../types'
import { getInformationText, primary } from '../modules/const'
import { useFullScreenContext, usePlaybackContext } from '../context'

const sx = {
  appWrapper: {
    height: '100vh',
    width: '100vw',
  },
  container: {
    margin: '20px',
    width: 'calc(100vw - 40px)',
    height: 'calc(100vh - 40px)',
    transition: 'margin 700ms ease-out, opacity 700ms ease',
  },
  hoverContainer: {
    position: 'fixed' as 'fixed',
    top: 'calc(100vh - 100px)',
    left: 'calc(50vw - 250px)',
    height: '400px',
    width: '500px',
    borderRadius: '30%',
  },
  ctrlPanel: {
    position: 'fixed' as 'fixed',
    left: 'calc(50vw - 180px)',
    height: '80px',
    width: '360px',
    padding: '10px',
    backgroundColor: primary + '90',
    backdropFilter: 'blur(3px)',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'top 0.2s ease-out',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px ${primary}`,
  },
  btn: {
    width: '65px',
    height: '60px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: '40%',
  },
  btnActive: {
    width: '65px',
    height: '60px',
    backgroundColor: 'rgba(100, 100, 100, .4)',
    borderColor: 'rgba(0, 0, 0, 0)',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px ${primary}`,
  },
}

function AppWrapper(props: Props) {
  const router = useRouter()
  const { bool: fullscreen, toggle: toggleFullscreen } = useFullScreenContext()
  const { bool: playback, toggle: togglePlayback } = usePlaybackContext()

  const [ctrlPanel, setCtrlPanel] = useState(true)
  const [infoOpen, setInfo] = useState(false)
  const [msgOpen, setMsg] = useState(true)
  const [hidden, setHidden] = useState(false)

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
    setHidden(false)
    toggleFullscreen()
  }

  const onTogglePlayback = () => {
    togglePlayback()
  }

  const onToggleInfo = () => {
    setInfo(!infoOpen)
  }

  const onToggleHideUI = () => {
    setHidden(!hidden)
  }

  return (
    <div style={sx.appWrapper}>
      <Background />
      <Container
        title="THERESIM"
        style={{
          ...sx.container,
          ...{
            marginLeft: fullscreen ? '105vw' : '20px',
            opacity: hidden ? '0' : '100',
          },
        }}
      >
        <Navbar />
        {props.children}
      </Container>
      <Message
        style={{ opacity: msgOpen && !infoOpen ? '100' : '0' }}
        text={msgText}
        icon="up-arrow.svg"
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
            top: ctrlPanel ? 'calc(100vh - 80px)' : 'calc(100vh - 10px)',
          },
        }}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      >
        <Button
          style={fullscreen ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="fullscreen"
          onClick={onToggleFullscreen}
          icon={'expand.svg'}
          iconSize={50}
        />
        <Button
          style={hidden ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="info"
          onClick={onToggleHideUI}
          icon="eye.svg"
          iconSize={50}
        />
        <Button
          style={playback ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="playback"
          onClick={onTogglePlayback}
          icon="webcam.svg"
          iconSize={50}
        />
        <Button
          style={infoOpen ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="info"
          onClick={onToggleInfo}
          icon="info.svg"
          iconSize={50}
        />
      </div>
      <Popup
        style={{ opacity: infoOpen ? '100' : '0' }}
        text={getInformationText(router.route)}
        icon="close.svg"
        togglePopup={onToggleInfo}
      />
    </div>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const [fullscreen, toggleFullscreen] = useState(false)
  const [playback, togglePlayback] = useState(false)
  const [camReady, setCamReady] = useState(false)
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

  const updatePlayback = async () => {
    togglePlayback(!playback)
  }

  return (
    <HandsProvider
      value={
        {
          camReady: camReady,
          updateCamReady: setCamReady,
          rightHand: rightHand,
          leftHand: leftHand,
          updateRightHand: updateRightHand,
          updateLeftHand: updateLeftHand,
        } as HandsContextType
      }
    >
      <FullscreenProvider
        value={
          {
            bool: fullscreen,
            toggle: updateFullscreen,
          } as BooleanContextType
        }
      >
        <VideoPlaybackProvider
          value={
            {
              bool: playback,
              toggle: updatePlayback,
            } as BooleanContextType
          }
        >
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </VideoPlaybackProvider>
      </FullscreenProvider>
    </HandsProvider>
  )
}
