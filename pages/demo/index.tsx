import DemoCanvas from '../../modules/p5/canvases/demo/scene'
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

const Demo = () => {
  const {showUI} = useControlPanelContext()

  return showUI && (
    <P5Container
      style={sx.container}
      title={'THERESIM'}
      mediapipe={true}
      scene={DemoCanvas}
      icon="controller.svg"
    />
  )
}

export default Demo
