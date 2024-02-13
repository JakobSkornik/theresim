import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'

import AppWrapper from '../components/AppWrapper'
import ControlPanelProvider from '../context/controlPanel'
import { ControlPanelContextType, TutorialContextType } from '../types'
import TutorialProvider from '../context/tutorial'

export default function App({ Component, pageProps, router }: AppProps) {
  const [playback, togglePlayback] = useState(true)
  const [thumb, toggleThumb] = useState(false)
  const [fullHand, toggleFullHand] = useState(false)
  const [showUI, toggleShowUI] = useState(true)
  const [info, toggleInfo] = useState(false)
  const [loading, toggleLoading] = useState(true)

  const [tutorialStage, setTutorialStage] = useState(0)

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

  const updateFullHand = () => {
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

  const setStage = (stage: number) => {
    setTutorialStage(stage)
  }

  const tutorialContext = {
    stage: tutorialStage,
    setStage: setStage,
  } as TutorialContextType

  return (
    <ControlPanelProvider value={controlPanelContext}>
      <TutorialProvider value={tutorialContext}>
        <AppWrapper>
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.pathname} />
          </AnimatePresence>
        </AppWrapper>
      </TutorialProvider>
    </ControlPanelProvider>
  )
}
