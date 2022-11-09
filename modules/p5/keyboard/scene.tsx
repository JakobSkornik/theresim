import p5Types from 'p5'

import {
  BLACK,
  CURACAO,
  getChromaticIdx,
  getNotesInChord,
  getNotesInScale,
  getOrderedChordsInScale,
  GREEN,
  PENCIL,
  RED,
  WHITE,
  YELLOW,
} from '../../const'
import { KeyLocation } from '../../../types/KeyLocation'
import { ScaleKeys } from '../../../types/ScaleKeys'
import { drawFPS } from '..'

let major = true
let showChords = false
let selected: number | null = null
let selectedChord: number | null = null
let selectedScale: ScaleKeys | null = null
let selectedChordNotes: ScaleKeys | null = null
let keyLocations: KeyLocation[] = []
let chordLocations: KeyLocation[] = []
let majorButtonLocation: KeyLocation | null = null
let chordsSwitchLocation: KeyLocation | null = null

const scene = (p5: p5Types) => {
  keyLocations = []
  drawKeyboard(p5)
  drawKeySwitch(p5)
  drawChordSwitch(p5)
  drawChords(p5)
  drawScaleLegend(p5)
  drawFPS(p5)
}

export const onClick = (p5: p5Types) => {
  const x = p5.mouseX
  const y = p5.mouseY

  if (checkMajorBtnPress(x, y)) return
  if (checkChordBtnPress(x, y)) return
  checkChordSelectPress(x, y)
  checkPianoKeyPress(x, y)
}

const drawScaleLegend = (p5: p5Types) => {
  const x = (2 * p5.width) / 3 + 100
  const y = 10

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(x + 8, y + 8, 240, 140, 10)
  p5.stroke(BLACK())
  p5.strokeWeight(3)
  p5.fill(YELLOW())
  p5.rect(x, y, 240, 140, 10)

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(x + 14, y + 24, 40, 40)
  p5.fill(RED())
  p5.rect(x + 10, y + 20, 40, 40)
  p5.fill(BLACK())
  p5.textSize(28)
  p5.text('Root Note', x + 70, y + 50)

  p5.fill(BLACK())
  p5.rect(x + 14, y + 84, 40, 40)
  p5.fill(CURACAO())
  p5.rect(x + 10, y + 80, 40, 40)
  p5.fill(BLACK())
  p5.textSize(28)
  p5.text('Other Notes', x + 70, y + 110)
}

const drawKeyboard = (p5: p5Types) => {
  const x = 30
  const y = 10
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
    p5.strokeWeight(3)
    p5.fill(WHITE())
    p5.rect(x_offset, y, wWidth, h, tlBorder, trBorder, 10, 10)
    if (selectedScale && selectedScale.wKeys.includes(i)) {
      p5.fill(CURACAO())
      p5.rect(x_offset, y, wWidth, h, tlBorder, trBorder, 10, 10)
    }
    if (selected == note.idx) {
      p5.fill(RED())
      p5.rect(x_offset, y, wWidth, h, tlBorder, trBorder, 10, 10)
    }
    if (selectedChordNotes != null && selectedChordNotes.wKeys.includes(i)) {
      p5.fill(BLACK())
      p5.circle(x_offset + wWidth / 2 + 4, y + h - 56, r)
      p5.stroke(BLACK())
      p5.strokeWeight(3)
      p5.fill(GREEN())
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

    keyLocations.push({
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
    p5.strokeWeight(3)
    p5.fill(BLACK())
    p5.rect(x_offset, y, bWidth, height, 0, 0, 10, 10)
    if (selectedScale && selectedScale.bKeys.includes(i)) {
      p5.fill(CURACAO())
      p5.rect(x_offset, y, bWidth, height, 0, 0, 10, 10)
    }
    if (selected == note.idx) {
      p5.fill(RED())
      p5.rect(x_offset, y, bWidth, height, 0, 0, 10, 10)
    }
    if (selectedChordNotes != null && selectedChordNotes.bKeys.includes(i)) {
      p5.fill(BLACK())
      p5.circle(x_offset + bWidth / 2 + 4, y + height - 56, r)
      p5.stroke(BLACK())
      p5.strokeWeight(3)
      p5.fill(GREEN())
      p5.circle(x_offset + bWidth / 2, y + height - 60, r)
    }

    keyLocations.push({
      idx: note.idx,
      x1: x_offset,
      x2: x_offset + bWidth,
      y1: y,
      y2: y + (2 * h) / 3,
    })
  }
}

const drawChords = (p5: p5Types) => {
  if (!showChords || selected == null) {
    return
  }

  const x = 30
  const y = (2 * p5.height) / 3 + 50
  const w = (2 * p5.width) / 3
  const h = 100
  const notes = getOrderedChordsInScale(selected, major)
  let width = w / 7

  for (let i = 0; i < 7; i++) {
    const x_offset = i * width + x
    p5.noStroke()
    p5.fill(BLACK())
    p5.rect(x_offset + 4, y + 4, width, h, 10)

    let fillColor = WHITE()
    if (selectedChord != null && i == selectedChord) {
      fillColor = GREEN()
    }
    p5.stroke(BLACK())
    p5.strokeWeight(3)
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

    chordLocations.push({
      idx: i,
      x1: x_offset,
      x2: x_offset + width,
      y1: y,
      y2: y + h,
    })
  }
}

const drawKeySwitch = (p5: p5Types) => {
  const x = (2 * p5.width) / 3 + 100
  const y = 210
  const w = 50
  const h = 50

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(x + 4, y + 4, w, h, 10)

  p5.stroke(BLACK())
  p5.strokeWeight(3)
  p5.fill(WHITE())
  p5.rect(x, y, w, h, 10)

  p5.textSize(30)
  p5.noStroke()
  p5.fill(BLACK())
  p5.text('Major Scale', x + 60, y + 35)

  if (major) {
    p5.noStroke()
    p5.fill(GREEN(90))
    p5.rect(x + 14, y + 14, 30, 30, 10)
    p5.fill(GREEN())
    p5.rect(x + 10, y + 10, 30, 30, 10)
    p5.fill(GREEN(30))
    p5.rect(x + 6, y + 6, 30, 30, 10)
  }

  majorButtonLocation = {
    idx: 0,
    x1: x,
    x2: x + w + 4,
    y1: y,
    y2: y + h + 4,
  }
}

const drawChordSwitch = (p5: p5Types) => {
  const x = (2 * p5.width) / 3 + 100
  const w = 50
  const h = 50
  const y = 300

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(x + 4, y + 4, w, h, 10)

  p5.stroke(BLACK())
  p5.strokeWeight(3)
  p5.fill(WHITE())
  p5.rect(x, y, w, h, 10)

  p5.textSize(30)
  p5.noStroke()
  p5.fill(BLACK())
  p5.text('Show Chords', x + 60, y + 35)

  if (showChords) {
    p5.noStroke()
    p5.fill(GREEN(90))
    p5.rect(x + 14, y + 14, 30, 30, 10)
    p5.fill(GREEN())
    p5.rect(x + 10, y + 10, 30, 30, 10)
    p5.fill(GREEN(30))
    p5.rect(x + 6, y + 6, 30, 30, 10)
  }

  chordsSwitchLocation = {
    idx: 0,
    x1: x,
    x2: x + w + 4,
    y1: y,
    y2: y + h + 4,
  }
}

const checkMajorBtnPress = (x: number, y: number) => {
  let hit = false
  if (
    majorButtonLocation &&
    x >= majorButtonLocation.x1 &&
    x <= majorButtonLocation.x2 &&
    y >= majorButtonLocation.y1 &&
    y <= majorButtonLocation.y2
  ) {
    major = !major
    if (selected != null) {
      selectedScale = getNotesInScale(selected, major)
      selectedChord = null
      selectedChordNotes = null
    }
    hit = true
  }

  // Return true to stop search for clicks
  return hit
}

const checkChordBtnPress = (x: number, y: number) => {
  let hit = false
  if (
    chordsSwitchLocation &&
    x >= chordsSwitchLocation.x1 &&
    x <= chordsSwitchLocation.x2 &&
    y >= chordsSwitchLocation.y1 &&
    y <= chordsSwitchLocation.y2
  ) {
    showChords = !showChords
    selectedChord = null
    selectedChordNotes = null
    hit = true
  }

  // Return true to stop search for clicks
  return hit
}

const checkPianoKeyPress = (x: number, y: number) => {
  let newSelected = null

  /*
   * keyLocations = [...wKeys, ..bKeys].
   * This way, a single for loop always
   * selects black keys, if they are clicked.
   */

  for (let i = 0; i < keyLocations.length; i++) {
    const x1 = keyLocations[i].x1
    const x2 = keyLocations[i].x2
    const y1 = keyLocations[i].y1
    const y2 = keyLocations[i].y2
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      newSelected = keyLocations[i].idx
    }
  }
  if (newSelected != null) {
    // Unselect on second click
    if (newSelected == selected) {
      selected = null
      selectedScale = null
      selectedChord = null
      selectedChordNotes = null
      return
    }

    // Set new selected
    selected = newSelected
    selectedChord = null
    selectedChordNotes = null
    selectedScale = getNotesInScale(selected, major)
  }
}

const checkChordSelectPress = (x: number, y: number) => {
  let newSelected = null

  for (let i = 0; i < chordLocations.length; i++) {
    const x1 = chordLocations[i].x1
    const x2 = chordLocations[i].x2
    const y1 = chordLocations[i].y1
    const y2 = chordLocations[i].y2
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      newSelected = chordLocations[i].idx
    }
  }
  if (newSelected != null) {
    // Unselect on second click
    if (newSelected == selectedChord) {
      selectedChord = null
      selectedChordNotes = null
      return
    }

    // Set new selected
    selectedChord = newSelected
    let type = 'maj'
    let offsets = major ? [0, 2, 4, 5, 7, 9, 11] : [0, 2, 3, 5, 7, 8, 10]
    const majorChords = major ? [0, 3, 4] : [2, 5, 6]
    if (!majorChords.includes(selectedChord)) {
      if (selectedChord == (major ? 6 : 1)) {
        type = 'dim'
      } else {
        type = 'min'
      }
    }

    selectedChordNotes = getNotesInChord(
      offsets[selectedChord] + selected!,
      type,
    )
  }
}

export default scene
