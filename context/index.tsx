import { useContext } from 'react'

import { HandsContext } from './hands'
import { FullscreenContext } from './fullscreen'
import { VideoPlaybackContext } from './playback'

export const useHandsContext = () => useContext(HandsContext)
export const useFullScreenContext = () => useContext(FullscreenContext)
export const usePlaybackContext = () => useContext(VideoPlaybackContext)
