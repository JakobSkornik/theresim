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

export const gray = '#85797b'
export const tintedWhite = '#ebe1d9'
export const yellow = '#ebb535'
export const red = '#ee6134'
export const blue = '#1e8fc2'
export const green = '#1e8f7d'
export const RED = (alpha = 255) => [238, 97, 52, alpha]
export const GREEN = (alpha = 255) => [30, 143, 125, alpha]
export const BLUE = (alpha = 255) => [30, 143, 194, alpha]
export const BLACK = (alpha = 255) => [10, 10, 10, alpha]
export const WHITE = (alpha = 255) => [255, 255, 255, alpha]
export const GRAY = (alpha = 255) => [100, 100, 100, alpha]
export const BG = (alpha = 255) => [235, 225, 217, alpha]
export const BROWN = (alpha = 255) => [153, 126, 97, alpha]
export const YELLOW = (alpha = 255) => [235, 181, 53, alpha]