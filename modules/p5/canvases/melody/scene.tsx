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
import SongSelector from '../../components/SongSelector'
import { BoxParams } from '../../components/Box'
import { ControlPanelContextType } from '../../../../types'
import {
  SimpleSong,
  gray,
  hexToRgb,
  rightColor,
  simpleSongInformation,
} from '../../../const'

export default class MelodyCanvas implements P5Canvas {
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

  w: number
  h: number
  canvas!: BoxParams
  rightHand!: Hand
  keyboard!: Keyboard
  instrumentSelector!: InstrumentSelector
  backingTrackSelector!: BackingTrackSelector
  songSelector!: SongSelector
  songPlaying: SimpleSong | undefined = undefined

  activeNote = -1
  activeNoteIdx = 0
  nextActiveNote: number | undefined = undefined
  prevHandNote = -1

  share = 0.0
  currentTime = 0.0

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
      x: this.canvas.x + 10,
      y: this.canvas.y + 100,
      w: this.canvas.w - 20,
      h: this.canvas.h - 110,
      color: hexToRgb(rightColor),
    })

    this.keyboard = new Keyboard({
      x: this.canvas.x + 10,
      y: this.canvas.y + 100,
      w: this.canvas.w - 20,
      h: this.canvas.h - 110,
      numOfKeys: 15,
    })

    this.instrumentSelector = new InstrumentSelector({
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    })
    this.instrumentSelector.selected = this.instrumentSelector.instruments[4]

    this.backingTrackSelector = new BackingTrackSelector({
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    })

    this.songSelector = new SongSelector({
      x: this.canvas.x + 10,
      y: this.canvas.y + 10,
      w: this.canvas.w - 20,
      h: 60,
    })
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
    const handNote = this.keyboard.getActive(
      p5,
      this.handDetector.controls,
      -1,
      this.major,
    )

    this.updateNoteAndShare(handNote)
    this.keyboard.showMelody(p5, this.notes, this.activeNote, this.nextActiveNote, this.share)
    this.rightHand.show(
      p5,
      hands.rightHand,
      context.fullHandMode,
      this.handDetector.controls.rightActive
        ? hexToRgb(rightColor)
        : hexToRgb(gray),
    )
    this.songSelector.show(p5)

    this.musicPlayer.playSongNote(
      this.activeNote,
      handNote,
      this.share,
      this.notes,
    )
    this.prevHandNote = handNote
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

    if (!this.mute) {
      const songPress = this.songSelector.checkKeyPress(x, y)
      if (songPress !== null) {
        return await this.processSongBtnPress()
      }
    }
  }

  updateNoteAndShare(handNote: number) {
    if (
      !this.songPlaying ||
      this.activeNoteIdx >= this.songPlaying.notes.length
    ) {
      return
    }

    const currentNote = this.songPlaying.notes[this.activeNoteIdx]
    const bpm = this.songPlaying.bpm
    const durationInSeconds = (currentNote.duration / bpm) * 60
    const now = performance.now()

    if (this.prevHandNote !== handNote) {
      this.prevHandNote = handNote
      this.currentTime = now
    }

    const elapsedTime = (now - this.currentTime) / 1000

    if (handNote === currentNote.note) {
      this.share = elapsedTime / durationInSeconds
      this.share = Math.min(this.share, 1.0)
    } else if (handNote !== -1) {
      this.share = 0.0
    }

    if (this.share >= 0.8 && handNote == -1) {
      this.activeNoteIdx++
      this.share = 0.0
      this.currentTime = now

      if (this.activeNoteIdx >= this.songPlaying.notes.length) {
        this.songSelector.selected = null
        this.songPlaying = undefined
        this.activeNote = -1
        this.activeNoteIdx = 0
        return
      }
    }

    if (this.activeNoteIdx < this.songPlaying.notes.length) {
      this.activeNote = this.songPlaying.notes[this.activeNoteIdx].note
      this.nextActiveNote = this.songPlaying.notes[this.activeNoteIdx + 1]?.note
    }
  }

  async processSongBtnPress() {
    if (this.songPlaying?.title == this.songSelector.selected) {
      this.songSelector.selected = null
      this.songPlaying = undefined
      return
    }

    const song = simpleSongInformation(this.songSelector.selected!)
    this.songPlaying = song
  }
}
