import P5Container from '../../components/P5Container'
import { useFullScreenContext } from '../../context'
import scene, { onClick } from '../../modules/p5/keyboard/scene'

const sx = {
  fullscreen: {
    position: 'absolute' as 'absolute',
    top: '1px',
    left: '0',
    height: 'calc(100vh - 10px)',
    width: 'calc(100vw - 20px)',
    transition: 'all 0.5s ease-in-out',
  },
  windowed: {
    position: 'absolute' as 'absolute',
    top: '130px',
    left: '10px',
    height: 'calc(100vh - 155px)',
    width: 'calc(100vw - 45px)',
    transition: 'all 0.5s ease-in-out',
  },
}

const Keyboard = () => {
  const { fullscreen } = useFullScreenContext()

  return (
    <P5Container
      style={fullscreen ? sx.fullscreen : sx.windowed}
      title={'Keyboard'}
      mediapipe={false}
      scene={scene}
      icon="piano.svg"
      onClick={onClick}
    />
  )
}

export default Keyboard
