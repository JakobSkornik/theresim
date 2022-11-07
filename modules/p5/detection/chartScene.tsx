import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'
import { BLACK, BLUE, GRAY, RED } from '../../../modules/const'
import { avg, getAverageZ, queue } from '../../../modules/p5'

import { HandsContextType } from '../../../types'

const leftZ = [0.01]
const rightZ = [0.01]

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawRightPanel(p5, hands.leftHand, hands.rightHand)
}

const drawRightPanel = (p5: p5Types, left: Landmark[], right: Landmark[]) => {
  const x_offset = 20
  const vertScale = p5.height - 120
  const threshold = 0.55
  const lz = getAverageZ(left)
  const rz = getAverageZ(right)

  let leftColor = lz > threshold ? BLUE() : GRAY()
  let rightColor = rz > threshold ? RED() : GRAY()

  queue(leftZ, lz, 10)
  queue(rightZ, rz, 10)
  const avgLZ = avg(leftZ)
  const avgRZ = avg(rightZ)

  p5.textSize(20)
  p5.fill(BLACK())
  p5.text('0', x_offset + 0, p5.height - 75)
  p5.text('0.55', x_offset + 0, (p5.height - 80) / 2)
  p5.text('1', x_offset + 0, 30)
  p5.strokeWeight(2)
  p5.stroke(0)
  p5.line(x_offset + 50, 25, x_offset + 50, p5.height - 82)
  p5.line(x_offset + 50, p5.height - 82, x_offset + 270, p5.height - 82)

  p5.noStroke()
  p5.fill(BLACK(30))
  p5.rect(x_offset + 50, 25, 220, p5.height - 107)

  bar(p5, x_offset + 60, avgLZ * vertScale, leftColor)
  p5.fill(BLACK())
  p5.text(`L: ${avgLZ.toFixed(2)}`, x_offset + 60, p5.height - 40)

  bar(p5, x_offset + 170, avgRZ * vertScale, rightColor)
  p5.fill(BLACK())
  p5.text(`R: ${avgRZ.toFixed(2)}`, x_offset + 170, p5.height - 40)
}

const bar = (p5: p5Types, x: number, y: number, color: number[]) => {
  const w = 90
  const maxH = p5.height - 80

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(x + 4, maxH - y + 4, w, y)
  p5.fill(color)
  p5.rect(x, maxH - y, w, y)
}

export default scene
