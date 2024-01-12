import p5Types from 'p5'
import { HandsController } from '../../../mediapipe'
import { Key, Scale } from 'tonal'

import BackingTrackSelector from '../../components/BackingTrackSelector'
import FPSCounter from '../../components/FPSCounter'
import Hand from '../../components/Hand'
import HandDetector from '../../../../components/HandDetector'
import HandLegend from '../../components/HandLegend'
import InstrumentSelector from '../../components/InstrumentSelector'
import Keyboard from '../../components/Keyboard'
import KeySelector from '../../components/KeySelector'
import MusicPlayer from '../../../../components/MusicPlayer'
import MuteButton from '../../components/MuteButton'
import NoHandsWarning from '../../components/NoHandsWarning'
import P5Canvas from '../../components/P5Canvas'
import Padboard from '../../components/Padboard'
import SongSelector from '../../components/SongSelector'
import { BoxParams } from '../../components/Box'
import {
  ControlPanelContextType,
  KeyLocation,
} from '../../../../types'
import {
  backingTrackInformation,
  gray,
  hexToRgb,
  rightColor,
  simpleSongInformation,
} from '../../../const'

export default class DemoCanvas implements P5Canvas {
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
  fpsCounter!: FPSCounter
  rightHand!: Hand
  legend!: HandLegend
  keyboard!: Keyboard
  padboard!: Padboard
  muteButton!: MuteButton
  keySelector!: KeySelector
  instrumentSelector!: InstrumentSelector
  backingTrackSelector!: BackingTrackSelector
  songSelector!: SongSelector
  noHandsWarning!: NoHandsWarning

  keyLocations: KeyLocation[] = []
  majorButtonLocation: KeyLocation | null = null
  muteButtonLocation: KeyLocation | null = null

  backingTrackPlaying: string | null = null
  songPlaying: string | null = null

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

    this.fpsCounter = new FPSCounter({
      x: this.w - 105,
      y: this.canvas.y + 120,
    })

    this.rightHand = new Hand({
      x: this.canvas.x + 300,
      y: this.canvas.y + 170,
      w: this.canvas.w - 320,
      h: this.canvas.h - 180,
      color: hexToRgb(rightColor),
    })

    this.keyboard = new Keyboard({
      x: this.canvas.x + 300,
      y: this.canvas.y + 170,
      w: this.canvas.w - 320,
      h: this.canvas.h - 180,
      numOfKeys: 15,
    })

    this.padboard = new Padboard({
      x: this.canvas.x + 10,
      y: this.canvas.y + 170,
      w: 250,
      h: this.canvas.h - 180,
    })

    this.muteButton = new MuteButton({
      x: this.canvas.x + 320,
      y: this.canvas.y + 120,
      w: 300,
      h: 40,
    })

    this.keySelector = new KeySelector({
      x: this.canvas.x + 10,
      y: this.canvas.y + 10,
      w: 300,
      h: 100,
    })

    this.instrumentSelector = new InstrumentSelector({
      x: this.canvas.x + 320,
      y: this.canvas.y + 10,
      w: this.w - 660,
      h: 90,
    })

    this.backingTrackSelector = new BackingTrackSelector({
      x: this.canvas.w - 285,
      y: this.canvas.y + 10,
      w: 300,
      h: 90,
    })

    this.songSelector = new SongSelector({
      x: 540,
      y: this.canvas.y + 120,
      w: this.w - 660,
      h: 30,
    })

    this.legend = new HandLegend({
      x: 25,
      y: this.h - 170,
    })

    // this.noHandsWarning = new NoHandsWarning({
    //   x: 30,
    //   y: 30,
    //   w: this.w - 40,
    //   h: this.h - 60,
    // })
  }

  show(
    p5: p5Types,
    hands: HandsController,
    assets: p5Types.Image[],
    context: ControlPanelContextType,
  ): void {
    if (!hands) {
      return
    }

    this.handDetector.getControls(hands, context)

    let activeChord = -1
    if (this.backingTrackPlaying) {
      activeChord = this.musicPlayer.getActiveChord()
    } else {
      activeChord = this.handDetector.getActiveChord()
    }

    let activeNote = -1
    if (this.songPlaying) {
      activeNote = this.musicPlayer.getActiveNote()
    } else {
      activeNote = this.keyboard.getActive(
        p5,
        this.handDetector.controls,
        activeChord,
        this.major,
      )
    }

    this.keyboard.show(p5, this.notes, activeNote)
    this.padboard.show(p5, this.chords, activeChord, assets)
    this.rightHand.show(
      p5,
      hands.rightHand,
      context.fullHandMode,
      this.handDetector.controls.rightActive
        ? hexToRgb(rightColor)
        : hexToRgb(gray),
    )
    this.muteButton.show(p5)
    this.keySelector.show(p5)
    this.backingTrackSelector.show(p5)
    this.songSelector.show(p5)
    this.instrumentSelector.show(p5)
    this.fpsCounter.show(p5)
    // this.noHandsWarning.show(p5, hands)

    this.musicPlayer.playRighthandNote(activeNote, this.notes)
    if (!this.backingTrackPlaying)
      this.musicPlayer.playLefthandChord(activeChord, this.notes, this.major)
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

    const majorBtnPress = this.keySelector.checkMajorBtnPress(x, y)
    if (majorBtnPress !== null) {
      return this.processMajorBtnPress(majorBtnPress)
    }

    const muteKeyPress = this.muteButton.checkMuteBtnPress(x, y)
    if (muteKeyPress !== null) {
      return this.processMuteBtnPress(muteKeyPress)
    }

    const pianoKeyPress = this.keySelector.checkPianoKeyPress(x, y)
    if (pianoKeyPress !== null) {
      return this.processPianoBtnPress(pianoKeyPress)
    }

    const instrumentKeyPress = this.instrumentSelector.checkKeyPress(x, y)
    if (instrumentKeyPress !== null) {
      await this.musicPlayer.setInstrument(instrumentKeyPress)
    }

    if (!this.mute && !this.songPlaying) {
      const backingTrackPress = this.backingTrackSelector.checkKeyPress(x, y)
      if (backingTrackPress !== null) {
        return await this.processBackingTrackBtnPress()
      }
    }

    if (!this.mute && !this.backingTrackPlaying) {
      const songPress = this.songSelector.checkKeyPress(x, y)
      if (songPress !== null) {
        return await this.processSongBtnPress()
      }
    }
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

  processMajorBtnPress(target: boolean) {
    this.major = target
    const mode = this.major ? 'major' : 'minor'
    this.notes = [
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave} ${mode}`).notes,
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 1} ${mode}`)
        .notes,
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 2} ${mode}`)
        .notes,
    ]
    this.chords = this.getChords(this.selectedRoot)
    return
  }

  processMuteBtnPress(target: boolean) {
    this.mute = target
    if (target) {
      this.musicPlayer.mute()

      if (this.backingTrackPlaying) {
        this.musicPlayer.stopBackingTrack()
        this.backingTrackPlaying = null
        this.backingTrackSelector.selected = null
      }
    } else {
      this.musicPlayer.unmute()
    }
  }

  processPianoBtnPress(target: string) {
    this.selectedRoot = target
    const mode = this.major ? 'major' : 'minor'
    this.notes = [
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave} ${mode}`).notes,
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 1} ${mode}`)
        .notes,
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 2} ${mode}`)
        .notes,
    ]

    this.chords = this.getChords(this.selectedRoot)
    return
  }

  async processBackingTrackBtnPress() {
    if (this.backingTrackPlaying) {
      this.musicPlayer.stopBackingTrack()
    }

    if (this.backingTrackPlaying == this.backingTrackSelector.selected) {
      this.backingTrackSelector.selected = null
      this.backingTrackPlaying = null
      return
    }

    const backingTrack = backingTrackInformation(
      this.backingTrackSelector.selected!,
    )
    this.selectedRoot = backingTrack!.key
    this.keySelector.setKey(backingTrack!.key, backingTrack!.major)
    this.major = backingTrack!.major

    const mode = this.major ? 'major' : 'minor'
    this.notes = [
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave} ${mode}`).notes,
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 1} ${mode}`)
        .notes,
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 2} ${mode}`)
        .notes,
    ]
    this.chords = this.getChords(this.selectedRoot)

    await this.musicPlayer.playBackingTrack(
      this.backingTrackSelector.selected!,
      backingTrack!,
    )
    this.backingTrackPlaying = this.backingTrackSelector.selected
  }

  async processSongBtnPress() {
    if (this.songPlaying) {
      this.musicPlayer.stopSong()
    }

    if (this.songPlaying == this.songSelector.selected) {
      this.songSelector.selected = null
      this.songPlaying = null
      return
    }

    const song = simpleSongInformation(this.songSelector.selected!)
    this.selectedRoot = song!.key
    this.keySelector.setKey(song!.key, song!.major)
    this.major = song!.major

    const mode = this.major ? 'major' : 'minor'
    this.notes = [
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave} ${mode}`).notes,
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 1} ${mode}`)
        .notes,
      ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 2} ${mode}`)
        .notes,
    ]
    this.chords = this.getChords(this.selectedRoot)

    this.musicPlayer.playSong(song!)
    this.songPlaying = this.songSelector.selected
  }
}
