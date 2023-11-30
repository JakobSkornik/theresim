import { createContext, FC } from 'react'
import { ControlPanelContextType, ControlPanelProps } from '../types'

export const ControlPanelContext = createContext<ControlPanelContextType>({
    playback: true,
    togglePlayback: () => {},
    showUI: false,
    toggleShowUI: () => {},
    info: false,
    toggleInfo: () => {},
    loading: true,
    toggleLoading: () => {}
})

const ControlPanelProvider: FC<ControlPanelProps> = (props: ControlPanelProps) => {
  return (
    <ControlPanelContext.Provider value={props.value}>
      {props.children}
    </ControlPanelContext.Provider>
  )
}

export default ControlPanelProvider
