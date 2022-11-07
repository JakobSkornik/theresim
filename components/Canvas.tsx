// @ts-nocheck
import dynamic from 'next/dynamic'
import p5Types from 'p5'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

import { BG } from '../modules/const'
import { CanvasProps } from '../types'

const Canvas = (props: CanvasProps) => {
  let font: p5Types.Font | null = null

  const preload = (p5: p5Types) => {
    font = p5.loadFont('font.ttf')
  }

  const setup = (p5: p5Types, canvasParentRef: HTMLDivElement) => {
    p5.createCanvas(props.width, props.height).parent(canvasParentRef)
    if (!font) font = p5.loadFont('font.ttf')
    p5.textFont(font)
  }

  const draw = (p5: p5Types) => {
    p5.background(BG())
    props.scene(p5, props.hands)
  }

  const onResize = (p5: p5Types) => {
    p5.resizeCanvas(props.width, props.height)
  }

  const onClick = (p5: p5Types) => {
    if (props.onClick) props.onClick(p5)
  }

  return (
    <Sketch
      preload={preload}
      setup={setup}
      mouseClicked={onClick}
      draw={draw}
      windowResized={onResize}
    />
  )
}

export default Canvas
