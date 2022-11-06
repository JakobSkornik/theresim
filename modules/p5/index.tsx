import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, LIGHTGREEN, ORANGE, SHADOW } from '../const'

export const drawLandmarks = (
  p5: p5Types,
  range: number[],
  color: number[],
  hand: Landmark[],
  offsetX: number = 0,
  offsetY: number = 0,
  width: number | null = null,
  height: number | null = null,
) => {
  if (!width) {
    width = p5.width
  }
  if (!height) {
    height = p5.height
  }

  p5.noFill()
  p5.strokeWeight(8)
  for (let j = range[0]; j < range[1]; j++) {
    let x = hand[j].x * width + offsetX
    let y = hand[j].y * height + offsetY
    if (
      x >= offsetX &&
      x <= width + offsetX &&
      y >= offsetY &&
      y <= height + offsetY
    ) {
      p5.stroke(158)
      p5.fill(SHADOW())
      p5.rect(x + 4, y + 4, 10)
      p5.stroke(color)
      p5.fill(color)
      p5.rect(x, y, 10)
    }
  }
}
export const getAverageZ = (hand: Landmark[]) => {
  if (!hand.length) {
    return 0.01
  }

  let z = 0
  for (let i = 0; i < hand.length; i++) {
    z += hand[i].z
  }
  z /= hand.length

  return -z + 0.5
}

export const drawLegend = (p5: p5Types) => {
  p5.strokeWeight(0)
  p5.fill(SHADOW())
  const x = 0
  const y = p5.height - 210
  p5.rect(x + 8, y + 8, 320, 200)
  p5.fill(235)
  p5.rect(x, y, 320, 200)

  p5.fill(SHADOW())
  p5.rect(x + 14, y + 44, 40, 40)
  p5.fill(ORANGE())
  p5.rect(x + 10, y + 40, 40, 40)
  p5.fill(BLACK())
  p5.textSize(20)
  p5.text('- RIGHT HAND', x + 70, y + 70)

  p5.fill(SHADOW())
  p5.rect(x + 14, y + 124, 40, 40)
  p5.fill(LIGHTGREEN())
  p5.rect(x + 10, y + 120, 40, 40)
  p5.fill(BLACK())
  p5.textSize(20)
  p5.text('- LEFT HAND', x + 70, y + 150)
}

export const getAvgCoordinates = (hand: Landmark[]) => {
  if (!hand.length) {
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

export const clamp = (val: number) => {
  const min = 0
  const max = 1
  return val > max ? max : val < min ? min : val
}

export const queue = (q: number[], val: number, len: number = 5) => {
  if (q.length >= len) {
    q.pop()
  }
  q.unshift(val)
}
