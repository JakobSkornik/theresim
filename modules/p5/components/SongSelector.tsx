import p5Types from 'p5'
import { KeyLocation } from '../../../types'
import { BLACK, gray, hexToRgb, leftColor, rightColor } from '../../const'

import { BoxParams } from './Box'

export default class SongSelector {
  x: number
  y: number
  w: number
  h: number

  cols: number = 3
  rows: number = 1
  textHeight: number = 20

  keyLocations: KeyLocation[] = []
  songs: string[] = [
    'kuža_pazi',
    'twinkle',
    'song_3'
  ]
  selected: string | null = null

  constructor(params: BoxParams) {
    this.x = params.x
    this.y = params.y
    this.w = params.w
    this.h = params.h

    const keyWidth = this.w / this.cols
    const keyHeight = this.h / this.rows

    for (let row = 0; row < this.rows; row++) {
      const y_offset = row * keyHeight + this.y + this.textHeight

      for (let col = 0; col < this.cols; col++) {
        const x_offset = col * keyWidth + this.x

        this.keyLocations.push({
          name: this.songs[row * this.cols + col],
          x1: x_offset,
          x2: x_offset + keyWidth,
          y1: y_offset,
          y2: y_offset + keyHeight,
        })
      }
    }
  }

  show(p5: p5Types) {
    p5.noStroke()
    p5.fill(hexToRgb(leftColor))
    p5.textSize(12)
    const title = 'Melodies'
    p5.text(title, this.x, this.y + 8)

    const keyWidth = this.w / this.cols
    const keyHeight = this.h / this.rows

    for (let row = 0; row < this.rows; row++) {
      const y_offset = row * keyHeight + this.y + this.textHeight - 4

      for (let col = 0; col < this.cols; col++) {
        const x_offset = col * keyWidth + this.x

        let color = hexToRgb(gray)
        if (this.songs[row * this.cols + col] == this.selected) {
          color = [...hexToRgb(rightColor), 90]
        }

        p5.stroke(BLACK())
        p5.strokeWeight(2)
        p5.fill(color)
        p5.rect(x_offset, y_offset, keyWidth - 4, keyHeight - 3, 10)

        p5.noStroke()
        p5.fill(hexToRgb(leftColor))
        p5.textSize(13)

        const text = this.songs[row * this.cols + col]
        p5.text(
          text,
          x_offset + (keyWidth - p5.textWidth(text)) / 2,
          y_offset + keyHeight / 2,
        )
      }
    }
  }

  checkKeyPress = (x: number, y: number) => {
    let newSelected = null
    for (let i = 0; i < this.keyLocations.length; i++) {
      const x1 = this.keyLocations[i].x1
      const x2 = this.keyLocations[i].x2
      const y1 = this.keyLocations[i].y1
      const y2 = this.keyLocations[i].y2
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        newSelected = this.keyLocations[i].name
      }
    }
    if (newSelected != null) {
      this.selected = newSelected
      return newSelected
    }
    return null
  }
}
