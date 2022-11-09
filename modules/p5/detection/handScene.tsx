import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, lmIdx, GRAY, BLUE, RED } from '../../const'
import {
  drawFPS,
  drawLandmarks,
  drawLegend,
  drawNoHandsWarning,
  getAverageZ,
} from '..'
import { HandsContextType } from '../../../types'

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
    drawLandmarks(p5, lmIdx('palm'), color, left)
    drawLandmarks(p5, lmIdx('thumb'), color, left)
    drawLandmarks(p5, lmIdx('index'), color, left)
    drawLandmarks(p5, lmIdx('middle'), color, left)
    drawLandmarks(p5, lmIdx('ring'), color, left)
    drawLandmarks(p5, lmIdx('pinky'), color, left)
  }
  if (right.length) {
    let color = getAverageZ(right) > threshold ? RED() : GRAY()
    drawLandmarks(p5, lmIdx('palm'), color, right)
    drawLandmarks(p5, lmIdx('thumb'), color, right)
    drawLandmarks(p5, lmIdx('index'), color, right)
    drawLandmarks(p5, lmIdx('middle'), color, right)
    drawLandmarks(p5, lmIdx('ring'), color, right)
    drawLandmarks(p5, lmIdx('pinky'), color, right)
  }
}

export default scene
