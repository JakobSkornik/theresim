import p5Types from 'p5'
import { Landmark } from '@mediapipe/hands'

import Box from './Box'
import { clamp, getAvgCoordinates } from '../hooks'
import { AAK, BISCAY, CYAN, GRAY, hexToRgb, shadow } from '../../const'

export type FrequencyChartParams = {
  x: number
  y: number
  w: number
  h: number
  title: string
}

export default class FrequencyChart {
  x: number
  y: number
  w: number
  h: number
  title: string
  box: Box
  queue: number[][] = []

  constructor(params: FrequencyChartParams) {
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
    const maxX = this.x + this.w - 10
    const maxY = this.y + this.h - 30
    const accuracy = 1000
    const anchor = [offsetX + (maxX - offsetX) / 2, this.h + this.y - 1]
    const chartOffsetY = offsetY + 30
    const h = maxY - chartOffsetY
    const w = maxX - offsetX

    p5.noStroke()
    p5.fill(hexToRgb(shadow))
    p5.textSize(16)
    p5.text(
      this.title,
      offsetX + (this.w - p5.textWidth(this.title)) / 2,
      offsetY + 20,
    )
    p5.text('0', offsetX, maxY + 15)
    p5.text('1', maxX - 10, maxY + 15)

    p5.stroke(CYAN())
    p5.strokeWeight(1)

    const chartOffset = 30
    p5.line(offsetX, maxY, offsetX, offsetY + chartOffset)
    p5.line(maxX, maxY, maxX, offsetY + chartOffset)

    p5.stroke(CYAN(50))
    p5.line(
      offsetX + (maxX - offsetX) / 2,
      maxY,
      offsetX + (maxX - offsetX) / 2,
      offsetY + chartOffset,
    )
    p5.stroke(CYAN())
    p5.line(offsetX, maxY, maxX, maxY)
    p5.line(offsetX, offsetY + 30, maxX, offsetY + chartOffset)

    p5.fill(CYAN(30))
    p5.rect(offsetX, offsetY + 30, maxX - offsetX, h)

    const coords = getAvgCoordinates(hand)
    p5.stroke(AAK())
    if (coords) {
      const x = clamp(coords[0], 0, 1)
      this.queue.unshift([x, accuracy])

      p5.line(anchor[0], anchor[1], offsetX + x * (maxX - offsetX), maxY)
    } else {
      p5.line(anchor[0], anchor[1], anchor[0], anchor[1] - 30)
    }

    p5.stroke(GRAY())
    p5.fill(GRAY())
    p5.circle(anchor[0], anchor[1], 5)

    p5.stroke(hexToRgb(shadow))
    for (let i = 1; i < this.queue.length; i++) {
      if (
        this.queue[i - 1][1] == accuracy ||
        this.queue[i - 1][1] - this.queue[i][1] > 20
      ) {
        this.queue[i][1]--
        continue
      }

      p5.strokeWeight(1)
      p5.line(
        offsetX + this.queue[i][0] * w,
        maxY - (1 - this.queue[i][1] / accuracy) * h,
        offsetX + this.queue[i - 1][0] * w,
        maxY - (1 - this.queue[i - 1][1] / accuracy) * h,
      )

      this.queue[i][1]--
    }

    this.queue = this.queue.filter(el => el[1] > 0)   
  }
}
