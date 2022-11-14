import { useContext } from 'react'

import { HandsContext } from './hands'
import { ControlPanelContext } from './controlPanel'

export const useHandsContext = () => useContext(HandsContext)
export const useControlPanelContext = () => useContext(ControlPanelContext)
