import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, jointIdx, BLUE, RED } from '../../modules/const'
import { drawFPS, drawLandmarks, drawLegend, drawNoHandsWarning } from '../../modules/p5'
import { HandsContextType } from '../../types'

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawHands(p5, hands.leftHand, hands.rightHand)
  drawFPS(p5)
  drawNoHandsWarning(p5, hands, 'free')
}

const drawHands = (p5: p5Types, left: Landmark[], right: Landmark[]) => {
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
  if (right.length) {
    drawLandmarks(p5, jointIdx('palm'), RED(), right)
    drawLandmarks(p5, jointIdx('thumb'), RED(), right)
    drawLandmarks(p5, jointIdx('index'), RED(), right)
    drawLandmarks(p5, jointIdx('middle'), RED(), right)
    drawLandmarks(p5, jointIdx('ring'), RED(), right)
    drawLandmarks(p5, jointIdx('pinky'), RED(), right)
  }
  drawLegend(p5)
}

export default scene
