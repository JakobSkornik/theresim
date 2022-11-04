import p5Types from 'p5'
import { HandsContextType } from './HandsContextType'

export type CanvasProps = {
    width: number
    height: number
    scene: (p5: p5Types, hands: HandsContextType) => void
    hands: HandsContextType
}