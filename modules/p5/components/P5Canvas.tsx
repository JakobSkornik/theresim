import p5Types from 'p5'
import { HandsController } from '../../mediapipe'
import { ControlPanelContextType, TutorialContextType } from '../../../types'

export default class P5Canvas {

  constructor(w: number, h: number) {}

  async setup() {}

  resize(w: number, h: number) {}

  show(p5: p5Types, hands: HandsController, assets: p5Types.Image[], controlPanel: ControlPanelContextType, tutorial?: TutorialContextType): void {
    throw new Error('Method not implemented.')
  }

  onClick(p5: p5Types): void {
    throw new Error('Method not implemented.')
  }
}
