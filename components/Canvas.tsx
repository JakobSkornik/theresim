// @ts-nocheck
import dynamic from 'next/dynamic'
import p5Types from 'p5'
import { useState } from 'react'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

import Container from '../modules/p5/components/Container'
import P5Canvas from '../modules/p5/components/P5Canvas'
import { CanvasProps } from '../types'

const Canvas = (props: CanvasProps) => {
  const [font, setFont] = useState<p5Types.Font | null>(null)
  const [scene, setScene] = useState<P5Canvas>(
    new props.scene(props.width, props.height),
  )

  const preload = (p5: p5Types) => {
    setFont(p5.loadFont('Oleo.ttf'))
  }

  const setup = (p5: p5Types, canvasParentRef: HTMLDivElement) => {
    p5.createCanvas(props.width, props.height).parent(canvasParentRef)
    p5.textFont(font!)
  }

  const draw = (p5: p5Types) => {
    p5.clear()
    drawContainer(p5)
    scene.show(p5, props.hands)
  }

  const onResize = (p5: p5Types) => {
    p5.resizeCanvas(props.width, props.height)
    setScene(new props.scene(props.width, props.height))
  }

  const onClick = (p5: p5Types) => {
    scene.onClick(p5)
  }

  const drawContainer = (p5: p5Types) => {
    const container = new Container({
      title: props.title,
      x: 20,
      y: 10,
      w: p5.width - 30,
      h: p5.height - 30,
    })
    container.show(p5)
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
