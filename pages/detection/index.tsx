import P5Container from '../../components/P5Container'
import handScene from '../../modules/p5/detection/handScene'
import chartScene from '../../modules/p5/detection/chartScene'

const sx = {
  grid: {
    width: '100%',
    height: '100%',
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
  return (
    <div style={sx.grid}>
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
