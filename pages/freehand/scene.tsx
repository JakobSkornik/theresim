import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'
import { BLACK, getHandIndices, LIGHTGREEN, ORANGE } from '../../modules/const'
import { HandsContextType } from '../../types'

const scene = (p5: p5Types, hands: HandsContextType) => {
  drawHands(p5, hands.leftHand, hands.rightHand)
  return
}

const drawHands = (p5: p5Types, left: Landmark[], right: Landmark[]) => {
  p5.fill(BLACK(5))
  p5.stroke(BLACK(30))
  p5.strokeWeight(1)
  if (left.length) {
    drawLandmarks(p5, getHandIndices('palm'), LIGHTGREEN(), left)
    drawLandmarks(p5, getHandIndices('finger_thumb'), LIGHTGREEN(), left)
    drawLandmarks(p5, getHandIndices('finger_index'), LIGHTGREEN(), left)
    drawLandmarks(p5, getHandIndices('finger_middle'), LIGHTGREEN(), left)
    drawLandmarks(p5, getHandIndices('finger_ring'), LIGHTGREEN(), left)
    drawLandmarks(p5, getHandIndices('finger_pinky'), LIGHTGREEN(), left)
  }
  if (right.length) {
    drawLandmarks(p5, getHandIndices('palm'), ORANGE(), right)
    drawLandmarks(p5, getHandIndices('finger_thumb'), ORANGE(), right)
    drawLandmarks(p5, getHandIndices('finger_index'), ORANGE(), right)
    drawLandmarks(p5, getHandIndices('finger_middle'), ORANGE(), right)
    drawLandmarks(p5, getHandIndices('finger_ring'), ORANGE(), right)
    drawLandmarks(p5, getHandIndices('finger_pinky'), ORANGE(), right)
  }
}

const drawLandmarks = (
  p5: p5Types,
  range: number[],
  color: number[],
  hand: Landmark[],
) => {
  p5.noFill()
  p5.strokeWeight(8)
  for (let j = range[0]; j < range[1]; j++) {
    let x = hand[j].x * p5.width
    let y = hand[j].y * p5.height
    if (x >= 0 && x <= p5.width && y >= 0 && y <= p5.height) {
      p5.stroke(128)
      p5.fill(128)
      p5.rect(x + 4, y + 4, 10)
      p5.stroke(color)
      p5.fill(color)
      p5.rect(x, y, 10)
    }
  }
}

export default scene
