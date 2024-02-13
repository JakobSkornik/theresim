import p5Types from 'p5'
import { HandsController } from '../../../mediapipe'
import { Key, Scale } from 'tonal'

import BackingTrackSelector from '../../components/BackingTrackSelector'
import Hand from '../../components/Hand'
import HandDetector from '../../../../components/HandDetector'
import InstrumentSelector from '../../components/InstrumentSelector'
import Keyboard from '../../components/Keyboard'
import MusicPlayer from '../../../../components/MusicPlayer'
import P5Canvas from '../../components/P5Canvas'
import Padboard from '../../components/Padboard'
import SongSelector from '../../components/SongSelector'
import { BoxParams } from '../../components/Box'
import { ControlPanelContextType, TutorialContextType } from '../../../../types'
import { gray, hexToRgb, rightColor } from '../../../const'

export default class TutorialCanvas implements P5Canvas {
  musicPlayer: MusicPlayer = new MusicPlayer()
  handDetector: HandDetector = new HandDetector()

  major: boolean = true
  mute: boolean = false

  referenceOctave: number = 3
  selectedRoot: string = 'C'
  notes: string[] = [
    ...Scale.get(`C${this.referenceOctave} major`).notes,
    ...Scale.get(`C${this.referenceOctave + 1} major`).notes,
    ...Scale.get(`C${this.referenceOctave + 2} major`).notes,
  ]
  chords: string[] = this.getChords(`C`)

  w: number
  h: number
  canvas!: BoxParams
  rightHand!: Hand
  keyboard!: Keyboard
  padboard!: Padboard
  instrumentSelector!: InstrumentSelector
  backingTrackSelector!: BackingTrackSelector
  songSelector!: SongSelector

  constructor(w: number, h: number) {
    this.w = w
    this.h = h

    this.placeElements()
  }

  placeElements() {
    this.canvas = {
      x: 20,
      y: 60,
      w: this.w - 30,
      h: this.h - 80,
    }

    this.rightHand = new Hand({
      x: this.canvas.x + 270,
      y: this.canvas.y + 10,
      w: this.canvas.w - 280,
      h: this.canvas.h - 20,
      color: hexToRgb(rightColor),
    })

    this.keyboard = new Keyboard({
      x: this.canvas.x + 270,
      y: this.canvas.y + 10,
      w: this.canvas.w - 280,
      h: this.canvas.h - 20,
      numOfKeys: 15,
    })

    this.padboard = new Padboard({
      x: this.canvas.x + 10,
      y: this.canvas.y + 10,
      w: 250,
      h: this.canvas.h - 20,
    })

    this.instrumentSelector = new InstrumentSelector({
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    })

    this.backingTrackSelector = new BackingTrackSelector({
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    })

    this.songSelector = new SongSelector({
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    })
  }

  show(
    p5: p5Types,
    hands: HandsController,
    assets: p5Types.Image[],
    controlPanel: ControlPanelContextType,
    tutorial: TutorialContextType,
  ): void {
    if (!hands) {
      return
    }

    this.handDetector.getControls(hands, controlPanel)

    let activeChord = this.handDetector.getActiveChord()
    let activeNote = this.keyboard.getActive(
      p5,
      this.handDetector.controls,
      activeChord,
      this.major,
    )

    this.keyboard.show(p5, this.notes, activeNote)
    this.padboard.show(p5, this.chords, activeChord, assets)
    this.rightHand.show(
      p5,
      hands.rightHand,
      controlPanel.fullHandMode,
      this.handDetector.controls.rightActive
        ? hexToRgb(rightColor)
        : hexToRgb(gray),
    )

    if (tutorial.stage > 1) {
      this.musicPlayer.playRighthandNote(activeNote, this.notes)
    }

    if (tutorial.stage > 2) {
      this.musicPlayer.playLefthandChord(activeChord, this.notes, this.major)
    }
  }

  async setup() {
    await this.musicPlayer.setup(
      this.backingTrackSelector,
      this.songSelector,
      this.instrumentSelector.selected,
    )
  }

  resize(w: number, h: number) {
    this.w = w
    this.h = h
    this.placeElements()
  }

  async onClick(p5: p5Types) {
    const x = p5.mouseX
    const y = p5.mouseY
  }

  getChords(scaleName: string) {
    let chords
    if (this.major) {
      chords = [...Key.majorKey(scaleName).triads]
    } else {
      chords = [...Key.minorKey(scaleName).natural.triads]
      chords.splice(1, 1)
    }
    return chords
  }
}
