import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import p5Types from 'p5'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

import { CanvasProps } from '../types/CanvasProps'

const Canvas = (props: CanvasProps) => {
  const [width, setWidth] = useState(props.width)
  const [height, setHeight] = useState(props.height)

  useEffect(() => {
    setWidth(props.width)
    setHeight(props.height)
  }, [props.height])

  const setup = (p5: p5Types, canvasParentRef: HTMLDivElement) => {
    p5.createCanvas(width, height).parent(canvasParentRef)
  }

  const draw = (p5: p5Types) => {
    p5.background(255)
    props.scene(p5, props.hands)
  }

  // @ts-ignore
  return <Sketch setup={setup} draw={draw} />
}

export default Canvas
