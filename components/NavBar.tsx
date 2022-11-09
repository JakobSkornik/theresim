import React, { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'

import { darkBlue, geranimo, mountain, peachy, pink, purple, rosy } from '../modules/const'
import Button from './Button'

const sx = {
  container: {
    width: '100%',
    height: '60px',
    paddingBottom: '8px',
    overflowX: 'scroll' as 'scroll',
    display: 'flex',
    margin: '5px 0 5px 0',
    justifyContent: 'left',
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
        text="Piano"
        value="/keyboard"
        onClick={handleClick}
        style={{
          backgroundColor: '/keyboard' == active ? mountain : mountain + '70',
          boxShadow: `8px 8px ${'/keyboard' == active ? '#596275' : 'black'}`,
        }}
      ></Button>
      <Button
        text="Instrument"
        value="/instrument"
        onClick={handleClick}
        style={{
          backgroundColor: '/instrument' == active ? darkBlue : darkBlue + '70',
          boxShadow: `8px 8px ${'/instrument' == active ? '#596275' : 'black'}`,
        }}
      ></Button>
      <Button
        text="Demo"
        value="/demo"
        onClick={handleClick}
        style={{
          backgroundColor: '/demo' == active ? geranimo : geranimo + '70',
          boxShadow: `8px 8px ${'/demo' == active ? '#596275' : 'black'}`,
        }}
      ></Button>
    </div>
  )
}

export default Navbar
