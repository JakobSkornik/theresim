import p5Types from 'p5'
import { HandsController } from '../modules/mediapipe'

export type Scene = {
  init: (w: number, h: number) => void
  show: (p5: p5Types, hands: HandsController) => void
  onClick?: (p5: p5Types) => void
}
