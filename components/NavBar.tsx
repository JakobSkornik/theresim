import React, { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'

import { mountain, peachy, pink, purple, rosy } from '../modules/const'
import Button from './Button'

const sx = {
  container: {
    width: '100%',
    height: '60px',
    paddingBottom: '8px',
    overflowX: 'auto' as 'auto',
    display: 'flex',
    margin: '5px 0 5px 0',
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
          backgroundColor: '/freehand' == active ? rosy : rosy + '70',
          boxShadow: `8px 8px ${'/freehand' == active ? '#596275' : 'black'}`,
        }}
      ></Button>
      <Button
        text="Coordinates"
        value="/coordinates"
        onClick={handleClick}
        style={{
          backgroundColor: '/coordinates' == active ? peachy : peachy + '70',
          boxShadow: `8px 8px ${
            '/coordinates' == active ? '#596275' : 'black'
          }`,
        }}
      ></Button>
      <Button
        text="Detection"
        value="/detection"
        onClick={handleClick}
        style={{
          backgroundColor: '/detection' == active ? pink : pink + '70',
          boxShadow: `8px 8px ${'/detection' == active ? '#596275' : 'black'}`,
        }}
      ></Button>
      <Button
        text="Control"
        value="/control"
        onClick={handleClick}
        style={{
          backgroundColor: '/control' == active ? purple : purple + '70',
          boxShadow: `8px 8px ${'/control' == active ? '#596275' : 'black'}`,
        }}
      ></Button>
      <Button
        text="Keyboard"
        value="/keyboard"
        onClick={handleClick}
        style={{
          backgroundColor: '/keyboard' == active ? mountain : mountain + '70',
          boxShadow: `8px 8px ${'/keyboard' == active ? '#596275' : 'black'}`,
        }}
      ></Button>
    </div>
  )
}

export default Navbar
