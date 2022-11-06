import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, jointIdx, LIGHTGREEN, SHADOW } from '../../modules/const'
import { drawLandmarks } from '../../modules/p5'
import { HandsContextType } from '../../types'

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawHands(p5, hands.leftHand)
}

const drawHands = (p5: p5Types, left: Landmark[]) => {
  p5.fill(BLACK(5))
  p5.stroke(BLACK(30))
  p5.strokeWeight(1)
  if (left.length) {
    drawLandmarks(p5, jointIdx('palm'), LIGHTGREEN(), left)
    drawLandmarks(p5, jointIdx('thumb'), LIGHTGREEN(), left)
    drawLandmarks(p5, jointIdx('index'), LIGHTGREEN(), left)
    drawLandmarks(p5, jointIdx('middle'), LIGHTGREEN(), left)
    drawLandmarks(p5, jointIdx('ring'), LIGHTGREEN(), left)
    drawLandmarks(p5, jointIdx('pinky'), LIGHTGREEN(), left)
  }
}

export default scene
