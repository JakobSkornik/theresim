import p5Types from 'p5'

import {
  BLACK,
  CURACAO,
  getChromaticIdx,
  getNotesInScale,
  GREEN,
  PENCIL,
  RED,
  WHITE,
  YELLOW,
} from '../../modules/const'
import { KeyLocation } from '../../types/KeyLocation'
import { ScaleKeys } from '../../types/ScaleKeys'

let major = true
let selected: number | null = null
let selectedScale: ScaleKeys | null = null
let keyLocations: KeyLocation[] = []
let majorButtonLocation: KeyLocation | null = null

const scene = (p5: p5Types) => {
  keyLocations = []
  drawKeyboard(p5)
  drawKeySwitch(p5)
  drawScaleLegend(p5)
}

const drawScaleLegend = (p5: p5Types) => {
  const x = p5.width - 250
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

    p5.noStroke()
    p5.textSize(30)
    p5.fill(BLACK())
    p5.text(
      note.name,
      x_offset + (wWidth - p5.textWidth(note.name)) / 2,
      y + h - 20,
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

    p5.noStroke()
    p5.textSize(30)
    p5.fill(WHITE())
    p5.text(
      note.name,
      x_offset + (bWidth - p5.textWidth(note.name)) / 2,
      y + height - 20,
    )

    keyLocations.push({
      idx: note.idx,
      x1: x_offset,
      x2: x_offset + wWidth,
      y1: y,
      y2: y + (2 * h) / 3,
    })
  }
}

const drawKeySwitch = (p5: p5Types) => {
  const x = 30
  const y = (2 * p5.height) / 3 + 50
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

export const onClick = (p5: p5Types) => {
  const x = p5.mouseX
  const y = p5.mouseY

  if (checkMajorBtnPress(x, y)) return
  checkPianoKeyPress(x, y)
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
    }
    hit = true
  }
  return hit
}

const checkPianoKeyPress = (x: number, y: number) => {
  let newSelected = null
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
    if (newSelected == selected) {
      selected = null
      selectedScale = null
      return
    }
    selected = newSelected
    selectedScale = getNotesInScale(selected, major)
  }
}

export default scene
