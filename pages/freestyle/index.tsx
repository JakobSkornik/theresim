import FreestyleCanvas from '../../modules/p5/canvases/freestyle/scene'
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

const Freestyle = () => {
  const {showUI} = useControlPanelContext()

  return showUI && (
    <P5Container
      style={sx.container}
      title={'THERESIM'}
      mediapipe={true}
      playbackOffset={[300, 170]}
      playbackSize={[351, 260]}
      scene={FreestyleCanvas}
      icon="controller.svg"
    />
  )
}

export default Freestyle
