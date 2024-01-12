import p5Types from 'p5'
import { KeyLocation } from '../../../types'
import { BLACK, hexToRgb, leftColor, rightColor, shadow } from '../../const'
import { Controls } from '../../../types'
import { BoxParams } from './Box'

export type KeyboardParams = BoxParams & {
  numOfKeys: number
}

export default class Keyboard {
  x: number
  y: number
  w: number
  h: number
  activeNote: number = -1
  activeChord: number[] = []
  numOfKeys: number
  keyWidth: number
  keyLocations: KeyLocation[] = []

  constructor(params: KeyboardParams) {
    this.x = params.x
    this.y = params.y
    this.w = params.w
    this.h = params.h
    this.numOfKeys = params.numOfKeys
    this.keyWidth = this.w / this.numOfKeys

    for (let i = 0; i < this.numOfKeys; i++) {
      const x_offset = i * this.keyWidth + this.x
      this.keyLocations.push({
        idx: i,
        x1: x_offset,
        x2: x_offset + this.keyWidth + 4,
        y1: this.y,
        y2: this.y + this.h + 4,
      })
    }
  }

  show(p5: p5Types, notes: string[], activeNote: number) {
    for (let i = 0; i < this.numOfKeys; i++) {
      const x_offset = i * this.keyWidth + this.x
      const tlBorder = i == 0 ? 10 : 0
      const trBorder = i == this.numOfKeys - 1 ? 10 : 0

      p5.noStroke()
      p5.fill([...hexToRgb(shadow), ...[20]])
      p5.rect(
        x_offset + 4,
        this.y + 4,
        this.keyWidth,
        this.h,
        tlBorder,
        trBorder,
        10,
        10,
      )

      let color = '#FFFFFF'
      if (this.activeChord.includes(i)) {
        color = leftColor
      }
      if (activeNote == i) {
        color = rightColor
      }

      p5.stroke(BLACK())
      p5.strokeWeight(2)
      p5.fill([...hexToRgb(color), ...[90]])
      p5.rect(
        x_offset,
        this.y,
        this.keyWidth,
        this.h,
        tlBorder,
        trBorder,
        10,
        10,
      )

      p5.noStroke()
      p5.fill(leftColor)
      p5.text(
        notes[i],
        x_offset + (this.keyWidth - p5.textWidth(notes[i])) / 2,
        this.y + this.h - 30,
      )
    }
  }

  getActive(
    p5: p5Types,
    controls: Controls,
    activeChord: number,
    major: boolean,
  ): number {
    if (controls.rightActive) {
      const x = this.x + controls.rightX! * this.w
      const y = this.y + controls.rightY! * this.h

      let newSelected = -1
      for (let i = 0; i < this.keyLocations.length; i++) {
        const x1 = this.keyLocations[i].x1
        const x2 = this.keyLocations[i].x2
        const y1 = this.keyLocations[i].y1
        const y2 = this.keyLocations[i].y2
        if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
          newSelected = i
        }
      }
      this.activeNote = newSelected
    } else {
      this.activeNote = -1
    }

    if (activeChord >= 0) {
      let offsets = [0, 2, 4, 7, 9, 11, 14]
      let chordNotes = []

      let offset = 0
      if (!major && activeChord > 0) {
        offset = 1
      }

      for (let i = 0; i < offsets.length; i++) {
        chordNotes.push((offsets[i] + activeChord + offset) % (this.numOfKeys + 1))
      }
      this.activeChord = chordNotes
    } else {
      this.activeChord = []
    }
    return this.activeNote
  }
}
