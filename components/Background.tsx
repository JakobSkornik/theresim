// @ts-nocheck
import Image from 'next/image'
import { primary, shadow } from '../modules/const'

const sx = {
  title: {
    position: 'fixed' as 'fixed',
    left: 'calc(50vw - 20vh - 50px)',
    top: '0vh',
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
  rectangle1: {
    '--rectangle-offsetY': '35%',
    '--rectangle-offset': '20vw',
    '--rectangle-height': '30vh',
    '--rectangle-width': '30vh',
    '--rectangle-color': '#10106047',
  },
  rectangle2: {
    '--rectangle-offsetY': '35%',
    '--rectangle-offset': '60vw',
    '--rectangle-height': '20vh',
    '--rectangle-width': '40vh',
    '--rectangle-color': '#10106047',
  },
  rectangle3: {
    '--rectangle-offsetY': 'calc(35% + 10vh)',
    '--rectangle-offset': 'calc(35vh + 20vw)',
    '--rectangle-height': '5vh',
    '--rectangle-width': 'calc(40vw - 35vh)',
    '--rectangle-color': '#06062047',
  },
  curvedTop: {
    '--rectangle-offsetY': '35%',
    '--rectangle-offset': '60vw',
    '--rectangle-height': '20vh',
    '--rectangle-width': '40vh',
    '--rectangle-color': '#10106047',
  },
  rectangle1Edge: {
    '--triangle-offsetY': '35%',
    '--triangle-base': '15vh',
    '--triangle-height': '30vh',
    '--rectangle-width': '30vh',
    '--triangle-color1': '#06062047',
    '--triangle-color2': '#9729AB',
    '--triangle-offset': '20vw',
    '--triangle-tilt': '14deg',
  },
  logoDiv: {
    position: 'absolute' as 'absolute',
    left: 'calc(100vw - 220px)',
    top: 'calc(100vh - 80px)',
    backgroundColor: primary + '90',
    backdropFilter: 'blur(3px)',
    border: 'none',
    borderRadius: '5px',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px ${primary}`,
  },
}

const Background = () => {
  return (
    <div className="background">
      <div style={sx.logoDiv}>
        <Image
          src="/icons/fri_logo.png"
          width="200"
          height="60"
          alt="logo"
        ></Image>
      </div>
      <div className="grid" style={sx.grid} />
      <div className="horizontal-line" />
      <div className="rectangle" style={sx.rectangle1} />
      <div className="rectangle" style={sx.rectangle2} />
      <div className="rectangle" style={sx.rectangle3} />
      <div className="triangle" style={sx.rectangle1Edge} />
      <div className="curved-top" style={sx.curvedTop} />
      <span style={sx.title}>Theresim</span>
    </div>
  )
}

export default Background
