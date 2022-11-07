import P5Container from '../../components/P5Container'
import handScene from '../../modules/p5/control/handScene'
import chartScene from '../../modules/p5/control/chartScene'
import { Props } from '../../types'

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

const Control = (props: Props) => {
  return (
    <div style={sx.grid}>
      <div style={sx.leftCol}>
        <P5Container
          title={'Frequency'}
          mediapipe={true}
          scene={handScene}
          icon="controller.svg"
        />
      </div>
      <div style={sx.rightCol}>
        <P5Container
          title={'Amplitude'}
          mediapipe={false}
          scene={chartScene}
          icon="chart.svg"
        />
      </div>
    </div>
  )
}

export default Control
