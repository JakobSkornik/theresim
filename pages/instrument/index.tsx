import P5Container from '../../components/P5Container'
import scene, { onClick } from '../../modules/p5/instrument/scene'

const Instrument = () => {
  return (
    <P5Container
      title={'Instrument'}
      mediapipe={true}
      scene={scene}
      icon="play.svg"
      onClick={onClick}
    />
  )
}

export default Instrument
