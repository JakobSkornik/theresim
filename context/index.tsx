import { useContext } from 'react'

import { ControlPanelContext } from './controlPanel'
import { TutorialContext } from './tutorial'

export const useControlPanelContext = () => useContext(ControlPanelContext)
export const useTutorialContext = () => useContext(TutorialContext)
