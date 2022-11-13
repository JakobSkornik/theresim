import p5Types from 'p5'

import FPSCounter from '../components/FPSCounter'
import Hand from '../components/Hand'
import NoHandsWarning from '../components/NoHandsWarning'
import P5Canvas from '../components/P5Canvas'
import {
  BLUE,
  fifth,
  hexToRgb,
  rightColor,
  shadow,
  tertiary,
} from '../../const'
import { HandsContextType } from '../../../types'

export default class CoordinateHandCanvas implements P5Canvas {
  fpsCounter: FPSCounter
  hand: Hand
  noHandsWarning: NoHandsWarning
  h: number

  constructor(w: number, h: number) {
    this.h = h

    this.fpsCounter = new FPSCounter({
      x: w - 105,
      y: h - 70,
    })

    this.hand = new Hand({
      x: 20,
      y: 80,
      w: w - 40,
      h: h - 110,
      color: hexToRgb(shadow),
    })

    this.noHandsWarning = new NoHandsWarning({
      x: 10,
      y: 10,
      w: w - 20,
      h: h - 20,
    })
  }

  show(p5: p5Types, hands: HandsContextType): void {
    this.fpsCounter.show(p5)
    this.hand.show(p5, hands.leftHand)
    this.noHandsWarning.show(p5, hands)

    const x0 = 40
    const y0 = this.h - 40

    p5.textSize(12)

    p5.strokeWeight(2)
    p5.stroke(hexToRgb(tertiary))
    p5.fill(hexToRgb(tertiary))
    p5.line(x0, y0, x0, y0 - 100)
    p5.triangle(x0 - 3, y0 - 99, x0 + 3, y0 - 99, x0, y0 - 106)
    p5.noStroke()
    p5.text('x', x0 - 15, y0 - 100)

    p5.strokeWeight(2)
    p5.stroke(hexToRgb(rightColor))
    p5.fill(hexToRgb(rightColor))
    p5.line(x0, y0, x0 + 100, y0)
    p5.triangle(x0 + 99, y0 - 3, x0 + 99, y0 + 3, x0 + 106, y0)
    p5.noStroke()
    p5.text('y', x0 + 99, y0 + 15)

    p5.strokeWeight(2)
    p5.stroke(hexToRgb(fifth))
    p5.fill(hexToRgb(fifth))
    p5.line(x0, y0, x0 + 55, y0 - 30)
    p5.triangle(x0 + 60, y0 - 33, x0 + 52, y0 - 33, x0 + 57, y0 - 27)
    p5.noStroke()
    p5.text('z', x0 + 45, y0 - 40)
  }

  onClick(): void {}
}
