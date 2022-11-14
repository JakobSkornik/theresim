import { useRouter } from 'next/router'
import React, { MouseEvent, useState } from 'react'

import Button from './Button'
import { shadow, fifth, primary } from '../modules/const'

const sx = {
  container: {
    width: 'calc(100vw - 70px)',
    height: '90px',
    padding: '10px 0 10px 0',
    overflowX: 'scroll' as 'scroll',
    overflowY: 'visible' as 'visible',
    display: 'flex',
    margin: '10px',
    justifyContent: 'left',
    msOverflowStyle: 'none' as 'none',
    scrollbarWidth: 'none' as 'none',
  },
  btn: {
    padding: '5px 10px 5px 10px',
    marginLeft: '20px',
  },
}

const buttonGradient = primary

const activeButtonGradient = `
linear-gradient(
  170deg,
  rgba(66,27,104,1) 0%,
  rgba(43,17,101,1) 35%,
  rgba(255,3,112,1) 100%
)`

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
        text="Hands"
        value="/freehand"
        onClick={handleClick}
        style={{
          ...sx.btn,
          ...{
            background:
              '/freehand' == active ? activeButtonGradient : buttonGradient,
            boxShadow:
              '/freehand' == active
                ? `5px 5px ${shadow}, 0 0 10px 3px rgba(3, 255, 161, 0.4)`
                : `5px 5px ${'/freehand' == active ? fifth : shadow}`,
          },
        }}
      ></Button>
      <Button
        text="Coordinates"
        value="/coordinates"
        onClick={handleClick}
        style={{
          ...sx.btn,
          ...{
            background:
              '/coordinates' == active ? activeButtonGradient : buttonGradient,
            boxShadow:
              '/coordinates' == active
                ? `5px 5px ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `5px 5px ${'/coordinates' == active ? fifth : shadow}`,
          },
        }}
      ></Button>
      <Button
        text="Detection"
        value="/detection"
        onClick={handleClick}
        style={{
          ...sx.btn,
          ...{
            background:
              '/detection' == active ? activeButtonGradient : buttonGradient,
            boxShadow:
              '/detection' == active
                ? `5px 5px ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `5px 5px ${'/detection' == active ? fifth : shadow}`,
          },
        }}
      ></Button>
      <Button
        text="Control"
        value="/control"
        onClick={handleClick}
        style={{
          ...sx.btn,
          ...{
            background:
              '/control' == active ? activeButtonGradient : buttonGradient,
            boxShadow:
              '/control' == active
                ? `5px 5px ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `5px 5px ${'/control' == active ? fifth : shadow}`,
          },
        }}
      ></Button>
      <Button
        text="Piano"
        value="/keyboard"
        onClick={handleClick}
        style={{
          ...sx.btn,
          ...{
            background:
              '/keyboard' == active ? activeButtonGradient : buttonGradient,
            boxShadow:
              '/keyboard' == active
                ? `5px 5px ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `5px 5px ${'/keyboard' == active ? fifth : shadow}`,
          },
        }}
      ></Button>
      <Button
        text="Instrument"
        value="/instrument"
        onClick={handleClick}
        style={{
          ...sx.btn,
          ...{
            background:
              '/instrument' == active ? activeButtonGradient : buttonGradient,
            boxShadow:
              '/instrument' == active
                ? `5px 5px ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `5px 5px ${'/instrument' == active ? fifth : shadow}`,
          },
        }}
      ></Button>
      <Button
        text="Demo"
        value="/demo"
        onClick={handleClick}
        style={{
          ...sx.btn,
          ...{
            background:
              '/demo' == active ? activeButtonGradient : buttonGradient,
            boxShadow:
              '/demo' == active
                ? `5px 5px ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `5px 5px ${'/demo' == active ? fifth : shadow}`,
          },
        }}
      ></Button>
    </div>
  )
}

export default Navbar
