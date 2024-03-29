export type ControlPanelContextType = {
  playback: boolean
  togglePlayback: () => void
  thumbTriggerMode: boolean
  toggleThumbTriggerMode: () => void
  fullHandMode: boolean
  toggleFullHandMode: () => void
  showUI: boolean
  toggleShowUI: (showUI?: boolean) => void
  loading: boolean
  toggleLoading: (load?: boolean) => void
}
