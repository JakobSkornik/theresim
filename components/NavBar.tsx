import React from 'react'

const sx = {
  container: {
    width: '100%',
    height: '60px',
    display: 'flex',
    margin: '5px 0 40px 0',
    justifyContent: 'center',
  },
  button: {
    marginLeft: '15px',
  },
}

const Navbar = () => {
  return (
    <div style={sx.container}>
      <button type="button" className="nes-btn is-primary" style={sx.button}>
        Freehands
      </button>
      <button type="button" className="nes-btn is-success" style={sx.button}>
        Azimuth
      </button>
      <button type="button" className="nes-btn is-warning" style={sx.button}>
        TODO
      </button>
      <button type="button" className="nes-btn is-error" style={sx.button}>
        TODO
      </button>
      <button type="button" className="nes-btn is-primary" style={sx.button}>
        TODO
      </button>
    </div>
  )
}

export default Navbar
