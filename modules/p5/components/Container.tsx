import p5Types from 'p5'
import { hexToRgb, primary, shadow } from '../../const'

import Box, { BoxParams } from './Box'

export type ContainerParams = BoxParams & {
  title: string
  titleColor?: number[]
  titleTextColor?: number[]
}

export default class Container {
  title: string
  x: number
  y: number
  w: number
  h: number
  titleColor: number[]
  titleTextColor: number[]
  body: Box
  titleBar: Box

  constructor(params: ContainerParams) {
    this.title = params.title
    this.x = params.x
    this.y = params.y
    this.w = params.w
    this.h = params.h
    this.titleColor = params.titleColor ?? [...hexToRgb(primary), 20]
    this.titleTextColor = params.titleTextColor ?? hexToRgb(shadow)

    this.body = new Box({
      ...params,
      ...{ color: [...hexToRgb(primary), 200], rounding: 2 },
      shade: false,
    })

    this.titleBar = new Box({
      x: this.x,
      y: this.y,
      w: this.w,
      h: 50,
      color: this.titleColor,
      roundingCorners: [2, 2, 0, 0],
      shade: false,
    })
  }

  show(p5: p5Types) {
    this.body.show(p5)
    this.titleBar.show(p5)

    p5.fill(this.titleTextColor)
    p5.noStroke()
    p5.textSize(20)
    p5.textLeading(20)
    p5.text(this.title, this.x + 15, this.y + 35)
  }
}
