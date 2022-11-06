import dynamic from 'next/dynamic'
import p5Types from 'p5'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

import { CanvasProps } from '../types/CanvasProps'

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
    p5.background(255)
    props.scene(p5, props.hands)
  }

  const onResize = (p5: p5Types) => {
    p5.resizeCanvas(props.width, props.height)
  }

  // @ts-ignore
  return <Sketch preload={preload} setup={setup} draw={draw} windowResized={onResize}/>
}

export default Canvas
