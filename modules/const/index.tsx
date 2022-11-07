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

export const jointIdx = (key: string) => {
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

export const RED = (alpha = 255) => [238, 97, 52, alpha]
export const GREEN = (alpha = 255) => [30, 143, 125, alpha]
export const BLUE = (alpha = 255) => [30, 143, 194, alpha]
export const BLACK = (alpha = 255) => [10, 10, 10, alpha]
export const WHITE = (alpha = 255) => [255, 255, 255, alpha]
export const GRAY = (alpha = 255) => [100, 100, 100, alpha]
export const BG = (alpha = 255) => [235, 225, 217, alpha]
export const BROWN = (alpha = 255) => [243, 166, 131, alpha]
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
