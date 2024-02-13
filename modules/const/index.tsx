export const handRanges = [
  [0, 1],
  [1, 5],
  [5, 9],
  [9, 13],
  [13, 17],
  [17, 21],
]

export const connections = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [5, 6],
  [6, 7],
  [7, 8],
  [9, 10],
  [10, 11],
  [11, 12],
  [13, 14],
  [14, 15],
  [15, 16],
  [17, 18],
  [18, 19],
  [19, 20],
  [2, 5],
  [0, 17],
  [5, 9],
  [9, 13],
  [13, 17],
  [5, 17],
]

export const pianoNotes = [
  { key: 'C3', freq: 130.81 },
  { key: 'C#3', freq: 138.59 },
  { key: 'Db3', freq: 138.59 },
  { key: 'D3', freq: 146.83 },
  { key: 'D#3', freq: 155.56 },
  { key: 'Eb3', freq: 155.56 },
  { key: 'E3', freq: 164.81 },
  { key: 'F3', freq: 174.61 },
  { key: 'F#3', freq: 185.0 },
  { key: 'Gb3', freq: 185.0 },
  { key: 'G3', freq: 196.0 },
  { key: 'G#3', freq: 207.65 },
  { key: 'Ab3', freq: 207.65 },
  { key: 'A3', freq: 220.0 },
  { key: 'A#3', freq: 233.08 },
  { key: 'Bb3', freq: 233.08 },
  { key: 'B3', freq: 246.94 },
  { key: 'C4', freq: 261.63 },
  { key: 'C#4', freq: 277.18 },
  { key: 'Db4', freq: 277.18 },
  { key: 'D4', freq: 293.66 },
  { key: 'D#4', freq: 311.13 },
  { key: 'Eb4', freq: 311.13 },
  { key: 'E4', freq: 329.63 },
  { key: 'F4', freq: 349.23 },
  { key: 'F#4', freq: 369.99 },
  { key: 'Gb4', freq: 369.99 },
  { key: 'G4', freq: 392.0 },
  { key: 'G#4', freq: 415.3 },
  { key: 'Ab4', freq: 415.3 },
  { key: 'A4', freq: 440.0 },
  { key: 'A#4', freq: 466.16 },
  { key: 'Bb4', freq: 466.16 },
  { key: 'B4', freq: 493.88 },
  { key: 'C5', freq: 523.25 },
  { key: 'C#5', freq: 554.37 },
  { key: 'Db5', freq: 554.37 },
  { key: 'D5', freq: 587.33 },
  { key: 'D#5', freq: 622.25 },
  { key: 'Eb5', freq: 622.25 },
  { key: 'E5', freq: 659.26 },
  { key: 'F5', freq: 698.46 },
  { key: 'F#5', freq: 739.99 },
  { key: 'Gb5', freq: 739.99 },
  { key: 'G5', freq: 783.99 },
  { key: 'G#5', freq: 830.61 },
  { key: 'Ab5', freq: 830.61 },
  { key: 'A5', freq: 880.0 },
  { key: 'A#5', freq: 932.33 },
  { key: 'Bb5', freq: 932.33 },
  { key: 'B5', freq: 987.77 },
]

// https://flatuicolors.com/palette/ru
export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  var r = parseInt(result![1], 16)
  var g = parseInt(result![2], 16)
  var b = parseInt(result![3], 16)
  return [r, g, b]
}

export const primary = '#170328'
export const textColor = '#D91C59'
export const secondary = '#FF16CE'
export const tertiary = '#352CFF'
export const fifth = '#f54171'
export const shadow = '#03FFA1'
export const borderColor = '#00B8FF'
export const leftColor = '#03FF9F'
export const rightColor = '#D600FF'

export const gray = '#303952'
export const tintedWhite = '#ebe1d9'
export const yellow = '#f5cd79'
export const red = '#ee6134'
export const blue = '#1e8fc2'
export const green = '#1e8f7d'
export const rosy = '#f7d794'
export const peachy = '#f3a683'
export const purple = '#cf6a87'
export const pink = '#f8a5c2'
export const mountain = '#786fa6'
export const deepPurple = '#574b90'
export const darkBlue = '#546de5'
export const geranimo = '#22a6b3'

export const RED = (alpha = 255) => [238, 97, 52, alpha]
export const GREEN = (alpha = 255) => [30, 143, 125, alpha]
export const BLUE = (alpha = 255) => [30, 143, 194, alpha]
export const BLACK = (alpha = 255) => [10, 10, 10, alpha]
export const WHITE = (alpha = 255) => [255, 255, 255, alpha]
export const GRAY = (alpha = 255) => [100, 100, 100, alpha]
export const BG = (alpha = 255) => [235, 225, 217, alpha]
export const BROWN = (alpha = 255) => [243, 166, 131, alpha]
export const AAK = (alpha = 255) => [241, 144, 102, alpha]
export const YELLOW = (alpha = 255) => [245, 205, 121, alpha]
export const PENCIL = (alpha = 255) => [133, 121, 123, alpha]
export const PINK = (alpha = 255) => [248, 165, 194, alpha]
export const CURACAO = (alpha = 255) => [61, 193, 211, alpha]
export const BISCAY = (alpha = 255) => [48, 57, 82, alpha]
export const CYAN = (alpha = 255) => [170, 216, 233, alpha]

export const getNoteName = (idx: number, white: boolean) => {
  let notes = ['C#', 'D#', 'F#', 'G#', 'A#']
  if (white) {
    notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  }
  return notes[idx]
}

const demoDocs = () => {
  return (
    <p>
      To play the instrument enable the webcam. To ensure you are visible by the
      webcam, enable webcam feedback by clicking the webcam icon in the control
      panel.
      <br />
      <br />
      You play chords with your left hand. Simply gesture the chord with
      appropriate hand gesture displayed next to the chord.
      <br />
      <br />
      You play notes with your right hand. Extend your index finger, the tip of
      the finger selects the note. Extend your thumb to trigger note, retract
      your thumb to stop playing.
      <br />
      <br />
      Above the playing area is the scale selector and instrument selector.
    </p>
  )
}

export const getInformationText = (route: string) => {
  switch (route) {
    case '/demo':
      return demoDocs()
    default:
      return (
        <p>
          I just display information about each page. Current page is ${route}
        </p>
      )
  }
}

export type Chord = {
  chord: number
  duration: number
}

export type Note = {
  note: number
  duration: number
}

export type SimpleSong = {
  key: string
  title: string
  major: boolean
  bpm: number
  notes: Note[]
}

export type BackingTrack = {
  key: string
  major: boolean
  bpm: number
  initialDelay: number
  chords: Chord[]
}

export const backingTrackInformation = (track: string) => {
  switch (track) {
    case 'comfortably_numb':
      return {
        key: 'B',
        major: false,
        bpm: 64,
        initialDelay: 2,
        chords: [
          {
            chord: 0,
            duration: 4,
          } as Chord,
          {
            chord: 5,
            duration: 4,
          } as Chord,
          {
            chord: 4,
            duration: 2,
          } as Chord,
          {
            chord: 2,
            duration: 2,
          } as Chord,
          {
            chord: 0,
            duration: 4,
          } as Chord,
        ],
      } as BackingTrack
    case 'shine_on':
      return {
        key: 'G',
        major: false,
        bpm: 80,
        initialDelay: 0,
        chords: [
          {
            chord: 0,
            duration: 16,
          } as Chord,
          {
            chord: 3,
            duration: 16,
          } as Chord,
          {
            chord: 2,
            duration: 16,
          } as Chord,
          {
            chord: 0,
            duration: 16,
          } as Chord,
        ],
      } as BackingTrack
  }
}

export const simpleSongInformation = (track: string) => {
  switch (track) {
    case 'kuža_pazi':
      return {
        key: 'C',
        title: 'kuža_pazi',
        major: true,
        bpm: 60,
        notes: [
          {
            note: 7,
            duration: 1,
          } as Note,
          {
            note: 7,
            duration: 1,
          } as Note,
          {
            note: 7,
            duration: 1,
          } as Note,
          {
            note: 7,
            duration: 1,
          } as Note,
          {
            note: 8,
            duration: 1,
          } as Note,
          {
            note: 8,
            duration: 1,
          } as Note,
          {
            note: 8,
            duration: 1,
          } as Note,
          {
            note: 8,
            duration: 1,
          } as Note,
          {
            note: 9,
            duration: 1,
          } as Note,
          {
            note: 9,
            duration: 1,
          } as Note,
          {
            note: 8,
            duration: 1,
          } as Note,
          {
            note: 8,
            duration: 1,
          } as Note,
          {
            note: 7,
            duration: 1,
          } as Note,
          {
            note: 7,
            duration: 1,
          } as Note,
          {
            note: 7,
            duration: 2,
          } as Note,
        ],
      } as SimpleSong
      case 'twinkle':
        return {
          key: 'C',
          title: 'twinkle',
          major: true,
          bpm: 120,
          notes: [
            {
              note: 4,
              duration: 1,
            } as Note,
            {
              note: 4,
              duration: 2,
            } as Note,
            {
              note: 8,
              duration: 1,
            } as Note,
            {
              note: 8,
              duration: 2,
            } as Note,
            {
              note: 9,
              duration: 1,
            } as Note,
            {
              note: 9,
              duration: 2,
            } as Note,
            {
              note: 8,
              duration: 4,
            } as Note,
            {
              note: 7,
              duration: 1,
            } as Note,
            {
              note: 7,
              duration: 2,
            } as Note,
            {
              note: 6,
              duration: 1,
            } as Note,
            {
              note: 6,
              duration: 2,
            } as Note,
            {
              note: 5,
              duration: 1,
            } as Note,
            {
              note: 5,
              duration: 2,
            } as Note,
            {
              note: 4,
              duration: 4,
            } as Note,
          ],
        } as SimpleSong
  }
}
