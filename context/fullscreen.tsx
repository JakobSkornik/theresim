import { createContext, FC } from 'react'
import { BooleanContextType, BooleanProps } from '../types'

export const FullscreenContext = createContext<BooleanContextType>({
  bool: false,
  toggle: () => {},
})

const FullscreenProvider: FC<BooleanProps> = (props) => {
  return (
    <FullscreenContext.Provider value={props.value}>
      {props.children}
    </FullscreenContext.Provider>
  )
}

export default FullscreenProvider
