import p5Types from 'p5'

import FPSCounter from '../components/FPSCounter'
import Hand from '../components/Hand'
import HandLegend from '../components/HandLegend'
import NoHandsWarning, {
  HandsWarningParams,
} from '../components/NoHandsWarning'
import P5Canvas from '../components/P5Canvas'
import { BLUE, gray, GRAY, hexToRgb, leftColor, RED, rightColor } from '../../const'
import { HandsContextType } from '../../../types'
import { getAverageZ } from '..'

export default class DetectionHandCanvas implements P5Canvas {
  threshold: number = 0.54
  fpsCounter: FPSCounter
  leftHand: Hand
  rightHand: Hand
  legend: HandLegend
  noHandsWarning: NoHandsWarning

  constructor(w: number, h: number) {
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
      x: 20,
      y: 20,
      w: w - 40,
      h: h - 50,
    } as HandsWarningParams)
  }

  show(p5: p5Types, hands: HandsContextType): void {
    const lCol = getAverageZ(hands.leftHand) <= 0.54 ? hexToRgb(gray) : hexToRgb(leftColor)
    const rCol = getAverageZ(hands.rightHand) <= 0.54 ? hexToRgb(gray) : hexToRgb(rightColor)

    this.fpsCounter.show(p5)
    this.leftHand.show(p5, hands.leftHand, lCol)
    this.rightHand.show(p5, hands.rightHand, rCol)
    this.legend.show(p5)
    this.noHandsWarning.show(p5, hands)
  }
  onClick(): void {}
}
