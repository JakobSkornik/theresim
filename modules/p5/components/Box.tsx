import p5Types from 'p5'

import { BLACK, borderColor, hexToRgb, shadow, YELLOW } from '../../const'
import P5Element, { P5ElementParams } from './P5Element'

export type BoxParams = P5ElementParams & {
  w: number
  h: number
  color?: number[]
  rounding?: number
  roundingCorners?: number[]
  shade?: boolean
  shadeColor?: number[]
  stroke?: number
}

export default class Box extends P5Element {
  w: number
  h: number
  color: number[]
  rounding: number
  roundingCorners: number[]
  shade: boolean
  shadeColor: number[]
  stroke: number

  constructor(params: BoxParams) {
    super(params as P5ElementParams)
    this.w = params.w
    this.h = params.h
    this.color = params.color ?? YELLOW()
    this.rounding = params.rounding ?? 8
    this.roundingCorners = params.roundingCorners ?? []
    this.shade = params.shade ?? true
    this.shadeColor = params.shadeColor ?? hexToRgb(shadow)
    this.stroke = params.stroke ?? 1

    if (this.roundingCorners.length != 4) {
      this.roundingCorners = []
    }
  }

  show(p5: p5Types) {
    p5.noStroke()
    p5.fill(this.shadeColor)

    if (this.shade) {
      if (this.roundingCorners.length) {
        p5.rect(
          this.x + 4,
          this.y + 4,
          this.w,
          this.h,
          this.roundingCorners[0],
          this.roundingCorners[1],
          this.roundingCorners[2],
          this.roundingCorners[3],
        )
      } else {
        p5.rect(this.x + 4, this.y + 4, this.w, this.h, this.rounding)
      }
    }

    p5.stroke([...hexToRgb(borderColor), 100])
    p5.strokeWeight(this.stroke)
    p5.fill(this.color)
    if (this.roundingCorners.length) {
      p5.rect(
        this.x,
        this.y,
        this.w,
        this.h,
        this.roundingCorners[0],
        this.roundingCorners[1],
        this.roundingCorners[2],
        this.roundingCorners[3],
      )
    } else {
      p5.rect(this.x, this.y, this.w, this.h, this.rounding)
    }
  }
}
