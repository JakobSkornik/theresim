import P5Canvas from '../modules/p5/components/P5Canvas'

export type P5ContainerProps = {
  title: string
  mediapipe: boolean
  scene: typeof P5Canvas
  icon?: string
  style?: { [Key: string]: string }
  playbackOffset: [number, number]
  playbackSize: [number, number]
}
