import { Landmark } from '@mediapipe/hands'

export const getAverageZ = (hand: Landmark[]) => {
  if (!hand || !hand.length) {
    return 0.01
  }

  let z = 0
  for (let i = 0; i < hand.length; i++) {
    z += hand[i].z
  }
  z /= hand.length

  return -z + 0.5
}

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max) + 1
}

export const getAvgCoordinates = (hand: Landmark[]) => {
  if (!hand || !hand.length) {
    return null
  }
  let y = 0
  let z = 0

  for (let i = 0; i < hand.length; i++) {
    y += hand[i].y
    z += hand[i].z
  }
  let x = hand[0].x
  y /= hand.length
  z /= hand.length

  return [x, 1 - y, -z + 0.5]
}

export const avg = (q: number[]) => {
  let sum = 0
  for (let i = 0; i < q.length; i++) {
    sum += q[i]
  }
  return sum / q.length
}

export const clamp = (val: number, min: number = 0, max: number = 1) => {
  return val > max ? max : val < min ? min : val
}

export const queue = (q: number[], val: number, len: number = 5) => {
  if (q.length >= len) {
    q.pop()
  }
  q.unshift(val)
}
