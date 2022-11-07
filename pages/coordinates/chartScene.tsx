import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'
import { BLACK, BLUE, GREEN, RED } from '../../modules/const'
import { avg, getAvgCoordinates, queue } from '../../modules/p5'

import { HandsContextType } from '../../types'

let x = [0.01]
let y = [0.01]
let z = [0.01]

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawRightPanel(p5, hands.leftHand)
}

const drawRightPanel = (p5: p5Types, hand: Landmark[]) => {
  const x_offset = 10

  let l = getAvgCoordinates(hand)
  const vertScale = p5.height - 120
  if (!l) l = [0.01, 0.01, 0.01]
  queue(x, l[0], 20)
  queue(y, l[1], 20)
  queue(z, l[2], 20)
  const avgX = avg(x)
  const avgY = avg(y)
  const avgZ = avg(z)

  p5.textSize(20)
  p5.fill(BLACK())
  p5.text('0', x_offset, p5.height - 75)
  p5.text('1', x_offset, 30)
  p5.strokeWeight(2)
  p5.stroke(0)
  p5.line(x_offset + 20, 25, x_offset + 20, p5.height - 82)
  p5.line(x_offset + 20, p5.height - 82, x_offset + 360, p5.height - 82)

  p5.noStroke()
  p5.fill(BLACK(30))
  p5.rect(x_offset + 20, 25, x_offset + 340, p5.height - 107)

  bar(p5, x_offset + 40, avgX * vertScale, RED())
  p5.fill(BLACK())
  p5.text(`X: ${avgX.toFixed(2)}`, x_offset + 55, p5.height - 40)

  bar(p5, x_offset + 150, avgY * vertScale, GREEN())
  p5.fill(BLACK())
  p5.text(`Y: ${avgY.toFixed(2)}`, x_offset + 165, p5.height - 40)

  bar(p5, x_offset + 260, avgZ * vertScale, BLUE())
  p5.fill(BLACK())
  p5.text(`Z: ${avgZ.toFixed(2)}`, x_offset + 275, p5.height - 40)
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
