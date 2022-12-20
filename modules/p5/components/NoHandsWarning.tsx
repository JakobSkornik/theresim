import p5Types from 'p5'
import { getRandomInt } from '../hooks'
import { borderColor, hexToRgb, primary, shadow } from '../../const'
import { BoxParams } from './Box'
import { HandsController } from '../../mediapipe'

export type HandsWarningParams = BoxParams & {
  waitLen?: number
}

export default class NoHandsWarning {
  x: number
  y: number
  w: number
  h: number
  waitLen: number
  inAnim = false
  x_dir = true
  y_dir = true
  step = 0
  lastX = 0
  lastY = 0

  constructor(params: HandsWarningParams) {
    this.x = params.x
    this.y = params.y
    this.w = params.w
    this.h = params.h
    this.waitLen = params.waitLen ?? 300
  }

  show(p5: p5Types, hands: HandsController) {
    let text = 'No webcam detected. Please check your webcam status.'
    if (hands.camAvailable) {
      text =
        'No hands detected. Please raise your hands in front of the camera.'

      if (hands.leftHand.length || hands.rightHand.length) {
        if (this.inAnim) {
          this.inAnim = false
          this.step = 0
          this.lastX = 0
          this.lastY = 0
        }
        return
      }
      if (!this.inAnim) this.inAnim = true
      this.step++
      if (this.step < this.waitLen) return
    }

    const w = 500
    const h = 180

    let maxX = this.x + this.w - w
    let maxY = this.y + this.h - h

    if (this.lastX == 0 && this.lastY == 0) {
      this.lastX = getRandomInt(maxX - 1)
      this.lastY = getRandomInt(maxY - 1)
    }

    if (this.lastX <= this.y) this.x_dir = true
    if (this.lastX >= maxX) this.x_dir = false
    if (this.lastY <= this.x) this.y_dir = true
    if (this.lastY >= maxY) this.y_dir = false

    const x = this.x_dir ? this.lastX + 1 : this.lastX - 1
    const y = this.y_dir ? this.lastY + 1 : this.lastY - 1

    p5.noStroke()
    p5.fill(hexToRgb(shadow))
    p5.rect(x + 4, y + 4, w, h, 2)

    p5.strokeWeight(1)
    p5.stroke([...hexToRgb(borderColor), 100])
    p5.fill(hexToRgb(primary))
    p5.rect(x, y, w, h, 2)

    p5.fill(hexToRgb(primary))
    p5.rect(x, y, w, 40, 2, 2, 0, 0)

    p5.noStroke()
    p5.textSize(20)
    p5.fill(hexToRgb(shadow))
    p5.text('WARNING', x + 20, y + 8, 400, 100)

    p5.noStroke()
    p5.fill([...hexToRgb(borderColor), 100])
    p5.circle(x + 54, y + 114, 80)

    p5.strokeWeight(1)
    p5.stroke([...hexToRgb(borderColor), 100])
    p5.fill(hexToRgb(shadow))
    p5.circle(x + 50, y + 110, 80)

    p5.strokeWeight(10)
    p5.stroke(hexToRgb('#0F4A7C'))
    p5.line(x + 30, y + 90, x + 70, y + 130)
    p5.line(x + 30, y + 130, x + 70, y + 90)

    p5.noStroke()
    p5.textSize(20)
    p5.fill(hexToRgb(shadow))
    p5.text(text, x + 120, y + 80, 380, 100)

    this.lastX = x
    this.lastY = y
  }
}
