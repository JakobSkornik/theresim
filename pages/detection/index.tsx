import P5Container from '../../components/P5Container'
import handScene from '../../modules/p5/detection/handScene'
import chartScene from '../../modules/p5/detection/chartScene'
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
    width: 'calc(100% - 360px)',
    height: '100%',
  },
  rightCol: {
    width: '350px',
    height: '100%',
  },
}

const Detection = () => {
  const { fullscreen } = useFullScreenContext()

  return (
    <div style={fullscreen ? sx.fullscreen : sx.windowed}>
      <div style={sx.leftCol}>
        <P5Container
          title={'Hands'}
          mediapipe={true}
          scene={handScene}
          icon="controller.svg"
        />
      </div>
      <div style={sx.rightCol}>
        <P5Container
          title={'Z-Coordinate'}
          mediapipe={false}
          scene={chartScene}
          icon="chart.svg"
        />
      </div>
    </div>
  )
}

export default Detection
