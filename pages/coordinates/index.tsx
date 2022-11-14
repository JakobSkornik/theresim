import ChartCanvas from '../../modules/p5/canvases/coordinates/chart'
import HandCanvas from '../../modules/p5/canvases/coordinates/hand'
import P5Container from '../../components/P5Container'
import { useControlPanelContext } from '../../context'

const sx = {
  fullscreen: {
    height: '100vh',
    top: '1px',
  },
  windowed: {
    height: 'calc(100vh - 160px)',
    top: '150px',
  },
  left: {
    left: '30px',
    width: 'calc(70vw - 40px)',
  },
  right: {
    left: 'calc(70vw - 20px)',
    width: 'calc(30vw - 10px)',
  },
}

const Coordinates = () => {
  const { fullscreen } = useControlPanelContext()

  return (
    <>
      <P5Container
        style={
          fullscreen
            ? { ...sx.fullscreen, ...sx.left }
            : { ...sx.windowed, ...sx.left }
        }
        title={'Left Hand'}
        mediapipe={true}
        scene={HandCanvas}
      />
      <P5Container
        style={
          fullscreen
            ? { ...sx.fullscreen, ...sx.right }
            : { ...sx.windowed, ...sx.right }
        }
        title={'Coordinates'}
        mediapipe={false}
        scene={ChartCanvas}
      />
    </>
  )
}

export default Coordinates
