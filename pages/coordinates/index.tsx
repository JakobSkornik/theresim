import P5Container from '../../components/P5Container'
import handScene from '../../modules/p5/coordinates/handScene'
import chartScene from '../../modules/p5/coordinates/chartScene'
import { useFullScreenContext } from '../../context'

const sx = {
  fullscreen: {
    position: 'absolute' as 'absolute',
    top: '1px',
    left: '0',
    height: 'calc(100vh - 10px)',
    width: 'calc(100vw - 20px)',
    transition: 'all 0.5s ease-in-out',
    display: 'flex',
    justifyContent: 'space-between',
  },
  windowed: {
    position: 'absolute' as 'absolute',
    top: '130px',
    left: '10px',
    height: 'calc(100vh - 155px)',
    width: 'calc(100vw - 45px)',
    transition: 'all 0.5s ease-in-out',
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftCol: {
    width: 'calc(100% - 460px)',
    height: '100%',
  },
  rightCol: {
    width: '450px',
    height: '100%',
  },
}

const Coordinates = () => {
  const { fullscreen } = useFullScreenContext()

  return (
    <div style={fullscreen ? sx.fullscreen : sx.windowed}>
      <div style={sx.leftCol}>
        <P5Container
          title={'Left Hand'}
          mediapipe={true}
          scene={handScene}
          icon="controller.svg"
        />
      </div>
      <div style={sx.rightCol}>
        <P5Container
          title={'Coordinates'}
          mediapipe={false}
          scene={chartScene}
          icon="chart.svg"
        />
      </div>
    </div>
  )
}

export default Coordinates
