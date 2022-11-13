import P5Canvas from '../modules/p5/components/P5Canvas'
import { HandsContextType } from './HandsContextType'

export type CanvasProps = {
  title: string
  width: number
  height: number
  scene: typeof P5Canvas
  hands: HandsContextType
}
