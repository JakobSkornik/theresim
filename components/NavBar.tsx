import React, { MouseEvent } from 'react'
import { useRouter } from 'next/router'

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
    boxShadow: '8px 8px gray',
  },
}

const Navbar = () => {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(e.currentTarget.value)
  }

  return (
    <div style={sx.container}>
      <button
        value="/freehand"
        type="button"
        className="nes-btn is-primary"
        style={sx.button}
        onClick={handleClick}
      >
        Freehands
      </button>
      <button
        value="/coordinates"
        type="button"
        className="nes-btn is-success"
        style={sx.button}
        onClick={handleClick}
      >
        Coordinates
      </button>
      <button
        value="/detection"
        type="button"
        className="nes-btn is-warning"
        style={sx.button}
        onClick={handleClick}
      >
        Detection
      </button>
      <button
        value="/control"
        type="button"
        className="nes-btn is-error"
        style={sx.button}
        onClick={handleClick}
      >
        Control
      </button>
      <button type="button" className="nes-btn is-primary" style={sx.button}>
        TODO
      </button>
    </div>
  )
}

export default Navbar
