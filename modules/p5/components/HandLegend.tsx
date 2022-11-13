import p5Types from 'p5'

import { hexToRgb, leftColor, primary, rightColor, shadow } from '../../const'
import Box from './Box'

export type HandLegendParams = {
  x: number
  y: number
}

export default class HandLegend {
  x: number
  y: number
  box: Box

  constructor(params: HandLegendParams) {
    this.x = params.x
    this.y = params.y

    this.box = new Box({
      x: this.x,
      y: this.y,
      w: 160,
      h: 140,
      color: hexToRgb(primary),
      rounding: 2,
      shade: false,
    })
  }

  show(p5: p5Types) {
    this.box.show(p5)

    p5.noStroke()
    p5.fill(rightColor)
    p5.rect(this.x + 10, this.y + 20, 40, 40)
    p5.fill(leftColor)
    p5.rect(this.x + 10, this.y + 80, 40, 40)
    p5.fill(shadow)
    p5.text('- Right', this.x + 70, this.y + 50)
    p5.text('- Left', this.x + 70, this.y + 110)
  }
}
