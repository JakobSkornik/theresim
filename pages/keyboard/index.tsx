import P5Container from '../../components/P5Container'
import scene, { onClick } from './scene'

const Keyboard = () => {
  return (
    <P5Container
      title={'Keyboard'}
      mediapipe={false}
      scene={scene}
      icon="piano.svg"
      onClick={onClick}
    />
  )
}

export default Keyboard