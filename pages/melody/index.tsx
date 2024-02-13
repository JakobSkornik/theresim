import MelodyCanvas from '../../modules/p5/canvases/melody/scene'
import P5Container from '../../components/P5Container'

import { useControlPanelContext } from '../../context'

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

const Melody = () => {
  const {showUI} = useControlPanelContext()

  return showUI && (
    <P5Container
      style={sx.container}
      title={'THERESIM'}
      mediapipe={true}
      playbackOffset={[10, 70]}
      playbackSize={[50, 160]}
      scene={MelodyCanvas}
      icon="controller.svg"
    />
  )
}

export default Melody
