import { Landmark } from "@mediapipe/hands"

export type HandsContextType = {
  rightHand: Landmark[]
  leftHand: Landmark[]
  updateRightHand: (hand: Landmark[]) => void
  updateLeftHand: (hand: Landmark[]) => void
}
