import P5Container from '../../components/P5Container'
import { useFullScreenContext } from '../../context'
import scene, { onClick } from '../../modules/p5/instrument/scene'

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

const Instrument = () => {
  const { fullscreen } = useFullScreenContext()

  
  return (
    <P5Container
      style={fullscreen ? sx.fullscreen : sx.windowed}
      title={'Instrument'}
      mediapipe={false}
      scene={scene}
      icon="play.svg"
      onClick={onClick}
    />
  )
}

export default Instrument
