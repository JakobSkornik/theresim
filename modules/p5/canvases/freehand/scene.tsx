import p5Types from 'p5'

import FPSCounter from '../../components/FPSCounter'
import HandLegend from '../../components/HandLegend'
import Hand from '../../components/Hand'
import NoHandsWarning from '../../components/NoHandsWarning'
import P5Canvas from '../../components/P5Canvas'
import { hexToRgb, leftColor, rightColor } from '../../../const'
import { HandsController } from '../../../mediapipe'
import { Landmark } from '@mediapipe/hands'

export default class FreeHandCanvas implements P5Canvas {
  fpsCounter: FPSCounter
  leftHand: Hand
  rightHand: Hand
  legend: HandLegend
  noHandsWarning: NoHandsWarning

  w: number
  h: number

  constructor(w: number, h: number) {
    this.w = w
    this.h = h

    this.fpsCounter = new FPSCounter({
      x: w - 105,
      y: h - 70,
    })

    this.leftHand = new Hand({
      x: 20,
      y: 80,
      w: w - 40,
      h: h - 110,
      color: hexToRgb(leftColor),
    })

    this.rightHand = new Hand({
      x: 20,
      y: 80,
      w: w - 40,
      h: h - 110,
      color: hexToRgb(rightColor),
    })

    this.legend = new HandLegend({
      x: 25,
      y: h - 170,
    })

    this.noHandsWarning = new NoHandsWarning({
      x: 30,
      y: 30,
      w: w - 40,
      h: h - 60,
    })
  }

  show(p5: p5Types, hands: HandsController) {
    this.fpsCounter.show(p5)
    this.leftHand.show(p5, hands.leftHand)
    this.rightHand.show(p5, hands.rightHand)
    this.legend.show(p5)
    this.noHandsWarning.show(p5, hands)

    // TEMP
    if (hands.leftHand.length) {
      const leftHandGesture = this.leftHandGesture(hands.leftHand)
      p5.text(leftHandGesture, this.w - 100, this.h - 100)
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

  onClick() {}
}
