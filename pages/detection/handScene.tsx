import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, jointIdx, GRAY, BLUE, RED } from '../../modules/const'
import {
  drawFPS,
  drawLandmarks,
  drawLegend,
  drawNoHandsWarning,
  getAverageZ,
} from '../../modules/p5'
import { HandsContextType } from '../../types'

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawHands(p5, hands.leftHand, hands.rightHand)
  drawLegend(p5)
  drawFPS(p5)
  drawNoHandsWarning(p5, hands, 'detection')
}

const drawHands = (p5: p5Types, left: Landmark[], right: Landmark[]) => {
  const threshold = 0.55

  p5.fill(BLACK(5))
  p5.stroke(BLACK(30))
  p5.strokeWeight(1)
  if (left.length) {
    let color = getAverageZ(left) > threshold ? BLUE() : GRAY()
    drawLandmarks(p5, jointIdx('palm'), color, left)
    drawLandmarks(p5, jointIdx('thumb'), color, left)
    drawLandmarks(p5, jointIdx('index'), color, left)
    drawLandmarks(p5, jointIdx('middle'), color, left)
    drawLandmarks(p5, jointIdx('ring'), color, left)
    drawLandmarks(p5, jointIdx('pinky'), color, left)
  }
  if (right.length) {
    let color = getAverageZ(right) > threshold ? RED() : GRAY()
    drawLandmarks(p5, jointIdx('palm'), color, right)
    drawLandmarks(p5, jointIdx('thumb'), color, right)
    drawLandmarks(p5, jointIdx('index'), color, right)
    drawLandmarks(p5, jointIdx('middle'), color, right)
    drawLandmarks(p5, jointIdx('ring'), color, right)
    drawLandmarks(p5, jointIdx('pinky'), color, right)
  }
}

export default scene
