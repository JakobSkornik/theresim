import { useContext } from 'react'

import { HandsContext } from './hands'
import { FullscreenContext } from './fullscreen'

export const useHandsContext = () => useContext(HandsContext)
export const useFullScreenContext = () => useContext(FullscreenContext)
