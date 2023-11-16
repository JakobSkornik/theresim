export type ControlPanelContextType = {
  playback: boolean
  togglePlayback: () => void
  showUI: boolean
  toggleShowUI: (showUI?: boolean) => void
  info: boolean
  toggleInfo: (open?: boolean) => void
  loading: boolean
  toggleLoading: (load?: boolean) => void
}
