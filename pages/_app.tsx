import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Landmark } from '@mediapipe/hands'
import type { AppProps } from 'next/app'

import Background from '../components/Background'
import Container from '../components/Container'
import ControlPanel from '../components/ControlPanel'
import ControlPanelProvider from '../context/controlPanel'
import HandsProvider from '../context/hands'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Navbar from '../components/NavBar'
import Popup from '../components/Popup'
import { ControlPanelContextType, HandsContextType, Props } from '../types'
import { getInformationText, primary } from '../modules/const'
import { useControlPanelContext } from '../context'

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
    willChange: 'margin',
  },
}

function AppWrapper(props: Props) {
  const router = useRouter()
  const { fullscreen, showUI, info, toggleInfo, loading } =
    useControlPanelContext()
  const [msgOpen, setMsg] = useState(true)

  const msgText = 'You can find more information in the control panel.'

  useEffect(() => {
    const timeId = setTimeout(() => {
      setMsg(false)
    }, 2000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  const closeInfo = () => {
    toggleInfo(false)
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
            opacity: showUI ? '1' : '0',
          },
        }}
      >
        <Navbar />
        {props.children}
      </Container>
      <Loader style={{ opacity: loading ? '1' : '0' }} />
      <ControlPanel />
      <Message
        style={{ opacity: msgOpen && !info ? '1' : '0' }}
        text={msgText}
        icon="arrow.svg"
        iconSize={50}
      />
      <Popup
        style={{ opacity: info ? '1' : '0' }}
        text={getInformationText(router.route)}
        icon="close.svg"
        togglePopup={closeInfo}
      />
    </div>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const [fullscreen, toggleFullscreen] = useState(false)
  const [playback, togglePlayback] = useState(false)
  const [showUI, toggleShowUI] = useState(true)
  const [info, toggleInfo] = useState(false)
  const [loading, toggleLoading] = useState(true)
  const [camReady, setCamReady] = useState(false)
  const [rightHand, setRightHand] = useState<Landmark[]>([])
  const [leftHand, setLeftHand] = useState<Landmark[]>([])

  const updateRightHand = (hand: Landmark[]) => {
    setRightHand(hand)
  }

  const updateLeftHand = (hand: Landmark[]) => {
    setLeftHand(hand)
  }

  const updateFullscreen = () => {
    toggleFullscreen(!fullscreen)
  }

  const updatePlayback = () => {
    togglePlayback(!playback)
  }

  const updateLoading = (load?: boolean) => {
    if (load != null) {
      toggleLoading(load)
    } else {
      toggleLoading(!loading)
    }
  }

  const updateShowUI = (show?: boolean) => {
    if (show != null) {
      toggleShowUI(show)
    } else {
      toggleShowUI(!showUI)
    }
  }

  const updateInfo = (open?: boolean) => {
    if (open != null) {
      toggleInfo(open)
    } else {
      toggleInfo(!info)
    }
  }

  const handContext = {
    camReady: camReady,
    updateCamReady: setCamReady,
    rightHand: rightHand,
    leftHand: leftHand,
    updateRightHand: updateRightHand,
    updateLeftHand: updateLeftHand,
  } as HandsContextType

  const controlPanelContext = {
    fullscreen: fullscreen,
    toggleFullscreen: updateFullscreen,
    playback: playback,
    togglePlayback: updatePlayback,
    showUI: showUI,
    toggleShowUI: updateShowUI,
    info: info,
    toggleInfo: updateInfo,
    loading: loading,
    toggleLoading: updateLoading,
  } as ControlPanelContextType

  return (
    <HandsProvider value={handContext}>
      <ControlPanelProvider value={controlPanelContext}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ControlPanelProvider>
    </HandsProvider>
  )
}
