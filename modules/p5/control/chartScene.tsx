import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, BLUE, RED } from '../../const'
import { getAvgCoordinates } from '..'
import { HandsContextType } from '../../../types'

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawRightPanel(p5, hands.leftHand, hands.rightHand)
}

const drawRightPanel = (p5: p5Types, left: Landmark[], right: Landmark[]) => {
  const x_offset = 10
  let l = getAvgCoordinates(left)
  let r = getAvgCoordinates(right)
  const vertScale = p5.height - 120

  if (!l) l = [0.01, 0.01, 0.01]
  if (!r) r = [0.01, 0.01, 0.01]

  p5.textSize(20)
  p5.fill(BLACK())
  p5.text('0', x_offset + 0, p5.height - 80)
  p5.text('1', x_offset + 0, 30)
  p5.strokeWeight(2)
  p5.stroke(0)
  p5.line(x_offset + 30, 25, x_offset + 30, p5.height - 82)
  p5.line(x_offset + 30, p5.height - 82, x_offset + 280, p5.height - 82)
  
  p5.noStroke()
  p5.fill(BLACK(30))
  p5.rect(x_offset + 30, 25, 250, p5.height - 107)

  bar(p5, 60, l[1] * vertScale, BLUE())
  p5.fill(BLACK())
  p5.text(`L: ${l[1].toFixed(2)}`, 60, p5.height - 40)

  bar(p5, 170, r[1] * vertScale, RED())
  p5.fill(BLACK())
  p5.text(`R: ${r[1].toFixed(2)}`, 170, p5.height - 40)
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
