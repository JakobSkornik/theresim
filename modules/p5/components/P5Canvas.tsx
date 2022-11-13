import p5Types from 'p5'
import { HandsContextType } from '../../../types'

export default class P5Canvas {
  constructor(w: number, h: number) {}

  show(p5: p5Types, hands: HandsContextType): void {
    throw new Error('Method not implemented.')
  }

  onClick(p5: p5Types): void {
    throw new Error('Method not implemented.')
  }
}