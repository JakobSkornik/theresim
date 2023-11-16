import P5Container from '../components/P5Container'
import { useControlPanelContext } from '../context'
import Custom404Scene from '../modules/p5/canvases/404/404'

const sx = {
  container: {
    top: '0vh',
    left: '0vw',
    height: 'max(101vh, 560px)',
    width: 'max(99vw, 960px)',
  },
}

const Custom404 = () => {
  return (
    <P5Container
      style={sx.container}
      title={'404'}
      mediapipe={false}
      scene={Custom404Scene}
    />
  )
}

export default Custom404
