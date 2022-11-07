import p5Types from 'p5'
import { HandsContextType } from './HandsContextType'

export type P5ContainerProps = {
  title: string
  mediapipe: boolean
  scene: (p5: p5Types, hands: HandsContextType) => void
  icon?: string
}
