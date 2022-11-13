import p5Types from 'p5'

import Container from '../components/Container'
import FPSCounter from '../components/FPSCounter'
import FrequencyChart from '../components/FrequencyChart'
import HandLegend from '../components/HandLegend'
import NoHandsWarning from '../components/NoHandsWarning'
import P5Canvas from '../components/P5Canvas'
import { HandsContextType } from '../../../types'
import { hexToRgb, leftColor, primary, rightColor, shadow } from '../../const'
import AmplitudeChart from '../components/AmplitudeChart'
import Hand from '../components/Hand'
import Box from '../components/Box'

export default class ControlScene implements P5Canvas {
  fpsCounter: FPSCounter
  legend: HandLegend
  frequencyContainer: Container
  amplitudeContainer: Container
  handsContainer: Box
  leftFrequencyChart: FrequencyChart
  rightFrequencyChart: FrequencyChart
  leftAmplitudeChart: AmplitudeChart
  rightAmplitudeChart: AmplitudeChart
  leftHand: Hand
  rightHand: Hand
  noHandsWarning: NoHandsWarning

  constructor(w: number, h: number) {
    this.frequencyContainer = new Container({
      x: 25,
      y: 65,
      w: w / 2 - 30,
      h: h - 245,
      title: 'Frequency',
      titleColor: hexToRgb(primary),
      titleTextColor: hexToRgb(shadow),
    })

    this.leftFrequencyChart = new FrequencyChart({
      x: 30,
      y: 120,
      w: w / 4 - 20,
      h: h - 305,
      title: 'Left Hand',
    })

    this.rightFrequencyChart = new FrequencyChart({
      x: w / 4 + 20,
      y: 120,
      w: w / 4 - 30,
      h: h - 305,
      title: 'Right Hand',
    })

    this.amplitudeContainer = new Container({
      x: w / 2 + 5,
      y: 65,
      w: w / 2 - 20,
      h: h - 90,
      title: 'Amplitude',
      titleColor: hexToRgb(primary),
      titleTextColor: hexToRgb(shadow),
    })

    this.leftAmplitudeChart = new AmplitudeChart({
      x: w / 2 + 10,
      y: 120,
      w: w / 2 - 30,
      h: (h - 160) / 2,
      title: 'Left Hand',
    })

    this.rightAmplitudeChart = new AmplitudeChart({
      x: w / 2 + 10,
      y: (h - 120) / 2 + 110,
      w: w / 2 - 30,
      h: (h - 160) / 2,
      title: 'Right Hand',
    })

    this.fpsCounter = new FPSCounter({
      x: w / 2 - 90,
      y: h - 70,
    })

    this.handsContainer = new Box({
      x: 190,
      y: h - 170,
      w: w / 2 - 195,
      h: 140,
      color: hexToRgb(primary),
      rounding: 2,
      shade: false
    })

    this.leftHand = new Hand({
      x: 190,
      y: h - 170,
      w: w / 2 - 195,
      h: 140,
      color: hexToRgb(leftColor),
    })

    this.rightHand = new Hand({
      x: 190,
      y: h - 170,
      w: w / 2 - 195,
      h: 140,
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
      waitLen: 1000,
    })
  }

  show(p5: p5Types, hands: HandsContextType) {
    this.frequencyContainer.show(p5)
    this.amplitudeContainer.show(p5)
    this.leftFrequencyChart.show(p5, hands.leftHand)
    this.rightFrequencyChart.show(p5, hands.rightHand)
    this.leftAmplitudeChart.show(p5, hands.leftHand)
    this.rightAmplitudeChart.show(p5, hands.rightHand)
    this.handsContainer.show(p5)
    this.leftHand.show(p5, hands.leftHand)
    this.rightHand.show(p5, hands.rightHand)
    this.fpsCounter.show(p5)
    this.legend.show(p5)
    this.noHandsWarning.show(p5, hands)
  }

  onClick() {}
}
