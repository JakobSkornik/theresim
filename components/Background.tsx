// @ts-nocheck
import { shadow } from '../modules/const'

const sx = {
  title: {
    position: 'fixed' as 'fixed',
    left: '35vw',
    top: '35vh',
    fontFamily: 'Outrun',
    fontSize: '80px',
    background: '-webkit-linear-gradient(#170328, #f54171)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    transform: 'rotate(-10deg)',
    // textShadow: `8px 8px ${shadow}`,
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
    '--mountain-color1': '#583593',
    '--mountain-color2': '#9729AB',
    '--mountain-offset': '10vw',
    '--mountain-tilt': '-20deg',
  },
  mountain2: {
    '--mountain-base': '7vw',
    '--mountain-height': '3vw',
    '--mountain-color1': '#583593',
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
    '--mountain-color1': '#583593',
    '--mountain-color2': '#9729AB',
    '--mountain-offset': '-50vw',
    '--mountain-tilt': '-2deg',
  },
}

const Background = () => {
  return (
    <div className="background">
      <div className="grid" style={sx.grid}></div>
      <div className="horizontal-line"></div>
      <div className="mountain" style={sx.mountain1}></div>
      <div className="mountain" style={sx.mountain2}></div>
      <div className="mountain" style={sx.mountain3}></div>
      <div className="mountain" style={sx.mountain4}></div>
      <div className="sun">
        <div className="gooey">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
      </div>
      <span style={sx.title}>Theresim</span>
    </div>
  )
}

export default Background
