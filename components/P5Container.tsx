import useResizeObserver from '@react-hook/resize-observer'
import { motion } from 'framer-motion'
import { createRef, useCallback, useEffect, useRef, useState } from 'react'

import Canvas from './Canvas'
import { HandsController } from '../modules/mediapipe'
import { useControlPanelContext } from '../context'
import { P5ContainerProps } from '../types'

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
    transition: 'all 1 ease-in-out',
  },
}

const variants = {
  hidden: { opacity: 0, x: -4000, y: 0, transition: { duration: 0.2 } },
  enter: { opacity: 1, x: 0, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: 3000, y: 0, transition: { duration: 0.1 } },
}

const P5Container = (props: P5ContainerProps) => {
  // const handsContext = useHandsContext()
  const { loading, playback, toggleLoading } = useControlPanelContext()
  const videoElement = createRef<HTMLVideoElement>()
  const parentRef = useRef<HTMLDivElement>(null)

  const [dims, setDims] = useState({ width: 0, height: 0 })
  const [hands, setHands] = useState<HandsController>()
 
  useResizeObserver(parentRef, (entry) => {
    if (!parentRef.current) return

    setDims({
      width: entry.contentRect.width,
      height: entry.contentRect.height,
    })

    window.dispatchEvent(new Event('resize'))
  })

  const init = useCallback(async () => {
    if (hands == undefined) {
      try {
        const handsController = new HandsController(videoElement)
        await handsController.finishInit()
        setHands(handsController)
      } catch (e: any) {
        console.log(`Please check your webcam: ${e.message}.`)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Triggers the first time only
  useEffect(() => {
    if (!props.mediapipe) {
      toggleLoading(false)
      return
    }

    if (!parentRef.current) {
      return
    }

    init()
    toggleLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Triggers on navigations
  useEffect(() => {
    if (
      !props.mediapipe ||
      !loading
    ) {
      return
    }

    init()
    toggleLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      variants={variants}
      animate="enter"
      initial="hidden"
      exit="exit"
      transition={{ type: 'linear' }}
      ref={parentRef}
      style={{ ...sx.canvasDiv, ...props.style }}
    >
      <div style={sx.playbackDiv}>
        {props.mediapipe && (
          <video
            width={dims.width - 31}
            height={dims.height - 80}
            style={{
              ...sx.playback,
              ...{
                opacity: playback ? '0.5' : '0',
              },
            }}
            ref={videoElement}
          />
        )}
      </div>
      {dims.height > 0 && dims.width > 0 && (
        <Canvas
          title={props.title}
          height={dims.height}
          width={dims.width}
          scene={props.scene}
          hands={hands!}
        />
      )}
    </motion.div>
  )
}

export default P5Container
