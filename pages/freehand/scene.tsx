import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, jointIdx, LIGHTGREEN, ORANGE, SHADOW } from '../../modules/const'
import { drawLandmarks, drawLegend } from '../../modules/p5'
import { HandsContextType } from '../../types'

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawHands(p5, hands.leftHand, hands.rightHand)
}

const drawHands = (p5: p5Types, left: Landmark[], right: Landmark[]) => {
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
  if (right.length) {
    drawLandmarks(p5, jointIdx('palm'), ORANGE(), right)
    drawLandmarks(p5, jointIdx('thumb'), ORANGE(), right)
    drawLandmarks(p5, jointIdx('index'), ORANGE(), right)
    drawLandmarks(p5, jointIdx('middle'), ORANGE(), right)
    drawLandmarks(p5, jointIdx('ring'), ORANGE(), right)
    drawLandmarks(p5, jointIdx('pinky'), ORANGE(), right)
  }
  drawLegend(p5)
}


export default scene
