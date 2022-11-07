import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, BLUE, jointIdx } from '../../modules/const'
import { drawFPS, drawLandmarks } from '../../modules/p5'
import { HandsContextType } from '../../types'

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawHands(p5, hands.leftHand)
  drawFPS(p5)
}

const drawHands = (p5: p5Types, left: Landmark[]) => {
  p5.fill(BLACK(5))
  p5.stroke(BLACK(30))
  p5.strokeWeight(1)
  if (left.length) {
    drawLandmarks(p5, jointIdx('palm'), BLUE(), left)
    drawLandmarks(p5, jointIdx('thumb'), BLUE(), left)
    drawLandmarks(p5, jointIdx('index'), BLUE(), left)
    drawLandmarks(p5, jointIdx('middle'), BLUE(), left)
    drawLandmarks(p5, jointIdx('ring'), BLUE(), left)
    drawLandmarks(p5, jointIdx('pinky'), BLUE(), left)
  }
}

export default scene
