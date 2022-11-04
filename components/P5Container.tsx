import dynamic from 'next/dynamic'
import { createRef, useEffect, useRef, useState } from 'react'

import Container from '../components/Container'
import { useHandsContext } from '../context'
import initialize from '../modules/mediapipe'
import { P5ContainerProps } from '../types/P5ContainerProps'
const Canvas = dynamic(() => import('./Canvas'), { ssr: false })

const sx = {
  container: {
    height: 'calc(100% - 85px)',
    width: '100%',
  },
  canvasDiv: {
    height: '100%',
    width: '100%',
  },
}

const P5Container = (props: P5ContainerProps) => {
  const videoElement = createRef<HTMLVideoElement>()
  const parentRef = useRef<HTMLDivElement>(null)
  let handsContext = useHandsContext()

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (handsContext) {
      initialize(handsContext, videoElement)
    }
  }, [])

  useEffect(() => {
    setWidth(parentRef.current!.offsetWidth)
    setHeight(parentRef.current!.offsetHeight)
  }, [])

  return (
    <Container id="freehandCanvas" title="Freehand" style={sx.container}>
      <div ref={parentRef} style={sx.canvasDiv}>
        {height > 0 && width > 0 && (
          <Canvas
            height={height}
            width={width}
            scene={props.scene}
            hands={handsContext!}
          />
        )}
      </div>
      <video ref={videoElement} hidden />
    </Container>
  )
}

export default P5Container
