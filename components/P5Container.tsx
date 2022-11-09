import dynamic from 'next/dynamic'
import { createRef, useEffect, useRef, useState } from 'react'
import useResizeObserver from '@react-hook/resize-observer'

import Container from '../components/Container'
import { useHandsContext } from '../context'
import { P5ContainerProps } from '../types'
import initialize from '../modules/mediapipe'
const Canvas = dynamic(() => import('./Canvas'), { ssr: false })

const sx = {
  container: {
    height: '100%',
    width: '100%',
    marginLeft: '10px',
  },
  canvasDiv: {
    height: '100%',
    width: '100%',
  },
}

const P5Container = (props: P5ContainerProps) => {
  const handsContext = useHandsContext()
  const videoElement = createRef<HTMLVideoElement>()
  const parentRef = useRef<HTMLDivElement>(null)

  useResizeObserver(parentRef, (entry) => {
    if (!parentRef.current) return

    setDims({
      width: entry.contentRect.width,
      height: entry.contentRect.height,
    })

    window.dispatchEvent(new Event('resize'))
  })

  const [dims, setDims] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!parentRef.current) return

    if (props.mediapipe && handsContext) {
      initialize(handsContext, videoElement).then((res) => {
        if (res) handsContext.updateCamReady(true)
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container
      title={props.title}
      style={{ ...sx.container, ...props.style }}
      icon={props.icon}
    >
      <div id="test" ref={parentRef} style={sx.canvasDiv}>
        {dims.height > 0 && dims.width > 0 && (
          <Canvas
            height={dims.height - 50}
            width={dims.width}
            scene={props.scene}
            onClick={props.onClick}
            hands={handsContext!}
          />
        )}
      </div>
      {props.mediapipe && <video ref={videoElement} hidden />}
    </Container>
  )
}

export default P5Container
