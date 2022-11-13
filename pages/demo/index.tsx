import p5Types from 'p5'
import P5Container from '../../components/P5Container'
import { useFullScreenContext } from '../../context'
import { borderColor, hexToRgb, primary, shadow } from '../../modules/const'
import P5Canvas from '../../modules/p5/components/P5Canvas'
import { HandsContextType } from '../../types'

class TODO implements P5Canvas {
  lastX = 0
  lastY = 0
  x_dir = true
  y_dir = true

  show(p5: p5Types, hands: HandsContextType): void {
    this.draw404(p5)
  }

  onClick(p5: p5Types): void {}

  getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max) + 1
  }

  draw404(p5: p5Types) {
    let text = 'This part is still under development.'
    const w = 500
    const h = 200

    let maxX = p5.width - w - 4
    let maxY = p5.height - h - 4

    if (this.lastX == 0 && this.lastY == 0) {
      this.lastX = this.getRandomInt(maxX - 1)
      this.lastY = this.getRandomInt(maxY - 1)
    }

    if (this.lastX <= 4) this.x_dir = true
    if (this.lastX >= maxX) this.x_dir = false
    if (this.lastY <= 0) this.y_dir = true
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

const sx = {
  fullscreen: {
    top: '1px',
    left: '0',
    height: '100vh',
    width: '100vw',
  },
  windowed: {
    top: '150px',
    left: '30px',
    height: 'calc(100vh - 160px)',
    width: 'calc(100vw - 60px)',
  },
}

const Demo = () => {
  const { bool: fullscreen } = useFullScreenContext()

  return (
    <P5Container
      style={fullscreen ? sx.fullscreen : sx.windowed}
      title={'Demo'}
      mediapipe={false}
      scene={TODO}
      icon="controller.svg"
    />
  )
}

export default Demo
