import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Landmark } from '@mediapipe/hands'
import type { AppProps } from 'next/app'

import AppWrapper from '../components/AppWrapper'
import ControlPanelProvider from '../context/controlPanel'
import HandsProvider from '../context/hands'
import { ControlPanelContextType, HandsContextType } from '../types'

export default function App({ Component, pageProps, router }: AppProps) {
  const [fullscreen, toggleFullscreen] = useState(false)
  const [playback, togglePlayback] = useState(false)
  const [showUI, toggleShowUI] = useState(true)
  const [info, toggleInfo] = useState(false)
  const [loading, toggleLoading] = useState(true)
  const [camReady, setCamReady] = useState(false)
  const [rightHand, setRightHand] = useState<Landmark[]>([])
  const [leftHand, setLeftHand] = useState<Landmark[]>([])

  // Disable the alert function for the app
  useEffect(() => {
    window.alert = () => {}
  }, [])

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

  const updateCamReady = (ready: boolean) => {
    setCamReady(ready)
  }

  const handContext = {
    camReady: camReady,
    updateCamReady: updateCamReady,
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
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.pathname} />
          </AnimatePresence>
        </AppWrapper>
      </ControlPanelProvider>
    </HandsProvider>
  )
}
