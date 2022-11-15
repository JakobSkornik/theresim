import P5Container from '../components/P5Container'
import { useControlPanelContext } from '../context'
import Custom404Scene from '../modules/p5/canvases/404/404'

const sx = {
  fullscreen: {
    top: '1px',
    left: '0',
    height: '100vh',
    width: '100vw',
  },
  windowed: {
    top: '150px',
    left: '30px',
    height: 'calc(100vh - 160px)',
    width: 'calc(100vw - 60px)',
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
