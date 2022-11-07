import { Landmark } from '@mediapipe/hands'
import p5Types from 'p5'
import { HandsContextType } from '../../types'

import { BG, BLACK, BLUE, RED, YELLOW } from '../const'

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

const waitLen = 100
let inAnim = false
let step = 0
let lastX = 0
let lastY = 0
let x_dir = true
let y_dir = true
let currentView = 'none'

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
}

export const drawNoHandsWarning = (p5: p5Types, hands: HandsContextType, view: string) => {
  if (view != currentView) {
    inAnim = false
    step = 0
    lastX = 0
    lastY = 0
    currentView = view
  }

  if (hands.leftHand.length || hands.rightHand.length) {
    if (inAnim) {
      inAnim = false
      step = 0
      lastX = 0
      lastY = 0
    }
    return
  }
  if (!inAnim) inAnim = true
  step++
  if (step < waitLen) return

  const w = 500
  const h = 200

  let maxX = p5.width - w
  let maxY = p5.height - h

  if (lastX == 0 && lastY == 0) {
    lastX = getRandomInt(maxX - 1)
    lastY = getRandomInt(maxY - 1)
  }

  if (lastX == 0 || lastX == maxX) x_dir = !x_dir
  if (lastY == 0 || lastY == maxY) y_dir = !y_dir

  const x = x_dir ? lastX + 1 : lastX - 1
  const y = y_dir ? lastY + 1 : lastY - 1

  p5.noStroke()
  p5.fill(BLACK())
  p5.rect(x + 8, y + 8, w, h, 10)

  p5.stroke(BLACK())
  p5.strokeWeight(3)
  p5.fill(BG())
  p5.rect(x, y, w, h, 10)

  p5.fill(RED())
  p5.rect(x, y, w, 40, 10, 10, 0, 0)
  p5.textSize(20)
  p5.fill(BLACK())
  p5.noStroke()
  p5.text('WARNING', x + 20, y + 8, 400, 100)

  p5.stroke(BLACK())
  p5.strokeWeight(3)
  p5.fill(BLACK())
  p5.circle(x + 54, y + 114, 80)
  p5.fill(RED())
  p5.circle(x + 50, y + 110, 80)

  p5.stroke(BG())
  p5.strokeWeight(10)
  p5.line(x + 30, y + 90, x + 70, y + 130)
  p5.line(x + 30, y + 130, x + 70, y + 90)

  p5.textSize(20)
  p5.fill(BLACK())
  p5.noStroke()
  p5.text(
    'No hands detected. Please raise your hands in front of the camera.',
    x + 120,
    y + 80,
    400,
    100,
  )

  lastX = x
  lastY = y
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
