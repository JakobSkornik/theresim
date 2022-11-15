import p5Types from 'p5'

import P5Canvas from '../../components/P5Canvas'
import { borderColor, hexToRgb, primary, shadow } from '../../../const'

export default class Custom404 implements P5Canvas {
  lastX = 0
  lastY = 0
  x_dir = true
  y_dir = true
  minX: number
  maxX: number
  minY: number
  maxY: number

  constructor(w: number, h: number) {
    console.log("MAXIDMS", w, h)
    this.minX = 25
    this.maxX = this.minX + w - 540
    this.minY = 60
    this.maxY = this.minY + h - 290
  }

  show(p5: p5Types): void {
    this.draw404(p5)
  }

  onClick(): void {}

  getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max) + 1
  }

  draw404(p5: p5Types) {
    let text =
      'You have wondered off trail.Please return to the app via the navigation bar.'
    const w = 500
    const h = 200

    if (this.lastX == 0 && this.lastY == 0) {
      this.lastX = this.getRandomInt(this.maxX - this.minX)
      this.lastY = this.getRandomInt(this.maxY - this.minX)
    }

    if (this.lastX <= this.minX) this.x_dir = true
    if (this.lastX >= this.maxX) this.x_dir = false
    if (this.lastY <= this.minY) this.y_dir = true
    if (this.lastY >= this.maxY) this.y_dir = false

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
    console.log(this.lastX, this.lastY)
  }
}
