import { useRouter } from 'next/router'
import React, { MouseEvent, useState } from 'react'

import Button from './Button'
import { shadow, fifth, primary } from '../modules/const'
import { useControlPanelContext, useHandsContext } from '../context'

const sx = {
  container: {
    width: '96vw',
    height: '10vh',
    overflowX: 'scroll' as 'scroll',
    overflowY: 'visible' as 'visible',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    msOverflowStyle: 'none' as 'none',
    scrollbarWidth: 'none' as 'none',
  },
  btn: {
    padding: '1vh 1vw 1vh 1vw',
    marginLeft: '1vw',
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
  const { toggleLoading } = useControlPanelContext()
  const handsContext = useHandsContext()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (e.currentTarget.value != active) {
      if (handsContext) {
        handsContext.camReady = false
      }

      toggleLoading(true)
      setActive(e.currentTarget.value)
      router.push(e.currentTarget.value)
    }
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
                ? `0.5vw 0.5vh ${shadow}, 0 0 10px 3px rgba(3, 255, 161, 0.4)`
                : `0.5vw 0.5vh ${'/freehand' == active ? fifth : shadow}`,
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
                ? `0.5vw 0.5vh ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `0.5vw 0.5vh ${'/coordinates' == active ? fifth : shadow}`,
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
                ? `0.5vw 0.5vh ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `0.5vw 0.5vh ${'/detection' == active ? fifth : shadow}`,
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
                ? `0.5vw 0.5vh ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `0.5vw 0.5vh ${'/control' == active ? fifth : shadow}`,
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
                ? `0.5vw 0.5vh ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `0.5vw 0.5vh ${'/keyboard' == active ? fifth : shadow}`,
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
                ? `0.5vw 0.5vh ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `0.5vw 0.5vh ${'/instrument' == active ? fifth : shadow}`,
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
                ? `0.5vw 0.5vh ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.3)`
                : `0.5vw 0.5vh ${'/demo' == active ? fifth : shadow}`,
          },
        }}
      ></Button>
    </div>
  )
}

export default Navbar
