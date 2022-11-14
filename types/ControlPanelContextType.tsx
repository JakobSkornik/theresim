export type ControlPanelContextType = {
  fullscreen: boolean
  toggleFullscreen: () => void
  playback: boolean
  togglePlayback: () => void
  showUI: boolean
  toggleShowUI: (showUI?: boolean) => void
  info: boolean
  toggleInfo: () => void
  loading: boolean
  toggleLoading: (load?: boolean) => void
}
