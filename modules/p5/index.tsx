import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'

import { BLACK, BLUE, RED, YELLOW } from '../const'

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
      p5.fill(BLACK())
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
  const x = 10
  const y = p5.height - 150

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(x + 8, y + 8, 220, 140, 10)
  p5.stroke(BLACK())
  p5.strokeWeight(3)
  p5.fill(YELLOW())
  p5.rect(x, y, 220, 140, 10)

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(x + 14, y + 24, 40, 40)
  p5.fill(RED())
  p5.rect(x + 10, y + 20, 40, 40)
  p5.fill(BLACK())
  p5.textSize(28)
  p5.text('- Right', x + 70, y + 50)

  p5.fill(BLACK())
  p5.rect(x + 14, y + 84, 40, 40)
  p5.fill(BLUE())
  p5.rect(x + 10, y + 80, 40, 40)
  p5.fill(BLACK())
  p5.textSize(28)
  p5.text('- Left', x + 70, y + 110)
}

export const drawFPS = (p5: p5Types, y_offset: number = 60) => {
  const x = p5.width - 110
  const y = p5.height - y_offset

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(x + 8, y + 8, 100, 50, 10)

  p5.stroke(BLACK())
  p5.strokeWeight(3)
  p5.fill(YELLOW())
  p5.rect(x, y, 100, 50, 10)

  p5.fill(BLACK())
  p5.noStroke()
  p5.textSize(20)
  p5.text(`${p5.frameRate().toFixed(0)} FPS`, x + 10, y + 33)
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
