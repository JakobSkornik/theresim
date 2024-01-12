import { Landmark } from '@mediapipe/hands'
import { HandsController } from '../modules/mediapipe'
import { ControlPanelContextType, Controls } from '../types'

export default class HandDetector {
  controls: Controls = {
    leftVisible: false,
    leftGesture: 0,
    rightVisible: false,
    rightActive: false,
  }

  chords: { [code: number]: number } = {
    1: 0,
    2: 1,
    3: 2,
    6: 3,
    30: 4,
    31: 5,
  }

  getControls(hands: HandsController, context: ControlPanelContextType) {
    if (!hands) {
      return
    }

    if (hands && hands.leftHand.length) {
      this.controls.leftVisible = true
      this.controls.leftGesture = this.leftHandGesture(hands.leftHand)
    } else {
      this.controls.leftVisible = false
    }

    if (hands.rightHand.length) {
      this.controls.rightVisible = true
      this.controls.rightX = hands.rightHand[8].x
      this.controls.rightY = hands.rightHand[8].y
      this.controls.rightActive = this.rightHandActive(hands.rightHand, context)
    } else {
      this.controls.rightVisible = false
      this.controls.rightActive = false
    }
  }

  leftHandGesture(hand: Landmark[]) {
    let bits = ['0', '0', '0', '0', '0']

    if (hand[4].x > hand[3].x) {
      bits[4] = '1'
    }

    if (hand[8].y < hand[6].y) {
      bits[3] = '1'
    }

    if (hand[12].y < hand[10].y) {
      bits[2] = '1'
    }

    if (hand[16].y < hand[14].y) {
      bits[1] = '1'
    }

    if (hand[20].y < hand[18].y) {
      bits[0] = '1'
    }

    return parseInt(bits.join(''), 2)
  }

  rightHandActive(hand: Landmark[], context: ControlPanelContextType) {
    if (context.thumbTriggerMode) {
      return hand[4].x < hand[3].x
    }

    const detectionPercentage = 0.3
    const height = hand[5].y - hand[0].y
    return hand[8].y > hand[6].y + height * detectionPercentage
  }

  getActiveChord() {
    if (this.controls.leftVisible) {
      return this.chords[this.controls.leftGesture]
    } else {
      return -1
    }
  }
}
