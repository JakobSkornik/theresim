import p5Types from 'p5'
import { HandsController } from '../../../mediapipe'
import { Key, Scale } from 'tonal'
import { Landmark } from '@mediapipe/hands'
import { instrument, InstrumentName, Player } from 'soundfont-player'

import BackingTrackSelector from '../../components/BackingTrackSelector'
import FPSCounter from '../../components/FPSCounter'
import Hand from '../../components/Hand'
import HandLegend from '../../components/HandLegend'
import InstrumentSelector from '../../components/InstrumentSelector'
import Keyboard from '../../components/Keyboard'
import KeySelector from '../../components/KeySelector'
import MuteButton from '../../components/MuteButton'
import NoHandsWarning from '../../components/NoHandsWarning'
import P5Canvas from '../../components/P5Canvas'
import Padboard from '../../components/Padboard'
import { BoxParams } from '../../components/Box'
import { ControlPanelContextType, KeyLocation } from '../../../../types'
import {
  backingTrackInformation,
  gray,
  hexToRgb,
  rightColor,
} from '../../../const'

export type Controls = {
  leftVisible: boolean
  leftGesture: number
  rightVisible: boolean
  rightActive: boolean
  rightX?: number
  rightY?: number
}

export default class DemoCanvas implements P5Canvas {
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
  noHandsWarning!: NoHandsWarning

  keyLocations: KeyLocation[] = []
  majorButtonLocation: KeyLocation | null = null
  muteButtonLocation: KeyLocation | null = null

  controls: Controls = {
    leftVisible: false,
    leftGesture: 0,
    rightVisible: false,
    rightActive: false,
  }

  player!: Player
  ac!: AudioContext
  gainNode!: GainNode

  notePlaying: Player | null = null
  notePlayingName: string | null = null
  notePlayingTime: number | null = null

  chordPlaying: Player[] = []
  chordPlayingName: string[] = []

  backingTrackPlaying: string | null = null
  backingTrackSource: AudioBufferSourceNode | null = null

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

    this.getControls(hands, context)
    const activeChord = this.padboard.getActive(this.controls)
    this.keyboard.getActive(p5, this.controls, activeChord, this.major)

    this.keyboard.show(p5, this.notes)
    this.padboard.show(p5, this.chords, assets)
    this.rightHand.show(
      p5,
      hands.rightHand,
      context.fullHandMode,
      this.controls.rightActive ? hexToRgb(rightColor) : hexToRgb(gray),
    )
    this.muteButton.show(p5)
    this.keySelector.show(p5)
    this.backingTrackSelector.show(p5)
    this.instrumentSelector.show(p5)
    this.fpsCounter.show(p5)
    // this.noHandsWarning.show(p5, hands)

    this.playRighthandNote()
    this.playLefthandChord()
  }

  async setup() {
    this.ac = new AudioContext()
    this.gainNode = this.ac.createGain()

    this.player = await instrument(
      this.ac,
      this.instrumentSelector.selected as InstrumentName,
      {
        soundfont: 'FluidR3_GM',
      },
    ).then((player: Player) => {
      console.log(`Soundfont player initialized.`)
      return player
    })

    this.player.connect(this.gainNode)

    this.backingTrackSource = this.ac.createBufferSource()
    this.backingTrackSource.connect(this.gainNode)

    this.gainNode.gain.setValueAtTime(0.5, this.ac.currentTime)
    this.gainNode.connect(this.ac.destination)
  }

  resize(w: number, h: number) {
    this.w = w
    this.h = h
    this.placeElements()
  }

  playRighthandNote() {
    if (this.keyboard.activeNote < 0) {
      this.triggerNoteRelease()
      return
    }

    const idx = this.keyboard.activeNote
    const fullNote = this.notes[idx]

    if (this.notePlayingName == fullNote) {
      if (this.noteHasBeenPlayingLongerThanDuration()) {
        this.startNoteLoop(fullNote)
      }
      return
    } else if (this.notePlaying == null) {
      this.triggerNotePressed(fullNote)
    } else {
      this.triggerNoteRelease()
      this.triggerNotePressed(fullNote)
    }
  }

  playLefthandChord() {
    if (this.backingTrackPlaying) {
      return
    }

    if (this.padboard.activeChord < 0) {
      this.triggerChordRelease()
      return
    }

    const idx = this.padboard.activeChord
    const chordNotes = [
      this.notes[idx % 7],
      this.notes[(idx + 2) % 7],
      this.notes[(idx + 4) % 7],
    ]

    if (this.chordPlayingName[0] == chordNotes[0]) {
      return
    }

    if (this.chordPlaying.length) {
      this.triggerChordRelease()
    }

    this.triggerChordPressed(chordNotes)
  }

  getControls(hands: HandsController, context: ControlPanelContextType) {
    if (!hands) {
      return
    }

    if (hands && hands.leftHand.length) {
      this.controls.leftVisible = true
      this.controls.leftGesture = this.leftHandGesture(hands.leftHand)
    } else {
      this.controls.leftVisible = false
    }

    if (hands.rightHand.length) {
      this.controls.rightVisible = true
      this.controls.rightX = hands.rightHand[8].x
      this.controls.rightY = hands.rightHand[8].y
      this.controls.rightActive = this.rightHandActive(hands.rightHand, context)
    } else {
      this.controls.rightVisible = false
      this.controls.rightActive = false
    }
  }

  async onClick(p5: p5Types) {
    const x = p5.mouseX
    const y = p5.mouseY

    const majorBtnPress = this.keySelector.checkMajorBtnPress(x, y)
    if (majorBtnPress !== null) {
      this.major = majorBtnPress
      const mode = this.major ? 'major' : 'minor'
      this.notes = [
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave} ${mode}`)
          .notes,
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 1} ${mode}`)
          .notes,
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 2} ${mode}`)
          .notes,
      ]
      this.chords = this.getChords(this.selectedRoot)
      return
    }

    const pianoKeyPress = this.keySelector.checkPianoKeyPress(x, y)
    if (pianoKeyPress !== null) {
      this.selectedRoot = pianoKeyPress
      const mode = this.major ? 'major' : 'minor'
      this.notes = [
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave} ${mode}`)
          .notes,
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 1} ${mode}`)
          .notes,
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 2} ${mode}`)
          .notes,
      ]

      this.chords = this.getChords(this.selectedRoot)
      return
    }

    const instrumentKeyPress = this.instrumentSelector.checkKeyPress(x, y)
    if (instrumentKeyPress !== null) {
      this.player = await instrument(
        this.ac,
        this.instrumentSelector.selected as InstrumentName,
        {
          soundfont: 'FluidR3_GM',
        },
      ).then((player: Player) => {
        console.log(`Soundfont player initialized.`)
        return player
      })
      this.player.connect(this.gainNode)
    }

    if (!this.mute) {
      const backingTrackPress = this.backingTrackSelector.checkKeyPress(x, y)
      if (backingTrackPress !== null) {
        if (this.backingTrackPlaying) {
          this.backingTrackSource!.stop()
          this.backingTrackSource = null
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
          ...Scale.get(`${this.selectedRoot}${this.referenceOctave} ${mode}`)
            .notes,
          ...Scale.get(
            `${this.selectedRoot}${this.referenceOctave + 1} ${mode}`,
          ).notes,
          ...Scale.get(
            `${this.selectedRoot}${this.referenceOctave + 2} ${mode}`,
          ).notes,
        ]
        this.chords = this.getChords(this.selectedRoot)

        const buffer = await fetch(`${this.backingTrackSelector.selected}.mp3`)
          .then((res) => res.arrayBuffer())
          .then((ArrayBuffer) => this.ac.decodeAudioData(ArrayBuffer))

        this.backingTrackSource = this.ac.createBufferSource()
        this.backingTrackSource.buffer = buffer
        this.backingTrackSource.connect(this.gainNode)
        this.backingTrackSource.start()

        this.backingTrackPlaying = this.backingTrackSelector.selected
      }
    }

    const muteKeyPress = this.muteButton.checkMuteBtnPress(x, y)
    if (muteKeyPress !== null) {
      this.mute = muteKeyPress
      if (muteKeyPress) {
        this.gainNode.gain.setValueAtTime(-1.0, this.ac.currentTime)

        if (this.backingTrackPlaying) {
          this.backingTrackSource!.stop()
          this.backingTrackSource = null
          this.backingTrackPlaying = null
          this.backingTrackSelector.selected = null
        }
      } else {
        this.gainNode.gain.setValueAtTime(0.5, this.ac.currentTime)
      }
    }
  }

  getChords(scaleName: string) {
    let chords
    if (this.major) {
      chords = [...Key.majorKey(scaleName).chords]
    } else {
      chords = [...Key.minorKey(scaleName).natural.chords]
      chords.splice(1, 1)
    }

    for (let i = 0; i < 6; i++) {
      chords[i] = chords[i].slice(0, -1)
    }
    return chords
  }

  triggerNotePressed(note: string) {
    this.notePlayingName = note
    this.notePlaying = this.player.play(note, this.ac.currentTime, {
      adsr: [0.2, 0.5, 0.5, 1.0],
    })
    this.notePlayingTime = this.ac.currentTime
  }

  triggerChordPressed(chordNotes: string[]) {
    for (let i = 0; i < chordNotes.length; i++) {
      this.chordPlaying.push(
        this.player.play(chordNotes[i], this.ac.currentTime, {
          adsr: [0.2, 0.5, 0.5, 1.0],
          loop: true,
        }),
      )
    }
    this.chordPlayingName = chordNotes
  }

  triggerNoteRelease() {
    if (this.notePlaying != null) {
      this.notePlaying.stop()
      this.notePlayingName = null
      this.notePlayingTime = null
    }
  }

  noteHasBeenPlayingLongerThanDuration() {
    const duration = 2.0
    return this.ac.currentTime - this.notePlayingTime! > duration
  }

  startNoteLoop(note: string) {
    this.notePlaying = this.player.play(note, this.ac.currentTime, {
      adsr: [0.2, 0.5, 0.5, 1.0],
    })
    this.notePlayingTime = this.ac.currentTime
  }

  triggerChordRelease() {
    if (this.chordPlaying.length) {
      for (let i = 0; i < this.chordPlaying.length; i++) {
        if (this.chordPlaying[i]) {
          this.chordPlaying[i].stop()
        }
      }
    }
    this.chordPlaying = []
    this.chordPlayingName = []
  }

  leftHandGesture(hand: Landmark[]) {
    let bits = ['0', '0', '0', '0', '0']

    if (hand[4].x > hand[3].x) {
      bits[4] = '1'
    }

    if (hand[8].y < hand[6].y) {
      bits[3] = '1'
    }

    if (hand[12].y < hand[10].y) {
      bits[2] = '1'
    }

    if (hand[16].y < hand[14].y) {
      bits[1] = '1'
    }

    if (hand[20].y < hand[18].y) {
      bits[0] = '1'
    }

    return parseInt(bits.join(''), 2)
  }

  rightHandActive(hand: Landmark[], context: ControlPanelContextType) {
    if (context.thumbTriggerMode) {
      return hand[4].x < hand[3].x
    }

    const detectionPercentage = 0.3
    const height = hand[5].y - hand[0].y
    return hand[8].y > hand[6].y + height * detectionPercentage
  }
}
