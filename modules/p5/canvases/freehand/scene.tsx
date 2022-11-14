import p5Types from 'p5'

import FPSCounter from '../../components/FPSCounter'
import HandLegend from '../../components/HandLegend'
import Hand from '../../components/Hand'
import NoHandsWarning from '../../components/NoHandsWarning'
import P5Canvas from '../../components/P5Canvas'
import { hexToRgb, leftColor, rightColor } from '../../../const'
import { HandsContextType } from '../../../../types'

export default class FreeHandCanvas implements P5Canvas {
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
      x: 30,
      y: 30,
      w: w - 40,
      h: h - 60,
    })
  }

  show(p5: p5Types, hands: HandsContextType) {
    this.fpsCounter.show(p5)
    this.leftHand.show(p5, hands.leftHand)
    this.rightHand.show(p5, hands.rightHand)
    this.legend.show(p5)
    this.noHandsWarning.show(p5, hands)
  }

  onClick() {}
}
