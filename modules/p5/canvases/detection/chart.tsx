import p5Types from 'p5'

import P5Canvas from '../../components/P5Canvas'
import {
  BLACK,
  hexToRgb,
  leftColor,
  PENCIL,
  rightColor,
  shadow,
} from '../../../const'
import { avg, getAverageZ, queue } from '../../hooks'
import { HandsContextType } from '../../../../types'

export default class CoordinateChartCanvas implements P5Canvas {
  minWidth: number = 280
  threshold: number = 0.54
  lz: number[] = [0.01]
  rz: number[] = [0.01]
  w: number
  h: number

  constructor(w: number, h: number) {
    this.w = w < 110 ? 110 : w
    this.h = h
  }

  show(p5: p5Types, hands: HandsContextType): void {
    const minX = 30
    const minY = 80
    const chartOffsetX = 50
    const chartOffsetY = 80
    const maxY = this.h - chartOffsetY
    const maxX = this.w - 30

    let l = getAverageZ(hands.leftHand)
    let r = getAverageZ(hands.rightHand)
    if (!l) l = 0.01
    if (!r) r = 0.01
    queue(this.lz, l, 20)
    queue(this.rz, r, 20)
    const avgL = avg(this.lz)
    const avgR = avg(this.rz)

    p5.textSize(20)
    p5.fill(hexToRgb(shadow))
    p5.text('0', minX, maxY)
    p5.text('1', minX, minY)
    p5.text(
      this.threshold.toFixed(2),
      minX,
      (1 - this.threshold) * (maxY - minY) + minY,
    )

    p5.strokeWeight(1)
    p5.fill(hexToRgb(shadow))
    p5.line(minX + chartOffsetX, minY, minX + chartOffsetX, maxY)
    p5.line(minX + chartOffsetX, maxY, maxX, maxY)

    p5.noStroke()
    p5.fill(BLACK(30))
    p5.rect(minX + chartOffsetX, minY, maxX - minX - chartOffsetX, maxY - minY)

    const barMargin = 10
    const barWidth = (maxX - chartOffsetX - minX - 2 * barMargin) / 2
    const x1 = minX + barMargin + chartOffsetX
    const x2 = x1 + barMargin + barWidth
    const y = this.h - 40

    const lCol = avgL <= this.threshold ? PENCIL() : hexToRgb(leftColor)
    const rCol = avgR <= this.threshold ? PENCIL() : hexToRgb(rightColor)

    this.bar(p5, x1, avgL * (maxY - minY), barWidth, maxY, lCol)
    this.bar(p5, x2, avgR * (maxY - minY), barWidth, maxY, rCol)

    if (this.w < 200) {
      return
    }

    const t1 = `L: ${avgL.toFixed(2)}`
    const t2 = `R: ${avgR.toFixed(2)}`

    p5.fill(hexToRgb(shadow))
    p5.text(t1, x1 + (barWidth - p5.textWidth(t1)) / 2, y)
    p5.text(t2, x2 + (barWidth - p5.textWidth(t2)) / 2, y)
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
