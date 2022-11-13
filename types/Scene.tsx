import p5Types from 'p5'
import { HandsContextType } from './HandsContextType'

export type Scene = {
  init: (w: number, h: number) => void
  show: (p5: p5Types, hands: HandsContextType) => void
  onClick?: (p5: p5Types) => void
}
