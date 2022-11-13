import P5Container from '../components/P5Container'
import Custom404Scene from '../modules/p5/404/scene'

const Custom404 = () => {
  return <P5Container title={'404'} mediapipe={false} scene={Custom404Scene} icon="controller.svg" />
}

export default Custom404
