import p5Types from 'p5'
import { Key, Scale } from 'tonal'
import { Gain, now, PolySynth, Synth } from 'tone'

import FPSCounter from '../../components/FPSCounter'
import Hand from '../../components/Hand'
import HandLegend from '../../components/HandLegend'
import Keyboard from '../../components/Keyboard'
import KeySelector from '../../components/KeySelector'
import NoHandsWarning from '../../components/NoHandsWarning'
import P5Canvas from '../../components/P5Canvas'
import Padboard from '../../components/Padboard'
import { gray, hexToRgb, leftColor, rightColor } from '../../../const'
import { HandsContextType, KeyLocation } from '../../../../types'
import { getAverageZ } from '../../hooks'
import { BoxParams } from '../../components/Box'

export type Controls = {
  leftVisible: boolean
  rightVisible: boolean
  leftActive: boolean
  rightActive: boolean
  leftX?: number
  leftXBuffer: number[]
  leftY?: number
  leftYBuffer: number[]
  rightX?: number
  rightXBuffer: number[]
  rightY?: number
  rightYBuffer: number[]
}

export default class DemoCanvas implements P5Canvas {
  major: boolean = true
  referenceOctave: number = 3
  selectedRoot: string = 'C'
  notes: string[] = [
    ...Scale.get(`C${this.referenceOctave} major`).notes,
    ...Scale.get(`C${this.referenceOctave + 1} major`).notes,
    ...Scale.get(`C${this.referenceOctave + 2} major`).notes,
  ]
  chords: string[] = this.getChords(`C`)
  chordOctave: number = 3
  fpsCounter: FPSCounter
  leftHand: Hand
  rightHand: Hand
  legend: HandLegend
  keyboard: Keyboard
  padboard: Padboard
  keySelector: KeySelector
  noHandsWarning: NoHandsWarning
  threshold: number = 0.54
  controls: Controls = {
    leftVisible: false,
    rightVisible: false,
    leftActive: false,
    rightActive: false,
    leftXBuffer: [],
    leftYBuffer: [],
    rightXBuffer: [],
    rightYBuffer: [],
  }
  canvas: BoxParams
  keyLocations: KeyLocation[] = []
  majorButtonLocation: KeyLocation | null = null

  gain: Gain
  noteSynth: Synth
  notePlaying: string | null = null

  chordPlaying: string[] = []
  chordSynth: PolySynth

  constructor(w: number, h: number) {
    this.canvas = {
      x: 20,
      y: 60,
      w: w - 30,
      h: h - 80,
    }

    this.fpsCounter = new FPSCounter({
      x: w - 105,
      y: h - 70,
    })

    this.leftHand = new Hand({
      x: this.canvas.x,
      y: this.canvas.y,
      w: this.canvas.w,
      h: this.canvas.h,
      color: hexToRgb(leftColor),
      pointerStyle: true,
    })

    this.rightHand = new Hand({
      x: this.canvas.x,
      y: this.canvas.y,
      w: this.canvas.w,
      h: this.canvas.h,
      color: hexToRgb(rightColor),
      pointerStyle: true,
    })

    this.keyboard = new Keyboard({
      x: this.canvas.x + 300,
      y: this.canvas.y + 180,
      w: this.canvas.w - 320,
      h: this.canvas.h - 190,
      numOfKeys: 14,
    })

    this.padboard = new Padboard({
      x: this.canvas.x + 10,
      y: this.canvas.y + 180,
      w: 250,
      h: this.canvas.h - 190,
    })

    this.keySelector = new KeySelector({
      x: this.canvas.x + 10,
      y: this.canvas.y + 10,
      w: 300,
      h: 100,
    })

    this.legend = new HandLegend({
      x: 25,
      y: h - 170,
    })

    this.noHandsWarning = new NoHandsWarning({
      x: 30,
      y: 30,
      w: w - 40,
      h: h - 60,
    })

    this.gain = new Gain(0.1)
    this.noteSynth = new Synth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.5,
        decay: 2.0,
        sustain: 0.6,
        release: 0.8,
      },
      volume: -15,
    })
    this.chordSynth = new PolySynth()
    this.chordSynth.set({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 1.0,
        decay: 1.0,
        sustain: 0.1,
        release: 1.0,
        attackCurve: 'sine',
      },
      volume: -15,
    })
    this.noteSynth.toDestination()
    this.chordSynth.toDestination()
  }

  show(p5: p5Types, hands: HandsContextType): void {
    this.getControls(hands)
    const activeChord = this.padboard.getActive(p5, this.controls)
    this.keyboard.getActive(p5, this.controls, activeChord, this.major)

    this.keyboard.show(p5, this.notes)
    this.padboard.show(p5, this.chords)
    this.leftHand.show(
      p5,
      hands.leftHand,
      this.controls.leftActive ? hexToRgb(leftColor) : hexToRgb(gray),
    )
    this.rightHand.show(
      p5,
      hands.rightHand,
      this.controls.rightActive ? hexToRgb(rightColor) : hexToRgb(gray),
    )
    this.keySelector.show(p5)
    this.fpsCounter.show(p5)
    this.noHandsWarning.show(p5, hands)

    this.playRighthandNote()
    this.playLefthandChord()
  }

  playRighthandNote() {
    if (this.keyboard.activeNote < 0) {
      this.notePlaying = null
      this.noteSynth.triggerRelease()
      return
    }

    const idx = this.keyboard.activeNote
    const fullNote = this.notes[idx]

    console.log(this.notePlaying, this.keyboard.activeNote)
    if (this.notePlaying == null) {
      this.noteSynth.triggerRelease()
      this.triggerNotePressed(fullNote)
    } else if (this.notePlaying == fullNote) {
      return
    } else {
      this.triggerNoteRelease()
      this.noteSynth.oscillator.frequency.linearRampToValueAtTime(
        fullNote,
        now(),
      )
    }
  }

  playLefthandChord() {
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

    if (this.chordPlaying[0] == chordNotes[0]) {
      return
    }

    if (this.chordPlaying.length) {
      this.triggerChordRelease()
    }

    this.triggerChordPressed(chordNotes)
  }

  getControls(hands: HandsContextType) {
    if (hands.leftHand.length) {
      this.controls.leftVisible = true
      this.controls.leftX = hands.leftHand[0].x
      this.controls.leftY = hands.leftHand[0].y
      this.controls.leftActive = getAverageZ(hands.leftHand) >= this.threshold
    } else {
      this.controls.leftVisible = false
      this.controls.leftActive = false
    }

    if (hands.rightHand.length) {
      this.controls.rightVisible = true
      this.controls.rightX = hands.rightHand[0].x
      this.controls.rightY = hands.rightHand[0].y
      this.controls.rightActive = getAverageZ(hands.rightHand) >= this.threshold
    } else {
      this.controls.rightVisible = false
      this.controls.rightActive = false
    }
  }

  onClick(p5: p5Types): void {
    const x = p5.mouseX
    const y = p5.mouseY

    const majorBtnPress = this.keySelector.checkMajorBtnPress(x, y)
    if (majorBtnPress !== null) {
      this.major = majorBtnPress
      this.notes = [
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave} major`).notes,
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 1} major`)
          .notes,
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 2} major`)
          .notes,
      ]
      this.chords = this.getChords(this.selectedRoot)
      return
    }

    const pianoKeyPress = this.keySelector.checkPianoKeyPress(x, y)

    if (pianoKeyPress !== null) {
      this.selectedRoot = pianoKeyPress
      this.notes = [
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave} major`).notes,
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 1} major`)
          .notes,
        ...Scale.get(`${this.selectedRoot}${this.referenceOctave + 2} major`)
          .notes,
      ]

      this.chords = this.getChords(this.selectedRoot)
      return
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
    this.notePlaying = note
    this.noteSynth.triggerAttack(note)
  }

  triggerChordPressed(chordNotes: string[]) {
    this.chordPlaying = chordNotes
    this.chordSynth.triggerAttack(chordNotes)
  }

  triggerNoteRelease() {
    if (this.notePlaying != null) {
      this.noteSynth.triggerRelease()
      this.notePlaying = null
    }
  }

  triggerChordRelease() {
    if (this.chordPlaying != null) {
      this.chordSynth.triggerRelease(this.chordPlaying)
    }
    this.chordPlaying = []
  }
}
