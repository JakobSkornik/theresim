import { Camera } from '@mediapipe/camera_utils'
import { Hands, Landmark } from '@mediapipe/hands'

import { HandsContextType } from '../types'

const videoElement = document.getElementsByClassName('input_video')[0] as HTMLVideoElement

export default function initialize(handContext: HandsContextType): Hands {
  const hands = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    },
  })
  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 0,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  })
  hands.onResults(async (results) => {
    handContext.updateRightHand([])
    handContext.updateLeftHand([])
    if (results.multiHandLandmarks && results.multiHandedness) {
      for (const idx in results.multiHandedness) {
        let hand = structuredClone(results.multiHandLandmarks[idx])
        flipHorizontally(hand)

        if (results.multiHandedness[idx].label == 'Right') {
          handContext.updateLeftHand(hand as Landmark[])
        } else {
          handContext.updateRightHand(hand as Landmark[])
        }
      }
    }
  })

  // Webcam handler
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement })
    },
    width: 0,
    height: 0,
  })
  camera.start()
  return hands
}

// This method mirrors x coords, due to webcam flipping
async function flipHorizontally(hand: Landmark[]) {
  for (const idx in hand) {
    hand[idx].x = 1 - hand[idx].x
  }
}
