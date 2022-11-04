import { Landmark } from '@mediapipe/hands'
import { createContext, FC, ReactNode, useState } from 'react'

import { HandsContextType, Props } from '../types'

export const HandsContext = createContext<HandsContextType | null>(null)

const HandsProvider: FC<Props> = ({ children }) => {
  const [rightHand, setRightHand] = useState<Landmark[]>([])
  const [leftHand, setLeftHand] = useState<Landmark[]>([])

  const updateRightHand = (hand: Landmark[]) => {
    setRightHand(hand)
  }
  const updateLeftHand = (hand: Landmark[]) => {
    setLeftHand(hand)
  }

  const value: HandsContextType = {
    rightHand,
    leftHand,
    updateRightHand,
    updateLeftHand,
  }

  return <HandsContext.Provider value={value}>{children}</HandsContext.Provider>
}

export default HandsProvider
