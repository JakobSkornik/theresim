import p5Types from 'p5'
import { BLACK, fifth, hexToRgb, shadow } from '../../const'

import Box, { BoxParams } from './Box'

export type KeyboardParams = BoxParams & {
  numOfKeys: number
}

export default class Keyboard extends Box {
  numOfKeys: number
  keyWidth: number
  keyRanges: number[][] = []

  constructor(params: KeyboardParams) {
    super(params as BoxParams)
    this.numOfKeys = params.numOfKeys
    this.keyWidth = this.w / this.numOfKeys

    for (let i = 0; i < this.numOfKeys - 1; i++) {
      const x_offset = i * this.keyWidth + this.x
      this.keyRanges.push([x_offset, x_offset + this.keyWidth])
    }
  }

  show(p5: p5Types) {
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

      p5.stroke(BLACK())
      p5.strokeWeight(2)
      p5.fill([...hexToRgb(fifth), ...[20]])
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
    }
  }

  getKeyIndex(x: number) {
    let idx = 0
    while (this.keyRanges.length > idx && x > this.keyRanges[idx][1]) {
      idx++
    }
    return idx
  }
}
