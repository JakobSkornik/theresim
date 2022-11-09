import { createContext, FC } from 'react'
import { FullscreenContextType } from '../types'
import { FullscreenProps } from '../types/FullscreenProps'

export const FullscreenContext = createContext<FullscreenContextType>({
  fullscreen: false,
  toggleFullscreen: () => {},
})

const FullscreenProvider: FC<FullscreenProps> = (props) => {
  return (
    <FullscreenContext.Provider value={props.value}>
      {props.children}
    </FullscreenContext.Provider>
  )
}

export default FullscreenProvider
