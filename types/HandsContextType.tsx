import { Landmark } from "@mediapipe/hands"

export type HandsContextType = {
  camReady: boolean
  rightHand: Landmark[]
  leftHand: Landmark[]
  updateCamReady: (ready: boolean) => void
  updateRightHand: (hand: Landmark[]) => void
  updateLeftHand: (hand: Landmark[]) => void
}
