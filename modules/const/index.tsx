interface Dictionary<T> {
    [Key: string]: T;
}

export const handParts = {
  palm: [0, 1],
  finger_thumb: [1, 5],
  finger_index: [5, 9],
  finger_middle: [9, 13],
  finger_ring: [13, 17],
  finger_pinky: [17, 21],
} as Dictionary<number[]>

export const getHandIndices = (key: string) => {
  return handParts[key]
}


export const RED = (alpha = 255) => [255, 0, 0, alpha]
export const GREEN = (alpha = 255) => [0, 255, 0, alpha]
export const ORANGE = (alpha = 255) => [255, 153, 0, alpha]
export const LIGHTGREEN = (alpha = 255) => [0, 230, 0, alpha]
export const BLUE = (alpha = 255) => [0, 0, 255, alpha]
export const BLACK = (alpha = 255) => [10, 10, 10, alpha]
export const WHITE = (alpha = 255) => [255, 255, 255, alpha]