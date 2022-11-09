import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, BLUE, lmIdx } from '../../../modules/const'
import { drawFPS, drawLandmarks, drawNoHandsWarning } from '../../../modules/p5'
import { HandsContextType } from '../../../types'

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawHands(p5, hands.leftHand)
  drawFPS(p5)
  drawNoHandsWarning(p5, hands, 'coords')
}

const drawHands = (p5: p5Types, left: Landmark[]) => {
  p5.fill(BLACK(5))
  p5.stroke(BLACK(30))
  p5.strokeWeight(1)
  if (left.length) {
    drawLandmarks(p5, lmIdx('palm'), BLUE(), left)
    drawLandmarks(p5, lmIdx('thumb'), BLUE(), left)
    drawLandmarks(p5, lmIdx('index'), BLUE(), left)
    drawLandmarks(p5, lmIdx('middle'), BLUE(), left)
    drawLandmarks(p5, lmIdx('ring'), BLUE(), left)
    drawLandmarks(p5, lmIdx('pinky'), BLUE(), left)
  }
}

export default scene
