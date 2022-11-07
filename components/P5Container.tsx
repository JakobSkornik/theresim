import dynamic from 'next/dynamic'
import { createRef, useEffect, useRef, useState } from 'react'

import Container from '../components/Container'
import initialize from '../modules/mediapipe'
import { useHandsContext } from '../context'
import { P5ContainerProps } from '../types'
const Canvas = dynamic(() => import('./Canvas'), { ssr: false })

const sx = {
  container: {
    height: 'calc(100% - 140px)',
    width: 'calc(100% - 20px)',
    marginLeft: '10px',
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

  const [dims, setDims] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDims({
      width: parentRef.current!.offsetWidth,
      height: parentRef.current!.offsetHeight,
    })

    if (props.mediapipe && handsContext) {
      initialize(handsContext, videoElement)
    }

    window.addEventListener('resize', () => {
      setDims({
        width: parentRef.current!.offsetWidth,
        height: parentRef.current!.offsetHeight,
      })
    })
  }, [])

  return (
    <Container title={props.title} style={sx.container} icon={props.icon}>
      <div ref={parentRef} style={sx.canvasDiv}>
        {dims.height > 0 && dims.width > 0 && (
          <Canvas
            height={dims.height - 50}
            width={dims.width}
            scene={props.scene}
            hands={handsContext!}
          />
        )}
      </div>
      {props.mediapipe && <video ref={videoElement} hidden />}
    </Container>
  )
}

export default P5Container
