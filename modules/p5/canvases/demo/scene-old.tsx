import p5Types from 'p5'
import { Gain, now, Synth } from 'tone'

import FPSCounter from '../../components/FPSCounter'
import Hand from '../../components/Hand'
import HandLegend from '../../components/HandLegend'
import NoHandsWarning from '../../components/NoHandsWarning'
import P5Canvas from '../../components/P5Canvas'
import {
  gray,
  hexToRgb,
  leftColor,
  pianoNotes,
  rightColor,
} from '../../../const'
import { HandsContextType } from '../../../../types'
import { getAverageZ } from '../../hooks'
import Keyboard from '../../components/Keyboard'
import { BoxParams } from '../../components/Box'

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
  keyboard: Keyboard
  noHandsWarning: NoHandsWarning
  threshold: number = 0.54
  controls: Controls = {
    leftVisible: false,
    rightVisible: false,
    leftActive: false,
    rightActive: false,
  }
  selectedRoot = 17

  gain: Gain
  synth: Synth

  notePlaying: number | null = null
  notes = pianoNotes
  rightHandDims: BoxParams
  leftHandDims: BoxParams

  constructor(w: number, h: number) {
    this.rightHandDims = {
      x: 20,
      y: 60,
      w: w - 30,
      h: h - 80,
    }
    this.leftHandDims = {
      x: 20,
      y: 60,
      w: w - 30,
      h: h - 80,
    }

    this.fpsCounter = new FPSCounter({
      x: w - 105,
      y: h - 70,
    })

    this.leftHand = new Hand({
      x: this.leftHandDims.x,
      y: this.leftHandDims.y,
      w: this.leftHandDims.w,
      h: this.leftHandDims.h,
      color: hexToRgb(leftColor),
      pointerStyle: true,
    })

    this.rightHand = new Hand({
      x: this.rightHandDims.x,
      y: this.rightHandDims.y,
      w: this.rightHandDims.w,
      h: this.rightHandDims.h,
      color: hexToRgb(rightColor),
      pointerStyle: true,
    })

    this.keyboard = new Keyboard({
      x: this.rightHandDims.x + 200,
      y: this.rightHandDims.y + 30,
      w: this.rightHandDims.w - 220,
      h: this.rightHandDims.h - 90,
      numOfKeys: 16,
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
    this.keyboard.show(p5)
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
    this.fpsCounter.show(p5)
    this.noHandsWarning.show(p5, hands)

    let z = getAverageZ(hands.rightHand)

    if (!hands.rightHand.length || z < 0.53) {
      this.synth.triggerRelease()
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

    // const frequency = Math.round(hands.rightHand[0].x * 400)

    // const amplitude = hands.rightHand[0].y
    // this.gain.gain.linearRampToValueAtTime(amplitude, now())

    const x = hands.rightHand[0].x * this.rightHandDims.w + this.rightHandDims.x
    const idx = this.keyboard.getKeyIndex(x + this.selectedRoot)

  
    if (this.notePlaying == null) {
      this.synth.triggerRelease()
      this.triggerNotePressed(this.notes[idx].freq)
    } else if (this.notePlaying == idx) {
      return
    } else {
      this.triggerNoteRelease()
      this.synth.oscillator.frequency.linearRampToValueAtTime(
        this.notes[idx].freq,
        now(),
      )
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
    if (this.notePlaying != null) {
      this.synth.triggerRelease()
      this.notePlaying = null
    }
  }

  onClick(p5: p5Types): void {}
}
