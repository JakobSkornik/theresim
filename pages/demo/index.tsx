import p5Types from 'p5'
import P5Container from '../../components/P5Container'
import { useFullScreenContext } from '../../context'
import { BG, BLACK, RED } from '../../modules/const'

const scene = (p5: p5Types) => {
  draw404(p5)
}

let lastX = 0
let lastY = 0
let x_dir = true
let y_dir = true

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max) + 1
}

const draw404 = (p5: p5Types) => {
  const w = 500
  const h = 200

  let maxX = p5.width - w
  let maxY = p5.height - h

  if (lastX == 0 && lastY == 0) {
    lastX = getRandomInt(maxX - 1)
    lastY = getRandomInt(maxY - 1)
  }

  if (lastX == 0 || lastX == maxX) x_dir = !x_dir
  if (lastY == 0 || lastY == maxY) y_dir = !y_dir

  const x = x_dir ? lastX + 1 : lastX - 1
  const y = y_dir ? lastY + 1 : lastY - 1

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(x + 8, y + 8, w, h, 10)

  p5.stroke(BLACK())
  p5.strokeWeight(3)
  p5.fill(BG())
  p5.rect(x, y, w, h, 10)

  p5.fill(RED())
  p5.rect(x, y, w, 40, 10, 10, 0, 0)
  p5.textSize(20)
  p5.fill(BLACK())
  p5.noStroke()
  p5.text('WARNING', x + 20, y + 8, 400, 100)

  p5.stroke(BLACK())
  p5.strokeWeight(3)
  p5.fill(BLACK())
  p5.circle(x + 54, y + 114, 80)
  p5.fill(RED())
  p5.circle(x + 50, y + 110, 80)

  p5.stroke(BG())
  p5.strokeWeight(10)
  p5.line(x + 30, y + 90, x + 70, y + 130)
  p5.line(x + 30, y + 130, x + 70, y + 90)

  p5.textSize(20)
  p5.fill(BLACK())
  p5.noStroke()
  p5.text('This part is still under development.', x + 120, y + 80, 400, 100)

  lastX = x
  lastY = y
}

const sx = {
  fullscreen: {
    position: 'absolute' as 'absolute',
    top: '1px',
    left: '0',
    height: 'calc(100vh - 10px)',
    width: 'calc(100vw - 20px)',
    transition: 'all 0.5s ease-in-out',
  },
  windowed: {
    position: 'absolute' as 'absolute',
    top: '130px',
    left: '10px',
    height: 'calc(100vh - 155px)',
    width: 'calc(100vw - 45px)',
    transition: 'all 0.5s ease-in-out',
  },
}

const Demo = () => {
  const { fullscreen } = useFullScreenContext()

  return (
    <P5Container
      style={fullscreen ? sx.fullscreen : sx.windowed}
      title={'Demo'}
      mediapipe={false}
      scene={scene}
      icon="controller.svg"
    />
  )
}

export default Demo
