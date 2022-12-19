import p5Types from 'p5'
import { KeyLocation } from '../../../types'
import { BLACK, hexToRgb, leftColor, shadow } from '../../const'
import { Controls } from '../canvases/demo/scene'

import { BoxParams } from './Box'

const chords: { [code: number]: number } = {
  1: 0,
  2: 1,
  3: 2,
  6: 3,
  30: 4,
  31: 5,
}

export default class Padboard {
  x: number
  y: number
  w: number
  h: number
  activeChord: number = -1
  numOfKeys: number = 6
  keyHeight: number
  keyLocations: KeyLocation[] = []

  constructor(params: BoxParams) {
    this.x = params.x
    this.y = params.y
    this.w = params.w
    this.h = params.h
    this.keyHeight = this.h / this.numOfKeys

    for (let i = 0; i < this.numOfKeys; i++) {
      const y_offset = i * this.keyHeight + this.y
      this.keyLocations.push({
        idx: 0,
        x1: this.x,
        x2: this.x + this.w + 4,
        y1: y_offset,
        y2: y_offset + this.keyHeight + 4,
      })
    }
  }

  show(p5: p5Types, chords: string[]) {
    for (let i = 0; i < this.numOfKeys; i++) {
      const y_offset = i * this.keyHeight + this.y
      const tBorder = i == 0 ? 10 : 0
      const lBorder = i == this.numOfKeys - 1 ? 10 : 0

      p5.noStroke()
      p5.fill([...hexToRgb(shadow), ...[20]])
      p5.rect(
        this.x + 4,
        y_offset + 4,
        this.w,
        this.keyHeight,
        tBorder,
        tBorder,
        lBorder,
        lBorder,
      )

      let color = '#FFFFFF'
      if (this.activeChord == i) {
        color = leftColor
      }
      p5.stroke(BLACK())
      p5.strokeWeight(2)
      p5.fill([...hexToRgb(color), ...[90]])
      p5.rect(
        this.x,
        y_offset,
        this.w,
        this.keyHeight,
        tBorder,
        tBorder,
        lBorder,
        lBorder,
      )

      p5.noStroke()
      p5.fill(leftColor)
      p5.text(
        chords[i % 6],
        this.x + (this.w - p5.textWidth(chords[i % 6])) / 2,
        y_offset + this.keyHeight - 30,
      )
    }
  }

  getActive(controls: Controls) {
    if (controls.leftVisible) {
      this.activeChord = chords[controls.leftGesture]
    } else {
      this.activeChord = -1
    }
    return this.activeChord
  }
}
