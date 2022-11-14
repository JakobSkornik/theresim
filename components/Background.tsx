// @ts-nocheck
import { shadow } from '../modules/const'

const sx = {
  title: {
    position: 'fixed' as 'fixed',
    left: 'calc(50vw - 20vh - 50px)',
    top: '35vh',
    fontFamily: 'Outrun',
    fontSize: '80px',
    background: '-webkit-linear-gradient(#170328, #f54171)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transform: 'rotate(-10deg)',
    filter: `drop-shadow(2px 2px ${shadow})`,
  },
  grid: {
    '--grid-color': 'rgba(115, 59, 139, 0.7)',
    '--grid-size': '30px',
    '--grid-blur': '2px',
  },
  mountain1: {
    '--mountain-base': '10vw',
    '--mountain-height': '5vw',
    '--mountain-color1': '#25277447',
    '--mountain-color2': '#9729AB',
    '--mountain-offset': '10vw',
    '--mountain-tilt': '-20deg',
  },
  mountain2: {
    '--mountain-base': '7vw',
    '--mountain-height': '3vw',
    '--mountain-color1': '#2b116570',
    '--mountain-color2': '#9729AB',
    '--mountain-offset': '-20vw',
    '--mountain-tilt': '10deg',
  },
  mountain3: {
    '--mountain-base': '24vw',
    '--mountain-height': '15vw',
    '--mountain-color1': '#583593',
    '--mountain-color2': '#9729AB',
    '--mountain-offset': '17vw',
    '--mountain-tilt': '10deg',
  },
  mountain4: {
    '--mountain-base': '23vw',
    '--mountain-height': '10vw',
    '--mountain-color1': '#9729AB',
    '--mountain-color2': '#583593',
    '--mountain-offset': '-50vw',
    '--mountain-tilt': '-2deg',
  },
  leftLight: {
    position: 'fixed' as 'fixed',
    bottom: '0',
    height: '40vh',
    width: '40vw',
    left: '10vw',
    transform: 'rotate(-10deg)',
    filter: 'blur(3px)',
  },
  rightLight: {
    position: 'fixed' as 'fixed',
    bottom: '0',
    height: '40vh',
    width: '40vw',
    left: '50vw',
    transform: 'rotate(10deg)',
    filter: 'blur(3px)',
  },
  road: {
    position: 'fixed' as 'fixed',
    bottom: '0',
    height: '35vh',
    width: '100vw',
    left: '0',
    filter: 'blur(3px)',
  },
}

const Background = () => {
  return (
    <div className="background">
      <div className="grid" style={sx.grid} />
      <div className="horizontal-line" />
      <div className="mountain" style={sx.mountain1} />
      <div className="mountain" style={sx.mountain2} />
      <div className="mountain" style={sx.mountain3} />
      <div className="mountain" style={sx.mountain4} />
      <div className="sun" />
      <div style={sx.road}>
        <img src="/icons/road.svg" alt="road" />
      </div>
      <div style={sx.leftLight}>
        <img src="/icons/headlight.svg" alt="Left Headlight" />
      </div>
      <div style={sx.rightLight}>
        <img src="/icons/headlight.svg" alt="Right Headlight" />
      </div>
      <span style={sx.title}>Theresim</span>
    </div>
  )
}

export default Background
