import p5Types from 'p5'
import { Gain, now, Synth } from 'tone'

import FPSCounter from '../../components/FPSCounter'
import Hand from '../../components/Hand'
import HandLegend from '../../components/HandLegend'
import NoHandsWarning from '../../components/NoHandsWarning'
import P5Canvas from '../../components/P5Canvas'
import { gray, hexToRgb, leftColor, rightColor } from '../../../const'
import { HandsContextType } from '../../../../types'
import { getAverageZ } from '../../hooks'

type Controls = {
  leftVisible: boolean
  rightVisible: boolean
  leftActive: boolean
  rightActive: boolean
  leftX?: number
  leftY?: number
  rightX?: number
  rightY?: number
}

export default class DemoCanvas implements P5Canvas {
  fpsCounter: FPSCounter
  leftHand: Hand
  rightHand: Hand
  legend: HandLegend
  noHandsWarning: NoHandsWarning
  threshold: number = 0.54
  controls: Controls = {
    leftVisible: false,
    rightVisible: false,
    leftActive: false,
    rightActive: false,
  }

  gain: Gain
  synth: Synth

  notePlaying: number | null = null
  notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5']
  frame = 0

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
      pointerStyle: true,
    })

    this.rightHand = new Hand({
      x: 20,
      y: 80,
      w: w - 40,
      h: h - 110,
      color: hexToRgb(rightColor),
      pointerStyle: true,
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

    this.gain = new Gain(0.4)
    this.synth = new Synth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.8,
        decay: 0.2,
        sustain: 1.0,
        release: 0.8,
      },
    })
    this.synth.oscillator.type = 'sine'
    this.synth.toDestination()
    this.gain.toDestination()
  }

  show(p5: p5Types, hands: HandsContextType): void {
    this.getControls(hands)
    this.fpsCounter.show(p5)
    this.leftHand.show(
      p5,
      hands.leftHand,
      this.controls.leftActive ? hexToRgb(leftColor) : hexToRgb(gray),
    )
    this.rightHand.show(
      p5,
      hands.rightHand,
      this.controls.rightActive ? hexToRgb(rightColor) : hexToRgb(gray),
    )
    this.legend.show(p5)
    this.noHandsWarning.show(p5, hands)

    let z = getAverageZ(hands.rightHand)

    if (!hands.rightHand.length || z < 0.53) {
      if (this.notePlaying) {
        this.synth.triggerRelease()
        this.notePlaying = null
      }
      return
    }
    // const idx = Math.round(hands.rightHand[0].x * 400)
    // console.log(idx)
    // if (this.notePlaying == this.notes[idx]) {
    //   return
    // }
    // if (this.notes[idx] != this.notePlaying) {
    //   this.triggerNoteRelease()
    //   this.triggerNotePressed(idx)
    // }
    // if (this.notePlaying == null) {
    //   this.triggerNotePressed(idx)
    // }
    const frequency = Math.round(hands.rightHand[0].x * 400)
    // const amplitude = hands.rightHand[0].y
    // console.log(this.gain.gain.value)
    // this.gain.gain.linearRampToValueAtTime(amplitude, now())
    // console.log(this.gain.gain.value)
    if (this.notePlaying == frequency) {
      return
    }
    if (frequency != this.notePlaying) {
      // this.triggerNoteRelease()
      this.synth.oscillator.frequency.linearRampToValueAtTime(frequency, now())
    }
    if (this.notePlaying == null) {
      this.triggerNotePressed(frequency)
    }
  }

  getControls(hands: HandsContextType) {
    if (hands.leftHand.length) {
      this.controls.leftVisible = true
      this.controls.leftX = hands.leftHand[0].x
      this.controls.leftY = hands.leftHand[0].y
      this.controls.leftActive = getAverageZ(hands.leftHand) >= this.threshold
    }
    if (hands.rightHand.length) {
      this.controls.rightVisible = true
      this.controls.rightX = hands.rightHand[0].x
      this.controls.rightY = hands.rightHand[0].y
      this.controls.rightActive = getAverageZ(hands.rightHand) >= this.threshold
    }
  }

  triggerNotePressed(frequency: number) {
    this.notePlaying = frequency
    this.synth.triggerAttack(frequency)
  }

  triggerNoteRelease() {
    this.synth.triggerRelease(this.notePlaying!)
    this.notePlaying = null
  }

  onClick(p5: p5Types): void {}
}
