import p5Types from 'p5'
import { Key, Scale } from 'tonal'
import { Gain, now, Synth } from 'tone'

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
  selectedRoot: string = 'C'
  notes: string[] = Scale.get(`C major`).notes
  chords: string[] = this.getChords(`C`)
  referenceOctave: number = 3
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
  
  chordPlaying: string | null = null
  chordSynth1: Synth
  chordSynth2: Synth
  chordSynth3: Synth


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
      numOfKeys: 21,
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

    this.gain = new Gain(0.4)
    this.noteSynth = new Synth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.8,
        decay: 0.2,
        sustain: 1.0,
        release: 0.8,
      },
      volume: 0.3
    })
    this.chordSynth1 = new Synth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.8,
        decay: 0.2,
        sustain: 1.0,
        release: 0.8,
      },
      volume: 0.1
    })
    this.chordSynth2 = new Synth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.8,
        decay: 0.2,
        sustain: 1.0,
        release: 0.8,
      },
      volume: 0.1
    })
    this.chordSynth3 = new Synth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.8,
        decay: 0.2,
        sustain: 1.0,
        release: 0.8,
      },
      volume: 0.1
    })
    this.noteSynth.toDestination()
    this.chordSynth1.toDestination()
    this.chordSynth2.toDestination()
    this.chordSynth3.toDestination()
    this.gain.toDestination()
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
      this.noteSynth.triggerRelease()
      return
    }

    const octave = Math.floor(this.keyboard.activeNote / 7)
    const idx = this.keyboard.activeNote % 7
    const fullNote = `${this.notes[idx]}${octave + this.referenceOctave}`

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
    console.log(this.padboard.activeChord)
    if (this.padboard.activeChord < 0) {
      this.chordSynth1.triggerRelease()
      this.chordSynth2.triggerRelease()
      this.chordSynth3.triggerRelease()
      return
    }

    const chord = this.chords[this.padboard.activeChord]
    const idx = this.padboard.activeChord
    const chordNotes = [
      this.notes[idx % 6] + this.chordOctave,
      this.notes[(idx + 2 )% 6] + this.chordOctave,
      this.notes[(idx + 4) % 6] + this.chordOctave,
    ]
    console.log(idx, chordNotes)
    if (!this.chordPlaying) {
      this.chordSynth1.triggerRelease()
      this.chordSynth2.triggerRelease()
      this.chordSynth3.triggerRelease()
      this.triggerChordPressed(chord, chordNotes)
    } else if (this.chordPlaying == chord) {
      return
    } else {
      this.triggerChordRelease()
      this.chordSynth1.oscillator.frequency.linearRampToValueAtTime(
        chordNotes[0],
        now(),
      )
      this.chordSynth2.oscillator.frequency.linearRampToValueAtTime(
        chordNotes[1],
        now(),
      )
      this.chordSynth3.oscillator.frequency.linearRampToValueAtTime(
        chordNotes[2],
        now(),
      )
    }
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
      const scaleName = `${this.selectedRoot} ${this.major ? 'major' : 'minor'}`
      this.notes = Scale.get(scaleName).notes
      this.chords = this.getChords(this.selectedRoot)
      return
    }

    const pianoKeyPress = this.keySelector.checkPianoKeyPress(x, y)

    if (pianoKeyPress !== null) {
      this.selectedRoot = pianoKeyPress
      const scaleName = `${this.selectedRoot} ${this.major ? 'major' : 'minor'}`
      this.notes = Scale.get(scaleName).notes
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

  triggerChordPressed(chord: string, chordNotes: string[]) {
    this.chordPlaying = chord
    this.chordSynth1.triggerAttack(chordNotes[0])
    this.chordSynth2.triggerAttack(chordNotes[1])
    this.chordSynth3.triggerAttack(chordNotes[2])
  }

  triggerNoteRelease() {
    if (this.notePlaying != null) {
      this.noteSynth.triggerRelease()
      this.notePlaying = null
    }
  }

  triggerChordRelease() {
    if (this.chordPlaying != null) {
      this.chordSynth1.triggerRelease()
      this.chordSynth2.triggerRelease()
      this.chordSynth3.triggerRelease()
      this.chordPlaying = null
    }
  }
}
