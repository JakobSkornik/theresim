import P5Container from '../../components/P5Container'
import handScene from './handScene'
import chartScene from './chartScene'

const sx = {
  grid: {
    width: '100%',
    height: '100%',
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
  return (
    <div style={sx.grid}>
      <div style={sx.leftCol}>
        <P5Container
          title={'Left Hand'}
          mediapipe={true}
          scene={handScene}
          icon="/controller.svg"
        />
      </div>
      <div style={sx.rightCol}>
        <P5Container
          title={'Coordinates'}
          mediapipe={false}
          scene={chartScene}
          icon="/chart.svg"
        />
      </div>
    </div>
  )
}

export default Coordinates
