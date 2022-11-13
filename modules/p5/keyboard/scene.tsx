import p5Types from 'p5'

import {
  BLACK,
  getChromaticIdx,
  getNotesInChord,
  getNotesInScale,
  getOrderedChordsInScale,
  GREEN,
  PENCIL,
  rightColor,
  WHITE,
  hexToRgb,
  leftColor,
  primary,
  shadow,
  tertiary,
} from '../../const'
import Box from '../components/Box'
import P5Canvas from '../components/P5Canvas'
import { KeyLocation } from '../../../types/KeyLocation'
import { ScaleKeys } from '../../../types/ScaleKeys'

export default class KeyboardCanvas implements P5Canvas {
  major = true
  showChords = false
  selected: number | null = null
  selectedChord: number | null = null
  selectedScale: ScaleKeys | null = null
  selectedChordNotes: ScaleKeys | null = null
  keyLocations: KeyLocation[] = []
  chordLocations: KeyLocation[] = []
  majorButtonLocation: KeyLocation | null = null
  chordsSwitchLocation: KeyLocation | null = null

  chordLegendBox: Box

  constructor(w: number, h: number) {
    this.chordLegendBox = new Box({
      x: (2 * w) / 3 + 100,
      y: 80,
      w: 260,
      h: 140,
      color: hexToRgb(primary),
      rounding: 2,
    })
  }

  show(p5: p5Types): void {
    this.keyLocations = []

    this.chordLegendBox.show(p5)

    this.drawKeyboard(p5)
    this.drawKeySwitch(p5)
    this.drawChordSwitch(p5)
    this.drawChords(p5)
    this.drawScaleLegend(p5)
  }

  onClick(p5: p5Types): void {
    const x = p5.mouseX
    const y = p5.mouseY

    if (this.checkMajorBtnPress(x, y)) return
    if (this.checkChordBtnPress(x, y)) return
    this.checkChordSelectPress(x, y)
    this.checkPianoKeyPress(x, y)
  }

  drawScaleLegend(p5: p5Types) {
    const x = (2 * p5.width) / 3 + 100
    const y = 70

    p5.noStroke()
    p5.fill(hexToRgb(rightColor))
    p5.rect(x + 10, y + 20, 40, 40)
    p5.fill(hexToRgb(shadow))
    p5.textSize(28)
    p5.text('Root Note', x + 70, y + 50)

    p5.fill(hexToRgb(leftColor))
    p5.rect(x + 10, y + 80, 40, 40)
    p5.fill(hexToRgb(shadow))
    p5.textSize(28)
    p5.text('Other Notes', x + 70, y + 110)
  }

  drawKeyboard(p5: p5Types) {
    const x = 30
    const y = 70
    const w = (2 * p5.width) / 3
    const h = (2 * p5.height) / 3

    let wWidth = w / 7
    let bWidth = wWidth * 0.7
    let r = 80 < bWidth ? 80 : bWidth - 20

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
      if (
        this.selectedChordNotes != null &&
        this.selectedChordNotes.wKeys.includes(i)
      ) {
        p5.fill(BLACK())
        p5.circle(x_offset + wWidth / 2 + 4, y + h - 56, r)
        p5.stroke(BLACK())
        p5.strokeWeight(2)
        p5.fill(hexToRgb(tertiary))
        p5.circle(x_offset + wWidth / 2, y + h - 60, r)
      }

      p5.noStroke()
      p5.textSize(30)
      p5.fill(BLACK())
      p5.text(
        note.name,
        x_offset + (wWidth - p5.textWidth(note.name)) / 2,
        y + h - 50,
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
      if (
        this.selectedChordNotes != null &&
        this.selectedChordNotes.bKeys.includes(i)
      ) {
        p5.fill(BLACK())
        p5.circle(x_offset + bWidth / 2 + 4, y + height - 56, r)
        p5.stroke(BLACK())
        p5.strokeWeight(2)
        p5.fill(GREEN())
        p5.circle(x_offset + bWidth / 2, y + height - 60, r)
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

  drawChords(p5: p5Types) {
    if (!this.showChords || this.selected == null) {
      return
    }

    const x = 30
    const y = (2 * p5.height) / 3 + 75
    const w = (2 * p5.width) / 3
    const h = 100
    const notes = getOrderedChordsInScale(this.selected, this.major)
    let width = w / 7

    for (let i = 0; i < 7; i++) {
      const x_offset = i * width + x
      p5.noStroke()
      p5.fill(BLACK())
      p5.rect(x_offset + 4, y + 4, width, h, 10)

      let fillColor = WHITE()
      if (this.selectedChord != null && i == this.selectedChord) {
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

  drawKeySwitch(p5: p5Types) {
    const x = (2 * p5.width) / 3 + 100
    const y = 260
    const w = 50
    const h = 50

    p5.noStroke()
    p5.fill(WHITE())
    p5.rect(x, y, w, h, 10)

    p5.textSize(30)
    p5.noStroke()
    p5.fill(hexToRgb(shadow))
    p5.text('Major Scale', x + 60, y + 35)

    if (this.major) {
      p5.noStroke()
      p5.fill([...hexToRgb(tertiary), 90])
      p5.rect(x + 14, y + 14, 30, 30, 10)
      p5.fill(hexToRgb(tertiary))
      p5.rect(x + 10, y + 10, 30, 30, 10)
      p5.fill([...hexToRgb(tertiary), 30])
      p5.rect(x + 6, y + 6, 30, 30, 10)
    }

    this.majorButtonLocation = {
      idx: 0,
      x1: x,
      x2: x + w + 4,
      y1: y,
      y2: y + h + 4,
    }
  }

  drawChordSwitch(p5: p5Types) {
    const x = (2 * p5.width) / 3 + 100
    const w = 50
    const h = 50
    const y = 350

    p5.noStroke()
    p5.fill(WHITE())
    p5.rect(x, y, w, h, 10)

    p5.textSize(30)
    p5.noStroke()
    p5.fill(hexToRgb(leftColor))
    p5.text('Show Chords', x + 60, y + 35)

    if (this.showChords) {
      p5.noStroke()
      p5.fill([...hexToRgb(tertiary), 90])
      p5.rect(x + 14, y + 14, 30, 30, 10)
      p5.fill(hexToRgb(tertiary))
      p5.rect(x + 10, y + 10, 30, 30, 10)
      p5.fill([...hexToRgb(tertiary), 20])
      p5.rect(x + 6, y + 6, 30, 30, 10)
    }

    this.chordsSwitchLocation = {
      idx: 0,
      x1: x,
      x2: x + w + 4,
      y1: y,
      y2: y + h + 4,
    }
  }

  checkMajorBtnPress(x: number, y: number) {
    let hit = false
    if (
      this.majorButtonLocation &&
      x >= this.majorButtonLocation.x1 &&
      x <= this.majorButtonLocation.x2 &&
      y >= this.majorButtonLocation.y1 &&
      y <= this.majorButtonLocation.y2
    ) {
      this.major = !this.major
      if (this.selected != null) {
        this.selectedScale = getNotesInScale(this.selected, this.major)
        this.selectedChord = null
        this.selectedChordNotes = null
      }
      hit = true
    }

    // Return true to stop search for clicks
    return hit
  }

  checkChordBtnPress(x: number, y: number) {
    let hit = false
    if (
      this.chordsSwitchLocation &&
      x >= this.chordsSwitchLocation.x1 &&
      x <= this.chordsSwitchLocation.x2 &&
      y >= this.chordsSwitchLocation.y1 &&
      y <= this.chordsSwitchLocation.y2
    ) {
      this.showChords = !this.showChords
      this.selectedChord = null
      this.selectedChordNotes = null
      hit = true
    }

    // Return true to stop search for clicks
    return hit
  }

  checkPianoKeyPress(x: number, y: number) {
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
        this.selectedChord = null
        this.selectedChordNotes = null
        return
      }

      // Set new selected
      this.selected = newSelected
      this.selectedChord = null
      this.selectedChordNotes = null
      this.selectedScale = getNotesInScale(this.selected, this.major)
    }
  }

  checkChordSelectPress(x: number, y: number) {
    let newSelected = null

    for (let i = 0; i < this.chordLocations.length; i++) {
      const x1 = this.chordLocations[i].x1
      const x2 = this.chordLocations[i].x2
      const y1 = this.chordLocations[i].y1
      const y2 = this.chordLocations[i].y2
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        newSelected = this.chordLocations[i].idx
      }
    }
    if (newSelected != null) {
      // Unselect on second click
      if (newSelected == this.selectedChord) {
        this.selectedChord = null
        this.selectedChordNotes = null
        return
      }

      // Set new selected
      this.selectedChord = newSelected
      let type = 'maj'
      let offsets = this.major ? [0, 2, 4, 5, 7, 9, 11] : [0, 2, 3, 5, 7, 8, 10]
      const majorChords = this.major ? [0, 3, 4] : [2, 5, 6]
      if (!majorChords.includes(this.selectedChord)) {
        if (this.selectedChord == (this.major ? 6 : 1)) {
          type = 'dim'
        } else {
          type = 'min'
        }
      }

      this.selectedChordNotes = getNotesInChord(
        offsets[this.selectedChord] + this.selected!,
        type,
      )
    }
  }
}
