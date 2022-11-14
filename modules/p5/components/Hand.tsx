import p5Types from 'p5'

import { Landmark } from '@mediapipe/hands'
import { connections, handRanges } from '../../const'
import { clamp, getAvgCoordinates } from '../hooks'

export type HandParams = {
  x: number
  y: number
  w: number
  h: number
  color: number[]
  size?: number
  pointerStyle?: boolean
}

export default class Hand {
  x: number
  y: number
  w: number
  h: number
  size: number
  color: number[]
  pointerStyle: boolean

  constructor(params: HandParams) {
    this.x = params.x
    this.y = params.y
    this.w = params.w
    this.h = params.h
    this.color = params.color
    this.size = params.size ?? 15
    this.pointerStyle = params.pointerStyle ?? false
  }

  show(p5: p5Types, hand: Landmark[], color?: number[]) {
    if (!hand.length) {
      return
    }
    color = color ?? this.color

    if (this.pointerStyle) {
      this.drawPointer(p5, hand, color)
      return
    }

    for (let i = 0; i < handRanges.length; i++) {
      this.drawLandmarks(p5, handRanges[i], hand, color)
    }

    for (let i = 0; i < connections.length - 1; i++) {
      this.drawLine(p5, connections[i], hand, color)
    }

    this.drawShape(p5, hand, color)
  }

  drawLandmarks(
    p5: p5Types,
    range: number[],
    hand: Landmark[],
    color: number[],
  ) {
    let maxZ = 0
    let minZ = 1

    for (let i = range[0]; i < range[1]; i++) {
      let z = -hand[i].z + 0.5
      if (z < minZ) {
        minZ = z
      }
      if (z > maxZ) {
        maxZ = z
      }
    }
    const alpha = 255 / (maxZ - minZ)

    for (let i = range[0]; i < range[1]; i++) {
      let x = hand[i].x * this.w + this.x
      let y = hand[i].y * this.h + this.y
      let z = clamp(-hand[i].z + 0.5, 0.1, 0.9)
      if (
        x >= this.x &&
        x <= this.w + this.x &&
        y >= this.y &&
        y <= this.h + this.y
      ) {
        p5.noStroke()
        p5.fill([...color, (z - minZ + 0.01) * alpha])
        p5.circle(x, y, this.size)
      }
    }
  }

  drawLine(p5: p5Types, range: number[], hand: Landmark[], color: number[]) {
    let x1 = hand[range[0]].x * this.w + this.x
    let y1 = hand[range[0]].y * this.h + this.y
    let x2 = hand[range[1]].x * this.w + this.x
    let y2 = hand[range[1]].y * this.h + this.y

    p5.strokeWeight(20)
    p5.stroke([...color, ...[10]])
    p5.line(x1, y1, x2, y2)
  }

  drawShape(p5: p5Types, hand: Landmark[], color: number[]) {
    let x1 = hand[0].x * this.w + this.x
    let y1 = hand[0].y * this.h + this.y
    let x2 = hand[2].x * this.w + this.x
    let y2 = hand[2].y * this.h + this.y
    let x3 = hand[5].x * this.w + this.x
    let y3 = hand[5].y * this.h + this.y
    let x4 = hand[9].x * this.w + this.x
    let y4 = hand[9].y * this.h + this.y
    let x5 = hand[1].x * this.w + this.x
    let y5 = hand[1].y * this.h + this.y
    let x6 = hand[17].x * this.w + this.x
    let y6 = hand[17].y * this.h + this.y

    p5.noStroke()
    p5.fill([...color, ...[10]])

    p5.beginShape()
    p5.vertex(x1, y1)
    p5.vertex(x2, y2)
    p5.vertex(x4, y4)
    p5.vertex(x6, y6)
    p5.endShape()

    p5.beginShape(4)
    p5.vertex(x2, y2)
    p5.vertex(x3, y3)
    p5.vertex(x4, y4)
    p5.endShape()

    p5.beginShape(4)
    p5.vertex(x1, y1)
    p5.vertex(x5, y5)
    p5.vertex(x2, y2)
    p5.endShape()
  }

  drawPointer(p5: p5Types, hand: Landmark[], color: number[]) {
    let x = hand[0].x * this.w + this.x
    let y = hand[0].y * this.h + this.y

    if (
      x >= this.x &&
      x <= this.w + this.x &&
      y >= this.y &&
      y <= this.h + this.y
    ) {
      p5.noStroke()
      p5.fill(color)
      p5.circle(x, y, 20)
    }
  }
}
