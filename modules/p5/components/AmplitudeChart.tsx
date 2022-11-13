import p5Types from 'p5'
import { Landmark } from '@mediapipe/hands'

import Box from './Box'
import { clamp, getAvgCoordinates } from '..'
import {
  AAK,
  BISCAY,
  CYAN,
  GRAY,
  hexToRgb,
  RED,
  shadow,
  YELLOW,
} from '../../const'

export type AmplitudeChartParams = {
  x: number
  y: number
  w: number
  h: number
  title: string
}

export default class AmplitudeChart {
  x: number
  y: number
  w: number
  h: number
  title: string
  box: Box
  queue: number[][] = []

  constructor(params: AmplitudeChartParams) {
    this.x = params.x
    this.y = params.y
    this.w = params.w
    this.h = params.h
    this.title = params.title

    this.box = new Box({
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      color: BISCAY(),
      rounding: 2,
      stroke: 1,
      shade: false,
    })
  }

  show(p5: p5Types, hand: Landmark[]) {
    this.box.show(p5)

    const offsetX = this.x + 10
    const offsetY = this.y + 10
    const chartOffsetY = offsetY + 30
    const maxX = this.x + this.w - 30
    const maxY = this.y + this.h - 30
    const accuracy = 1000
    const anchor = [
      this.w + this.x - 1,
      chartOffsetY + (maxY - chartOffsetY) / 2,
    ]
    const h = maxY - chartOffsetY

    p5.noStroke()
    p5.fill(hexToRgb(shadow))
    p5.textSize(16)
    p5.text(
      this.title,
      offsetX + (this.w - p5.textWidth(this.title)) / 2,
      offsetY + 20,
    )
    p5.text('0', maxX - 10, maxY + 15)
    p5.text('1', maxX - 10, offsetY + 25)

    p5.stroke(CYAN())
    p5.strokeWeight(1)

    const chartOffset = 30
    p5.line(offsetX, maxY, offsetX, offsetY + chartOffset)
    p5.line(maxX, maxY, maxX, offsetY + chartOffset)

    p5.stroke(CYAN(50))
    p5.line(
      offsetX,
      chartOffsetY + (maxY - chartOffsetY) / 2,
      maxX,
      chartOffsetY + (maxY - chartOffsetY) / 2,
    )
    p5.stroke(CYAN())
    p5.line(offsetX, maxY, maxX, maxY)
    p5.line(offsetX, chartOffsetY, maxX, offsetY + chartOffset)

    p5.fill(CYAN(30))
    p5.rect(offsetX, chartOffsetY, maxX - offsetX, h)

    const coords = getAvgCoordinates(hand)
    p5.stroke(AAK())
    if (coords) {
      const y = clamp(coords[1], 0, 1)
      this.queue.unshift([accuracy, y])

      p5.line(anchor[0], anchor[1], maxX, chartOffsetY + (1 - y) * h)
    } else {
      p5.line(anchor[0], anchor[1], anchor[0] - 30, anchor[1])
    }

    p5.stroke(GRAY())
    p5.fill(GRAY())
    p5.circle(anchor[0], anchor[1], 5)

    p5.stroke(hexToRgb(shadow))
    for (let i = 1; i < this.queue.length; i++) {
      if (
        this.queue[i - 1][0] == accuracy ||
        this.queue[i - 1][0] - this.queue[i][0] > 20
      ) {
        this.queue[i][0]--
        continue
      }

      p5.strokeWeight(1)
      p5.line(
        maxX - (1 - this.queue[i][0] / accuracy) * (maxX - offsetX),
        chartOffsetY + (1 - this.queue[i][1]) * h,
        maxX - (1 - this.queue[i - 1][0] / accuracy) * (maxX - offsetX),
        chartOffsetY + (1 - this.queue[i - 1][1]) * h,
      )
      this.queue[i][0]--
    }

    this.queue = this.queue.filter(el => el[0] > 0)
  }
}
