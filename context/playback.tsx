import { createContext, FC } from 'react'
import { BooleanContextType, BooleanProps } from '../types'

export const VideoPlaybackContext = createContext<BooleanContextType>({
  bool: false,
  toggle: () => {},
})

const VideoPlaybackProvider: FC<BooleanProps> = (props: BooleanProps) => {
  return (
    <VideoPlaybackContext.Provider value={props.value}>
      {props.children}
    </VideoPlaybackContext.Provider>
  )
}

export default VideoPlaybackProvider
