import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import {
  BLACK,
  jointIdx,
  BROWN,
  YELLOW,
  BLUE,
  RED,
  GREEN,
} from '../../../modules/const'
import {
  avg,
  clamp,
  drawFPS,
  drawLandmarks,
  drawLegend,
  getAverageZ,
  getAvgCoordinates,
  queue,
} from '../../../modules/p5'
import { HandsContextType } from '../../../types'

let leftX = [0.5]
let rightX = [0.5]

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawAxes(p5, hands.leftHand, hands.rightHand)
  drawHands(p5, hands.leftHand, hands.rightHand)
  drawLegend(p5)
  drawFPS(p5)
}

const drawAxes = (p5: p5Types, left: Landmark[], right: Landmark[]) => {
  const leftHeight = p5.height / 4
  const rightHeight = (p5.height / 4) * 2
  const threshold = 0.55

  const l = getAvgCoordinates(left)
  const r = getAvgCoordinates(right)
  let alphaL = 100
  let alphaR = 100
  if (l) {
    queue(leftX, clamp(l[0] * 2))
    alphaL = l[2] > threshold ? 255 : 100
  }
  if (r) {
    queue(rightX, clamp((r[0] - 0.5) * 2))
    alphaR = r[2] > threshold ? 255 : 100
  }
  let lx = avg(leftX)
  let rx = avg(rightX)

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(lx * p5.width + 4, leftHeight - 16, 30, 60, 10)
  p5.rect(rx * p5.width + 4, rightHeight - 16, 30, 60, 10)
  p5.rect(14, leftHeight + 4, p5.width - 20, 20, 10)
  p5.rect(14, rightHeight + 4, p5.width - 20, 20, 10)

  p5.fill(BROWN())
  p5.rect(10, leftHeight, p5.width - 20, 20, 10)
  p5.rect(10, rightHeight, p5.width - 20, 20, 10)

  p5.fill(BLUE(alphaL))
  p5.rect(lx * p5.width, leftHeight - 20, 30, 60, 10)

  p5.fill(RED(alphaR))
  p5.rect(rx * p5.width, rightHeight - 20, 30, 60, 10)
}

const drawHands = (p5: p5Types, left: Landmark[], right: Landmark[]) => {
  const threshold = 0.55
  const x = 300
  const y = p5.height - 212
  const w = 630
  const h = 200

  p5.stroke(BLACK())
  p5.strokeWeight(3)
  p5.fill(BLACK())
  p5.rect(x + 8, y + 8, w, h, 10)

  p5.fill(YELLOW())
  p5.rect(x, y, w / 2, h, 10, 0, 0, 10)
  p5.rect(x + w / 2, y, w / 2, h, 0, 10, 10, 0)

  p5.fill(BLACK(5))
  p5.stroke(BLACK(30))

  if (left.length) {
    const z = getAverageZ(left)
    let lColor = z > threshold ? BLUE() : BLUE(50)

    if (z > threshold) {
      p5.stroke(BLACK())
      p5.strokeWeight(3)
      p5.fill(GREEN())
      p5.rect(x, y, w / 2, h, 10, 0, 0, 10)
    }

    drawLandmarks(p5, jointIdx('palm'), lColor, left, x, y, w, h)
    drawLandmarks(p5, jointIdx('thumb'), lColor, left, x, y, w, h)
    drawLandmarks(p5, jointIdx('index'), lColor, left, x, y, w, h)
    drawLandmarks(p5, jointIdx('middle'), lColor, left, x, y, w, h)
    drawLandmarks(p5, jointIdx('ring'), lColor, left, x, y, w, h)
    drawLandmarks(p5, jointIdx('pinky'), lColor, left, x, y, w, h)
  }

  if (right.length) {
    const z = getAverageZ(right)
    let lColor = z > threshold ? RED() : RED(50)

    if (z > threshold) {
      p5.stroke(BLACK())
      p5.strokeWeight(3)
      p5.fill(GREEN())
      p5.rect(x + w / 2, y, w / 2, h, 0, 10, 10, 0)
    }

    drawLandmarks(p5, jointIdx('palm'), lColor, right, x, y, w, h)
    drawLandmarks(p5, jointIdx('thumb'), lColor, right, x, y, w, h)
    drawLandmarks(p5, jointIdx('index'), lColor, right, x, y, w, h)
    drawLandmarks(p5, jointIdx('middle'), lColor, right, x, y, w, h)
    drawLandmarks(p5, jointIdx('ring'), lColor, right, x, y, w, h)
    drawLandmarks(p5, jointIdx('pinky'), lColor, right, x, y, w, h)
  }
}
export default scene
