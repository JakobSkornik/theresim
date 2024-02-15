import P5Container from '../../components/P5Container'
import TutorialCanvas from '../../modules/p5/canvases/tutorial/scene'
import TutorialPopup from '../../components/TutorialPopup'
import { useEffect } from 'react'
import { useTutorialContext } from '../../context'

const sx = {
  container: {
    top: '0vh',
    left: '0vw',
    minHeight: '560px !important',
    minWidth: '960px !important',
    height: '101vh',
    width: '99vw',
  },
}

const Tutorial = () => {
  const { setStage } = useTutorialContext()

  useEffect(() => {
    setStage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <P5Container
        style={sx.container}
        title={'TUTORIAL'}
        mediapipe={true}
        playbackSize={[310, 100]}
        playbackOffset={[271, 10]}
        scene={TutorialCanvas}
        icon="controller.svg"
      />
      <TutorialPopup></TutorialPopup>
    </>
  )
}

export default Tutorial
