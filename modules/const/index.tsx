import { ScaleKeys } from '../../types/ScaleKeys'

interface Dictionary<T> {
  [Key: string]: T
}

export const handParts = {
  palm: [0, 1],
  thumb: [1, 5],
  index: [5, 9],
  middle: [9, 13],
  ring: [13, 17],
  pinky: [17, 21],
} as Dictionary<number[]>

export const lmIdx = (key: string) => {
  return handParts[key]
}

// https://flatuicolors.com/palette/ru
export const gray = '#85797b'
export const tintedWhite = '#ebe1d9'
export const yellow = '#ebb535'
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
export const YELLOW = (alpha = 255) => [235, 181, 53, alpha]
export const PENCIL = (alpha = 255) => [133, 121, 123, alpha]
export const PINK = (alpha = 255) => [248, 165, 194, alpha]
export const CURACAO = (alpha = 255) => [61, 193, 211, alpha]

const scale = [
  {
    key: 'C',
    color: 'white',
    idx: 0,
  },
  {
    key: 'C#',
    color: 'black',
    idx: 0,
  },
  {
    key: 'D',
    color: 'white',
    idx: 1,
  },
  {
    key: 'D#',
    color: 'black',
    idx: 1,
  },
  {
    key: 'E',
    color: 'white',
    idx: 2,
  },
  {
    key: 'F',
    color: 'white',
    idx: 3,
  },
  {
    key: 'F#',
    color: 'black',
    idx: 2,
  },
  {
    key: 'G',
    color: 'white',
    idx: 4,
  },
  {
    key: 'G#',
    color: 'black',
    idx: 3,
  },
  {
    key: 'A',
    color: 'white',
    idx: 5,
  },
  {
    key: 'A#',
    color: 'black',
    idx: 4,
  },
  {
    key: 'B',
    color: 'white',
    idx: 6,
  },
]

export const getChromaticIdx = (idx: number, white: boolean) => {
  const wKeys = [0, 2, 4, 5, 7, 9, 11]
  const bKeys = [1, 3, 6, 8, 10]
  return {
    idx: white ? wKeys[idx] : bKeys[idx],
    name: white ? scale[wKeys[idx]].key : scale[bKeys[idx]].key,
  }
}

export const getNotesInChord = (chord: number, type: string) => {
  let third = 4
  let fifth = 7
  if (type !== 'maj') third = 3
  if (type == 'dim') fifth = 6
  let offsets = [chord, (chord + third) % 12, (chord + fifth) % 12]
  let wKeys = []
  let bKeys = []
  for (let i = 0; i < 3; i++) {
    let current = offsets[i] % 12
    if (scale[current].color == 'white') {
      wKeys.push(scale[current].idx)
    } else {
      bKeys.push(scale[current].idx)
    }
  }
  return {
    wKeys: wKeys,
    bKeys: bKeys,
  } as ScaleKeys
}

export const getOrderedChordsInScale = (start: number, major: boolean) => {
  const offsets = major ? [2, 2, 1, 2, 2, 2, 1] : [2, 1, 2, 2, 1, 2, 2]
  const result = []
  let current = start
  for (let i = 0; i < offsets.length; i++) {
    result.push(scale[current].key)
    current = (current + offsets[i]) % scale.length
  }
  return processScale(result, major)
}

export const processScale = (scale: string[], major: boolean) => {
  scale = [...scale]
  while (!allUnique(scale)) {
    if (major && scale[0].charAt(1) == '#') {
      const lastKey = scale[0].charAt(0)
      scale[0] = getNextChar(scale[0].charAt(0)) + 'b'
      scale[scale.length - 1] = lastKey
    }
    for (let i = scale.length - 1; i >= 0; i--) {
      if (duplicate(scale[i].charAt(0), scale)) {
        scale[i] = getNextChar(scale[i].charAt(0)) + 'b'
      }
    }
  }
  const minorChords = major ? [1, 2, 5] : [0, 3, 4]
  const dimChord = major ? 6 : 1
  scale[dimChord] = scale[dimChord] + 'dim'
  for (let i = 0; i < 3; i++) {
    scale[minorChords[i]] = scale[minorChords[i]] + 'm'
  }
  return scale
}

export const processNotes = (scale: string[]) => {
  scale = [...scale]
  while (!allUnique(scale)) {
    if (scale[0].charAt(1) == '#') {
      const lastKey = scale[0].charAt(0)
      scale[0] = getNextChar(scale[0].charAt(0)) + 'b'
      scale[scale.length - 1] = lastKey
    }
    for (let i = scale.length - 1; i >= 0; i--) {
      if (duplicate(scale[i].charAt(0), scale)) {
        scale[i] = getNextChar(scale[i].charAt(0)) + 'b'
      }
    }
  }
  return scale
}

const allUnique = (scale: string[]) => {
  for (let i = 0; i < scale.length; i++) {
    if (duplicate(scale[i].charAt(0), scale)) {
      return false
    }
  }
  return true
}

const duplicate = (key: string, str: string[]) => {
  let cnt = 0
  for (let i = 0; i < str.length; i++) {
    if (key == str[i].charAt(0)) {
      cnt++
    }
  }
  if (cnt > 1) return true
  return false
}

const getNextChar = (char: string) => {
  if (char == 'G') return 'A'
  return String.fromCharCode(char.charCodeAt(0) + 1)
}

export const getSimpleNotes = (start: number) => {
  const offsets = [2, 2, 1, 2, 2, 2, 1]
  let result = []
  let current = start
  for (let i = 0; i < offsets.length; i++) {
    result.push(scale[current].key)
    current = (current + offsets[i]) % scale.length
  }
  return processNotes(result)
}

export const getNotesInScale = (start: number, major: boolean) => {
  const offsets = major ? [2, 2, 1, 2, 2, 2, 1] : [2, 1, 2, 2, 1, 2, 2]
  let wKeys = []
  let bKeys = []
  let current = start
  for (let i = 0; i < offsets.length; i++) {
    if (scale[current].color == 'white') {
      wKeys.push(scale[current].idx)
    } else {
      bKeys.push(scale[current].idx)
    }
    current = (current + offsets[i]) % scale.length
  }

  return {
    wKeys: wKeys,
    bKeys: bKeys,
  } as ScaleKeys
}

const freehandDocs = () => {
  return (
    <p>
      Please provide necessary permissions for the app to be able to use your
      webcam.
      <br />
      <br />
      Webcam image stream is processed by <i>Mediapipe</i>. <i>Mediapipe</i>{' '}
      maps hand landmarks to a triple <i>(x, y, z)</i>. Tab <b>Coordinates</b>{' '}
      provides more information.
      <br />
      <br />
      3D coordinates are mapped to 2D via <i>p5.js</i>.
      <br />
      <br />
      This tab provides panel that renders your hands via webcam. Try it out!
    </p>
  )
}

const coordinatesDocs = () => {
  return (
    <p>
      This tab renders only your left hand.
      <br />
      <br />
      On the right panel live data is fed to a bar chart. Each coordinate is
      represented by a bar. Coordinates are constrained to interval{' '}
      <i>[0, 1]</i>. To map them to canvas, one only needs to multiply the
      number with desired number of pixels.
      <br />
      <br />
      Coordinate <i>z</i> should theoretically move with the distance of your
      hand from the camera. But observe rather, what happens when you tilt your
      hand forward or backward.
    </p>
  )
}

const detectionDocs = () => {
  return (
    <p>
      Following the discovery from the previous tab, let's try to implement a
      simple detection based on a threshold for the <i>z</i> coordinate. Tilting
      your hands forwards should be detected.
      <br />
      <br />
      When the <i>z</i> is higher than the specified threshold your hands and
      bars in the chart become colored.
      <br />
      <br />
      The instrument is meant to be played with only your index finger extended,
      the detection also works best this way.
    </p>
  )
}

const controlDocs = () => {
  return (
    <p>
      This panel shows how <i>Mediapipe</i> information is deconstructed and how
      each dimension serves its own purpose.
      <br />
      <br />
      The <i>x</i> coordinate will serve to determine the frequency or note that
      is played.
      <br />
      <br />
      The <i>y</i> coordinate will serve to determine the amplitude or volume of
      the note or chord played.
      <br />
      <br />
      The <i>z</i> coordinate will serve to determine when to play a note or a
      chord with the current <i>[x, y]</i> location.
    </p>
  )
}

const keyboardDocs = () => {
  return (
    <p>
      This tab is meant to reinforce my choice of the instrument design.
      <br />
      <br />
      The first obvious detriment to the piano layout is the overlap in <i>
        x
      </i>{' '}
      coordinates. This means that at a single <i>x</i> location two options are
      available.
      <br />
      <br />
      Secondly, we want to be able to play simple chords with the left hand.
      Chords are derived from the scale that we choose to use.
      <br />
      <br />
      Try clicking on notes, toggling major/minor scale and chord display. See
      how shapes of chords change due to piano keyboard layout.
      <br />
      <br />
      Next tab will show the simplified keyboard and it's advantages.
    </p>
  )
}

const instrumentDocs = () => {
  return (
    <p>
      This is the proposed layout for my instrument. Instead of displaying all
      12 notes, we select a scale. This reduces the number of possible notes and
      chords to a much more manageable number.
      <br />
      <br />
      Observe how changes to scale do not affect chord shapes and how each
      possible chord uses the same shape.
    </p>
  )
}

export const getInformationText = (route: string) => {
  switch (route) {
    case '/freehand':
      return freehandDocs()
    case '/coordinates':
      return coordinatesDocs()
    case '/detection':
      return detectionDocs()
    case '/control':
      return controlDocs()
    case '/keyboard':
      return keyboardDocs()
    case '/instrument':
      return instrumentDocs()
    default:
      return (
        <p>
          I just display information about each page. Current page is ${route}
        </p>
      )
  }
}
