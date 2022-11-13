import p5Types from 'p5'

import { hexToRgb, primary, shadow } from '../../const'
import Box from './Box'

export type FPSCounterParams = {
  x: number
  y: number
}

export default class FPSCounter {
  x: number
  y: number
  box: Box

  constructor(params: FPSCounterParams) {
    this.x = params.x
    this.y = params.y
    this.box = new Box({
      x: this.x,
      y: this.y,
      w: 85,
      h: 40,
      color: hexToRgb(primary),
      rounding: 2,
      shade: false,
    })
  }

  show(p5: p5Types) {
    this.box.show(p5)

    const text = `FPS: ${p5.frameRate().toFixed(0)}`
    p5.fill(hexToRgb(shadow))
    p5.noStroke()
    p5.textSize(16)
    p5.text(text, this.x + 10, this.y + 25)
  }
}
