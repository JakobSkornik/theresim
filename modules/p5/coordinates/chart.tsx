import p5Types from 'p5'
import { BLACK, fifth, hexToRgb, primary, rightColor, secondary, shadow, tertiary, yellow } from '../../const'
import { avg, getAvgCoordinates, queue } from '..'

import { HandsContextType } from '../../../types'
import P5Canvas from '../components/P5Canvas'

export default class CoordinateChartCanvas implements P5Canvas {
  minWidth: number = 280
  x: number[] = [0.01]
  y: number[] = [0.01]
  z: number[] = [0.01]
  w: number
  h: number

  constructor(w: number, h: number) {
    this.w = w < 110 ? 110 : w
    this.h = h
  }

  show(p5: p5Types, hands: HandsContextType): void {
    const minX = 30
    const minY = 80
    const chartOffsetX = 20
    const chartOffsetY = 80
    const maxY = this.h - chartOffsetY
    const maxX = this.w - 30

    let l = getAvgCoordinates(hands.leftHand)
    if (!l) l = [0.01, 0.01, 0.01]
    queue(this.x, l[0], 20)
    queue(this.y, l[1], 20)
    queue(this.z, l[2], 20)
    const avgX = avg(this.x)
    const avgY = avg(this.y)
    const avgZ = avg(this.z)

    p5.textSize(16)
    p5.fill(hexToRgb(shadow))
    p5.text('0', minX, maxY)
    p5.text('1', minX, minY)

    p5.strokeWeight(1)
    p5.fill(hexToRgb(shadow))
    p5.line(minX + chartOffsetX, minY, minX + chartOffsetX, maxY)
    p5.line(minX + chartOffsetX, maxY, maxX, maxY)

    p5.noStroke()
    p5.fill(BLACK(30))
    p5.rect(minX + chartOffsetX, minY, maxX - minX - chartOffsetX, maxY - minY)

    const barMargin = 10
    const barWidth = (maxX - chartOffsetX - minX - 3 * barMargin) / 3
    const x1 = minX + barMargin + chartOffsetX
    const x2 = x1 + barMargin + barWidth
    const x3 = x2 + barMargin + barWidth
    const y = this.h - 40

    this.bar(p5, x1, avgX * (maxY - chartOffsetY), barWidth, maxY, hexToRgb(tertiary))
    this.bar(p5, x2, avgY * (maxY - chartOffsetY), barWidth, maxY, hexToRgb(rightColor))
    this.bar(p5, x3, avgZ * (maxY - chartOffsetY), barWidth, maxY, hexToRgb(fifth))

    if (this.w < 320) {
      return
    }

    const t1 = `X: ${avgX.toFixed(2)}`
    const t2 = `Y: ${avgY.toFixed(2)}`
    const t3 = `Z: ${avgZ.toFixed(2)}`

    p5.fill(hexToRgb(shadow))
    p5.text(t1, x1 + (barWidth - p5.textWidth(t1)) / 2, y)
    p5.text(t2, x2 + (barWidth - p5.textWidth(t2)) / 2, y)
    p5.text(t3, x3 + (barWidth - p5.textWidth(t3)) / 2, y)
  }

  bar(
    p5: p5Types,
    x: number,
    y: number,
    w: number,
    maxH: number,
    color: number[],
  ) {
    p5.noStroke()
    p5.fill(hexToRgb(shadow))
    p5.rect(x + 4, maxH - y + 4, w, y)
    p5.fill(color)
    p5.rect(x, maxH - y, w, y)
  }

  onClick(): void {}
}
