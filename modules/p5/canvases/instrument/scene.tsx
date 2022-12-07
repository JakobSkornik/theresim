import p5Types from 'p5'

import { KeyLocation } from '../../../../types/KeyLocation'
import { ScaleKeys } from '../../../../types/ScaleKeys'
import {
  BLACK,
  getChromaticIdx,
  getNotesInScale,
  getOrderedChordsInScale,
  getSimpleNotes,
  hexToRgb,
  leftColor,
  PENCIL,
  rightColor,
  shadow,
  WHITE,
  tertiary,
} from '../../../const'
import P5Canvas from '../../components/P5Canvas'

export default class InstrumentCanvas implements P5Canvas {
  selected: number | null = 0
  selectedChord: number | undefined = undefined
  selectedScale: ScaleKeys | null = getNotesInScale(0, true)
  keyLocations: KeyLocation[] = []
  chordLocations: KeyLocation[] = []
  noteNames: string[] = getSimpleNotes(0)

  show(p5: p5Types): void {
    this.drawKeyboard(p5, 30, 70)
    this.drawChords(p5)
    this.drawSettings(p5, 500, 200)
  }

  onClick = (p5: p5Types) => {
    const x = p5.mouseX
    const y = p5.mouseY

    if (this.selected != null) this.checkChordSelectPress(x, y)
    this.checkPianoKeyPress(x, y)
  }

  drawSettingsKeyboard = (p5: p5Types, x: number, y: number) => {
    const w = 300
    const h = 100

    let wWidth = w / 7
    let bWidth = wWidth * 0.7

    for (let i = 0; i < 7; i++) {
      const x_offset = i * wWidth + x
      const tlBorder = i == 0 ? 10 : 0
      const trBorder = i == 6 ? 10 : 0
      const note = getChromaticIdx(i, true)

      p5.noStroke()
      p5.fill(BLACK())
      p5.rect(x_offset + 4, y + 4, wWidth, h, tlBorder, trBorder, 10, 10)

      p5.stroke(BLACK())
      p5.strokeWeight(2)
      p5.fill(WHITE())
      p5.rect(x_offset, y, wWidth, h, tlBorder, trBorder, 10, 10)
      if (this.selectedScale && this.selectedScale.wKeys.includes(i)) {
        p5.fill(hexToRgb(leftColor))
        p5.rect(x_offset, y, wWidth, h, tlBorder, trBorder, 10, 10)
      }
      if (this.selected == note.idx) {
        p5.fill(hexToRgb(rightColor))
        p5.rect(x_offset, y, wWidth, h, tlBorder, trBorder, 10, 10)
      }

      p5.noStroke()
      p5.textSize(20)
      p5.fill(BLACK())
      p5.text(
        note.name,
        x_offset + (wWidth - p5.textWidth(note.name)) / 2,
        y + h - 10,
      )

      this.keyLocations.push({
        idx: note.idx,
        x1: x_offset,
        x2: x_offset + wWidth,
        y1: y,
        y2: y + h,
      })
    }

    const offsets = [1, 2, 4, 5, 6]
    for (let i = 0; i < 5; i++) {
      const x_offset = offsets[i] * wWidth + x - bWidth / 2
      const height = (2 * h) / 3
      const note = getChromaticIdx(i, false)

      p5.noStroke()
      p5.fill(PENCIL())
      p5.rect(x_offset + 4, y, bWidth, height + 4, 0, 0, 10, 10)

      p5.stroke(BLACK())
      p5.strokeWeight(2)
      p5.fill(BLACK())
      p5.rect(x_offset, y, bWidth, height, 0, 0, 10, 10)
      if (this.selectedScale && this.selectedScale.bKeys.includes(i)) {
        p5.fill(hexToRgb(leftColor))
        p5.rect(x_offset, y, bWidth, height, 0, 0, 10, 10)
      }
      if (this.selected == note.idx) {
        p5.fill(hexToRgb(rightColor))
        p5.rect(x_offset, y, bWidth, height, 0, 0, 10, 10)
      }

      this.keyLocations.push({
        idx: note.idx,
        x1: x_offset,
        x2: x_offset + bWidth,
        y1: y,
        y2: y + (2 * h) / 3,
      })
    }
  }

  drawKeyboard = (p5: p5Types, x: number, y: number) => {
    let keys = 7
    const w = (2 * p5.width) / 3
    const h = (2 * p5.height) / 3 - 20
    const wWidth = w / keys
    const r = 80 < wWidth ? 80 : wWidth - 20

    for (let i = 0; i < keys; i++) {
      const x_offset = i * wWidth + x
      const tlBorder = i == 0 ? 10 : 0
      const trBorder = i == keys - 1 ? 10 : 0

      p5.noStroke()
      p5.fill(BLACK())
      p5.rect(x_offset + 4, y + 4, wWidth, h, tlBorder, trBorder, 10, 10)

      p5.stroke(BLACK())
      p5.strokeWeight(2)
      if (this.selected == null) {
        p5.fill(WHITE())
      } else if (this.selected != null) {
        if (i == 0) {
          p5.fill(hexToRgb(rightColor))
        } else {
          p5.fill(hexToRgb(leftColor))
        }
      }
      p5.rect(x_offset, y, wWidth, h, tlBorder, trBorder, 10, 10)

      if (this.selectedChord != null) {
        const offsets = [
          this.selectedChord,
          (this.selectedChord + 2) % 7,
          (this.selectedChord + 4) % 7,
        ]

        if (offsets.includes(i)) {
          p5.fill(BLACK())
          p5.circle(x_offset + wWidth / 2 + 4, y + h - 56, r)
          p5.stroke(BLACK())
          p5.strokeWeight(2)
          p5.fill(hexToRgb(tertiary))
          p5.circle(x_offset + wWidth / 2, y + h - 60, r)
        }
      }

      p5.noStroke()
      p5.textSize(30)
      p5.fill(BLACK())
      p5.text(
        this.noteNames[i],
        x_offset + (wWidth - p5.textWidth(this.noteNames[i])) / 2,
        y + h - 50,
      )
    }
  }

  drawChords = (p5: p5Types) => {
    if (this.selected == null) {
      return
    }

    const x = 30
    const y = (2 * p5.height) / 3 + 60
    const w = (2 * p5.width) / 3
    const h = 100
    const notes = getOrderedChordsInScale(this.selected, true)
    let width = w / 7

    for (let i = 0; i < 7; i++) {
      const x_offset = i * width + x
      p5.noStroke()
      p5.fill(BLACK())
      p5.rect(x_offset + 4, y + 4, width, h, 10)

      let fillColor = WHITE()
      if (i == this.selectedChord) {
        fillColor = hexToRgb(tertiary)
      }
      p5.stroke(BLACK())
      p5.strokeWeight(2)
      p5.fill(fillColor)
      p5.rect(x_offset, y, width, h, 10)

      p5.noStroke()
      p5.textSize(30)
      p5.fill(BLACK())
      p5.text(
        notes[i],
        x_offset + (width - p5.textWidth(notes[i].toString())) / 2,
        y + h / 2 + 15,
      )

      this.chordLocations.push({
        idx: i,
        x1: x_offset,
        x2: x_offset + width,
        y1: y,
        y2: y + h,
      })
    }
  }

  drawSettings = (p5: p5Types, w: number, h: number) => {
    const x = 50 + (2 * p5.width) / 3
    const y = 70

    this.drawSettingsKeyboard(p5, x, y)

    const text = 'Select scale'
    p5.textSize(28)
    p5.fill(hexToRgb(shadow))
    p5.noStroke()
    p5.text(text, x + (300 - p5.textWidth(text)) / 2, y + 140)
  }

  checkPianoKeyPress = (x: number, y: number) => {
    let newSelected = null

    /*
     * keyLocations = [...wKeys, ..bKeys].
     * This way, a single for loop always
     * selects black keys, if they are clicked.
     */

    for (let i = 0; i < this.keyLocations.length; i++) {
      const x1 = this.keyLocations[i].x1
      const x2 = this.keyLocations[i].x2
      const y1 = this.keyLocations[i].y1
      const y2 = this.keyLocations[i].y2
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        newSelected = this.keyLocations[i].idx
      }
    }
    if (newSelected != null) {
      // Unselect on second click
      if (newSelected == this.selected) {
        this.selected = null
        this.selectedScale = null
        return
      }

      // Set new selected
      this.selected = newSelected
      this.selectedScale = getNotesInScale(this.selected, true)
      this.noteNames = getSimpleNotes(this.selected)
    }
  }

  checkChordSelectPress = (x: number, y: number) => {
    for (let i = 0; i < this.chordLocations.length; i++) {
      const x1 = this.chordLocations[i].x1
      const x2 = this.chordLocations[i].x2
      const y1 = this.chordLocations[i].y1
      const y2 = this.chordLocations[i].y2
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        this.selectedChord = this.chordLocations[i].idx
      }
    }
  }
}
