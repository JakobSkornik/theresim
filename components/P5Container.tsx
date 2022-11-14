import dynamic from 'next/dynamic'
import useResizeObserver from '@react-hook/resize-observer'
import { createRef, useEffect, useRef, useState } from 'react'

import initialize from '../modules/mediapipe'
import { useControlPanelContext, useHandsContext } from '../context'
import { P5ContainerProps } from '../types'
import Loader from './Loader'
const Canvas = dynamic(() => import('./Canvas'), { ssr: false })

const sx = {
  canvasDiv: {
    position: 'fixed' as 'fixed',
    width: '100%',
    height: '100%',
    transition: 'all 0.5s ease-in-out',
  },
  playbackDiv: {
    position: 'fixed' as 'fixed',
    borderRadius: '2px',
    margin: '60px 0 10px 20px',
    transition: 'all 0.5s ease-in-out',
    zIndex: '-10',
  },
  playback: {
    objectFit: 'fill' as 'fill',
    transition: 'all 0.5s ease-in-out',
    transform: 'scaleX(-1)',
  },
  loader: {
    position: 'fixed' as 'fixed',
    width: '100%',
    height: '100%',
    transition: 'all 2 ease-in-out',
  },
}

const P5Container = (props: P5ContainerProps) => {
  const handsContext = useHandsContext()
  const { playback, toggleLoading } = useControlPanelContext()
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
    if (!parentRef.current || !props.mediapipe) {
      return
    }

    const init = async () => {
      if (props.mediapipe && handsContext) {
        await initialize(handsContext, videoElement).then((res: boolean) => {
          if (res) handsContext.updateCamReady(true)
        })
      }
    }
    
    toggleLoading(true)
    init().then(() => {
      toggleLoading(false)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={parentRef} style={{ ...sx.canvasDiv, ...props.style }}>
      <div style={sx.playbackDiv}>
        <video
          width={dims.width - 31}
          height={dims.height - 80}
          style={{
            ...sx.playback,
            ...{
              opacity: playback ? '0.2' : '0',
            },
          }}
          ref={videoElement}
        />
      </div>
      {dims.height > 0 && dims.width > 0 && (
        <Canvas
          title={props.title}
          height={dims.height}
          width={dims.width}
          scene={props.scene}
          hands={handsContext!}
        />
      )}
    </div>
  )
}

export default P5Container
