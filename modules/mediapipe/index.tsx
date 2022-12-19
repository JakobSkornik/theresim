import { Camera } from '@mediapipe/camera_utils'
import { Hands, Landmark } from '@mediapipe/hands'
import { RefObject } from 'react'

export class HandsController {
  videoElement: HTMLVideoElement
  hands: Hands
  camAvailable: boolean = false
  leftHand: Landmark[] = []
  rightHand: Landmark[] = []

  constructor(ref: RefObject<HTMLVideoElement>) {
    this.videoElement = ref.current!
    this.hands = new Hands({
      locateFile: (file) => {
        return `hands/${file}`
      },
    })
    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 0,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })
    this.hands.onResults(async (results) => {
      this.rightHand = []
      this.leftHand = []
      if (results.multiHandLandmarks && results.multiHandedness) {
        for (const idx in results.multiHandedness) {
          let hand = structuredClone(results.multiHandLandmarks[idx])
          this.flipHorizontally(hand)
          if (results.multiHandedness[idx].label == 'Right') {
            this.leftHand = hand
          } else {
            this.rightHand = hand
          }
        }
      }
    })
  }

  async finishInit() {
    this.camAvailable = await this.camReady()

    // Webcam handler
    const camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.hands.send({ image: this.videoElement })
      },
      width: 0,
      height: 0,
    })
    await camera.start()
  }

  flipHorizontally(hand: Landmark[]) {
    for (const idx in hand) {
      hand[idx].x = 1 - hand[idx].x
    }
  }

  async camReady() {
    let result = await navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        if (stream.getVideoTracks().some((track) => track.enabled)) {
          return true
        }
        return false
      })
      .catch(() => {
        return false
      })
    return result
  }
}
