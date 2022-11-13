import { createContext, FC } from 'react'

import { HandsContextType, HandsProps } from '../types'

export const HandsContext = createContext<HandsContextType | null>(null)

const HandsProvider: FC<HandsProps> = (props) => {
  return (
    <HandsContext.Provider value={props.value}>
      {props.children}
    </HandsContext.Provider>
  )
}

export default HandsProvider
