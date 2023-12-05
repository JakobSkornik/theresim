import p5Types from 'p5'
import { BoxParams } from './Box'
import { KeyLocation } from '../../../types'
import { WHITE, hexToRgb, shadow, tertiary } from '../../const'

export default class MuteButton {
  x: number
  y: number
  w: number
  h: number

  mute: boolean = false
  muteBtnLocation: KeyLocation | null = null

  constructor(params: BoxParams) {
    this.x = params.x
    this.y = params.y
    this.w = params.w
    this.h = params.h

    this.muteBtnLocation = {
      idx: 0,
      x1: this.x,
      x2: this.x + this.h + 4,
      y1: this.y,
      y2: this.y + this.h + 4,
    }
  }

  show(p5: p5Types) {
    p5.noStroke()
    p5.fill(WHITE())
    p5.rect(this.x, this.y, this.h, this.h, 10)

    p5.textSize(30)
    p5.noStroke()
    p5.fill(hexToRgb(shadow))
    p5.text('Mute', this.x + 60, this.y + 30)

    if (this.mute) {
      p5.noStroke()
      p5.fill([...hexToRgb(tertiary), 90])
      p5.rect(this.x + 9, this.y + 9, 30, 30, 10)
      p5.fill(hexToRgb(tertiary))
      p5.rect(this.x + 5, this.y + 5, 30, 30, 10)
      p5.fill([...hexToRgb(tertiary), 30])
      p5.rect(this.x + 1, this.y + 1, 30, 30, 10)
    }
  }

  checkMuteBtnPress(x: number, y: number) {
    if (
      this.muteBtnLocation &&
      x >= this.muteBtnLocation.x1 &&
      x <= this.muteBtnLocation.x2 &&
      y >= this.muteBtnLocation.y1 &&
      y <= this.muteBtnLocation.y2
    ) {
      this.mute = !this.mute
      return this.mute
    }
    return null
  }
}
