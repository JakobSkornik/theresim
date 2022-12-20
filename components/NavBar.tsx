import { useRouter } from 'next/router'
import React, { MouseEvent, useState } from 'react'

import Button from './Button'
import { shadow, fifth, primary } from '../modules/const'
import { useControlPanelContext } from '../context'

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

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (e.currentTarget.value != active) {
      toggleLoading(true)
      setActive(e.currentTarget.value)
      router.push(e.currentTarget.value)
    }
  }

  return (
    <div style={sx.container}>
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
      <Button
        text="Calibration"
        value="/calibrate"
        onClick={handleClick}
        style={{
          ...sx.btn,
          ...{
            background:
              '/calibrate' == active ? activeButtonGradient : buttonGradient,
            boxShadow:
              '/calibrate' == active
                ? `0.5vw 0.5vh ${shadow}, 0 0 10px 3px rgba(3, 255, 161, 0.4)`
                : `0.5vw 0.5vh ${'/calibrate' == active ? fifth : shadow}`,
          },
        }}
      ></Button>
    </div>
  )
}

export default Navbar
