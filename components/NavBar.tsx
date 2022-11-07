import React, { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'

import { blue, green, red, yellow } from '../modules/const'
import Button from './Button'

const sx = {
  container: {
    width: '100%',
    height: '60px',
    display: 'flex',
    margin: '5px 0 15px 0',
    justifyContent: 'center',
  },
}

const Navbar = () => {
  const router = useRouter()
  const [active, setActive] = useState(router.route)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setActive(e.currentTarget.value)
    router.push(e.currentTarget.value)
  }

  return (
    <div style={sx.container}>
      <Button
        text="Freehands"
        value="/freehand"
        onClick={handleClick}
        style={{
          backgroundColor: '/freehand' == active ? yellow : yellow + '60',
        }}
      ></Button>
      <Button
        text="Coordinates"
        value="/coordinates"
        onClick={handleClick}
        style={{ backgroundColor: '/coordinates' == active ? red : red + '60' }}
      ></Button>
      <Button
        text="Detection"
        value="/detection"
        onClick={handleClick}
        style={{ backgroundColor: '/detection' == active ? blue : blue + '60' }}
      ></Button>
      <Button
        text="Control"
        value="/control"
        onClick={handleClick}
        style={{ backgroundColor: '/control' == active ? green : green + '60' }}
      ></Button>
    </div>
  )
}

export default Navbar
