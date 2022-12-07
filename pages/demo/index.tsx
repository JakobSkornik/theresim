import DemoCanvas from '../../modules/p5/canvases/demo/scene'
import P5Container from '../../components/P5Container'
import { useControlPanelContext } from '../../context'

const sx = {
  fullscreen: {
    top: '0vh',
    left: '0vw',
    height: '101vh',
    width: '99vw',
  },
  windowed: {
    top: '15vh',
    left: '1vw',
    height: '84vh',
    width: '96vw',
  },
}

const Demo = () => {
  const { fullscreen } = useControlPanelContext()

  return (
    <P5Container
      style={fullscreen ? sx.fullscreen : sx.windowed}
      title={'Demo'}
      mediapipe={true}
      scene={DemoCanvas}
      icon="controller.svg"
    />
  )
}

export default Demo
