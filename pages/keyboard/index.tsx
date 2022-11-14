import KeyboardCanvas from '../../modules/p5/canvases/keyboard/scene'
import P5Container from '../../components/P5Container'
import { useControlPanelContext } from '../../context'

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

const Keyboard = () => {
  const { fullscreen } = useControlPanelContext()

  return (
    <P5Container
      style={fullscreen ? sx.fullscreen : sx.windowed}
      title={'Keyboard'}
      mediapipe={false}
      scene={KeyboardCanvas}
    />
  )
}

export default Keyboard
