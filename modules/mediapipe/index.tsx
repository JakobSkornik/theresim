import { Camera } from '@mediapipe/camera_utils'
import { Hands, Landmark } from '@mediapipe/hands'
import { RefObject } from 'react'

import { HandsContextType } from '../../types'

export const initialize = async (
  handContext: HandsContextType,
  ref: RefObject<HTMLVideoElement>,
) => {
  var videoElement = ref.current!
  const hands = new Hands({
    locateFile: (file) => {
      return `hands/${file}`
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

  if (!camReady()) {
    return false
  }

  // Webcam handler
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement })
    },
    width: 0,
    height: 0,
  })
  await camera.start()
  return true
}

function camReady() {
  let result = navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      if (stream.getVideoTracks().some((track) => track.enabled)) {
        return true
      }
      return false
    })
    .catch(() => {})
  return result
}

// This method mirrors x coords, due to webcam flipping
function flipHorizontally(hand: Landmark[]) {
  for (const idx in hand) {
    hand[idx].x = 1 - hand[idx].x
  }
}

export default initialize
