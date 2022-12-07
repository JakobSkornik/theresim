import FreeHandCanvas from '../../modules/p5/canvases/freehand/scene'
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

const Freehand = () => {
  const { fullscreen } = useControlPanelContext()

  return (
    <P5Container
      style={fullscreen ? sx.fullscreen : sx.windowed}
      title={'Hands'}
      mediapipe={true}
      scene={FreeHandCanvas}
    />
  )
}

export default Freehand
