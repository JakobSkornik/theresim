import P5Container from '../../components/P5Container'
import scene from './scene'

const Freehand = () => {
  return <P5Container title={'Hands'} mediapipe={true} scene={scene} icon="/controller.svg" />
}

export default Freehand
