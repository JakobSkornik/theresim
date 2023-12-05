import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'

import AppWrapper from '../components/AppWrapper'
import ControlPanelProvider from '../context/controlPanel'
import { ControlPanelContextType } from '../types'

export default function App({ Component, pageProps, router }: AppProps) {
  const [playback, togglePlayback] = useState(true)
  const [thumb, toggleThumb] = useState(true)
  const [fullHand, toggleFullHand] = useState(true)
  const [showUI, toggleShowUI] = useState(true)
  const [info, toggleInfo] = useState(false)
  const [loading, toggleLoading] = useState(true)

  // Disable the alert function for the app
  useEffect(() => {
    window.alert = () => {}
  }, [])

  const updatePlayback = () => {
    togglePlayback(!playback)
  }

  const updateThumb = () => {
    toggleThumb(!thumb)
  }

  const updateFullHand= () => {
    toggleFullHand(!fullHand)
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

  const controlPanelContext = {
    playback: playback,
    togglePlayback: updatePlayback,
    thumbTriggerMode: thumb,
    toggleThumbTriggerMode: updateThumb,
    fullHandMode: fullHand,
    toggleFullHandMode: updateFullHand,
    showUI: showUI,
    toggleShowUI: updateShowUI,
    info: info,
    toggleInfo: updateInfo,
    loading: loading,
    toggleLoading: updateLoading,
  } as ControlPanelContextType

  return (
    <ControlPanelProvider value={controlPanelContext}>
      <AppWrapper>
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.pathname} />
        </AnimatePresence>
      </AppWrapper>
    </ControlPanelProvider>
  )
}
