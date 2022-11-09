import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, lmIdx, BLUE, RED } from '../../const'
import { drawFPS, drawLandmarks, drawLegend, drawNoHandsWarning } from '..'
import { HandsContextType } from '../../../types'

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
    drawLandmarks(p5, lmIdx('palm'), BLUE(), left)
    drawLandmarks(p5, lmIdx('thumb'), BLUE(), left)
    drawLandmarks(p5, lmIdx('index'), BLUE(), left)
    drawLandmarks(p5, lmIdx('middle'), BLUE(), left)
    drawLandmarks(p5, lmIdx('ring'), BLUE(), left)
    drawLandmarks(p5, lmIdx('pinky'), BLUE(), left)
  }
  if (right.length) {
    drawLandmarks(p5, lmIdx('palm'), RED(), right)
    drawLandmarks(p5, lmIdx('thumb'), RED(), right)
    drawLandmarks(p5, lmIdx('index'), RED(), right)
    drawLandmarks(p5, lmIdx('middle'), RED(), right)
    drawLandmarks(p5, lmIdx('ring'), RED(), right)
    drawLandmarks(p5, lmIdx('pinky'), RED(), right)
  }
  drawLegend(p5)
}

export default scene
