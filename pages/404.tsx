import P5Container from '../components/P5Container'
import { useControlPanelContext } from '../context'
import Custom404Scene from '../modules/p5/canvases/404/404'

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

const Custom404 = () => {
  const { fullscreen } = useControlPanelContext()

  return (
    <P5Container
      style={fullscreen ? sx.fullscreen : sx.windowed}
      title={'404'}
      mediapipe={false}
      scene={Custom404Scene}
    />
  )
}

export default Custom404
