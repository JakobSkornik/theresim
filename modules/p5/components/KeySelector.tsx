import p5Types from 'p5'
import { KeyLocation } from '../../../types'
import {
  BLACK,
  getNoteName,
  hexToRgb,
  PENCIL,
  rightColor,
  shadow,
  tertiary,
  WHITE,
} from '../../const'
import { BoxParams } from './Box'

export default class KeySelector {
  x: number
  y: number
  w: number
  h: number

  switchY: number
  switchSize: number

  major: boolean = true
  selectedRoot: string = 'C'
  keyBtnLocation: KeyLocation | null = null
  pianoKeyLocations: KeyLocation[] = []

  constructor(params: BoxParams) {
    this.x = params.x
    this.y = params.y
    this.w = params.w
    this.h = params.h

    let wWidth = this.w / 7
    let bWidth = wWidth * 0.7

    for (let i = 0; i < 7; i++) {
      const x_offset = i * wWidth + this.x
      this.pianoKeyLocations.push({
        name: getNoteName(i, true),
        x1: x_offset,
        x2: x_offset + wWidth,
        y1: this.y,
        y2: this.y + this.h,
      })
    }

    const offsets = [1, 2, 4, 5, 6]
    for (let i = 0; i < 5; i++) {
      const x_offset = offsets[i] * wWidth + this.x - bWidth / 2

      this.pianoKeyLocations.push({
        name: getNoteName(i, false),
        x1: x_offset,
        x2: x_offset + bWidth,
        y1: this.y,
        y2: this.y + (2 * this.h) / 3,
      })
    }

    this.switchY = this.y + this.h + 10
    this.switchSize = 40

    this.keyBtnLocation = {
      idx: 0,
      x1: this.x,
      x2: this.x + this.switchSize + 4,
      y1: this.switchY,
      y2: this.switchY + this.switchSize + 4,
    }
  }

  show(p5: p5Types) {
    let wWidth = this.w / 7
    let bWidth = wWidth * 0.7

    for (let i = 0; i < 7; i++) {
      const x_offset = i * wWidth + this.x
      const tlBorder = i == 0 ? 10 : 0
      const trBorder = i == 6 ? 10 : 0
      const note = getNoteName(i, true)

      p5.noStroke()
      p5.fill(BLACK())
      p5.rect(
        x_offset + 4,
        this.y + 4,
        wWidth,
        this.h,
        tlBorder,
        trBorder,
        10,
        10,
      )

      p5.stroke(BLACK())
      p5.strokeWeight(2)
      p5.fill(WHITE())
      p5.rect(x_offset, this.y, wWidth, this.h, tlBorder, trBorder, 10, 10)
      if (this.selectedRoot == note) {
        p5.fill(hexToRgb(rightColor))
        p5.rect(x_offset, this.y, wWidth, this.h, tlBorder, trBorder, 10, 10)
      }

      p5.noStroke()
      p5.textSize(20)
      p5.fill(BLACK())
      p5.text(
        note,
        x_offset + (wWidth - p5.textWidth(note)) / 2,
        this.y + this.h - 10,
      )
    }

    const offsets = [1, 2, 4, 5, 6]
    for (let i = 0; i < 5; i++) {
      const x_offset = offsets[i] * wWidth + this.x - bWidth / 2
      const height = (2 * this.h) / 3
      const note = getNoteName(i, false)

      p5.noStroke()
      p5.fill(PENCIL())
      p5.rect(x_offset + 4, this.y, bWidth, height + 4, 0, 0, 10, 10)

      p5.stroke(BLACK())
      p5.strokeWeight(2)
      p5.fill(BLACK())
      p5.rect(x_offset, this.y, bWidth, height, 0, 0, 10, 10)
      if (this.selectedRoot == note) {
        p5.fill(hexToRgb(rightColor))
        p5.rect(x_offset, this.y, bWidth, height, 0, 0, 10, 10)
      }
    }

    p5.noStroke()
    p5.fill(WHITE())
    p5.rect(this.x, this.switchY, this.switchSize, this.switchSize, 10)

    p5.textSize(30)
    p5.noStroke()
    p5.fill(hexToRgb(shadow))
    p5.text('Major Scale', this.x + 60, this.switchY + 30)

    if (this.major) {
      p5.noStroke()
      p5.fill([...hexToRgb(tertiary), 90])
      p5.rect(this.x + 9, this.switchY + 9, 30, 30, 10)
      p5.fill(hexToRgb(tertiary))
      p5.rect(this.x + 5, this.switchY + 5, 30, 30, 10)
      p5.fill([...hexToRgb(tertiary), 30])
      p5.rect(this.x + 1, this.switchY + 1, 30, 30, 10)
    }
  }

  checkMajorBtnPress(x: number, y: number) {
    if (
      this.keyBtnLocation &&
      x >= this.keyBtnLocation.x1 &&
      x <= this.keyBtnLocation.x2 &&
      y >= this.keyBtnLocation.y1 &&
      y <= this.keyBtnLocation.y2
    ) {
      this.major = !this.major
      return this.major
    }
    return null
  }

  checkPianoKeyPress = (x: number, y: number) => {
    let newSelected = null
    for (let i = 0; i < this.pianoKeyLocations.length; i++) {
      const x1 = this.pianoKeyLocations[i].x1
      const x2 = this.pianoKeyLocations[i].x2
      const y1 = this.pianoKeyLocations[i].y1
      const y2 = this.pianoKeyLocations[i].y2
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        newSelected = this.pianoKeyLocations[i].name
      }
    }
    if (newSelected != null) {
      this.selectedRoot = newSelected
      return newSelected
    }
    return null
  }
}
