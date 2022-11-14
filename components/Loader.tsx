import React from 'react'
import { useControlPanelContext } from '../context'
import { primary, shadow } from '../modules/const'

const sx = {
  container: {
    position: 'fixed' as 'fixed',
    left: '0px',
    top: '0px',
    height: '100%',
    width: '100%',
    backdropFilter: 'blur(3px)',
    transition: 'opacity .7s ease-in-out',
    pointerEvents: 'none' as 'none',
  },
  loader: {
    position: 'absolute' as 'absolute',
    top: 'calc(50% - 25px)',
    left: 'calc(50% - 100px)',
    height: '50px',
    width: '200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  led: {
    background: primary + 'FF',
    width: '40px',
    height: '10px',
    margin: '5px',
    boxShadow: `3px 3px ${shadow}, 0 0 10px 4px rgba(3, 251, 161, 0.2)`,
  },
  one: {
    animation: 'blip 1s ease-in-out 0s infinite alternate',
  },
  two: {
    animation: 'blip 1s ease-in-out .1s infinite alternate',
  },
  three: {
    animation: 'blip 1s ease-in-out .2s infinite alternate',
  },
  four: {
    animation: 'blip 1s ease-in-out .3s infinite alternate',
  },
}

const Loader = ({ style }: any) => {
  const { loading } = useControlPanelContext()

  return (
    <div
      style={{
        ...sx.container,
        ...style,
        ...{
          transition: loading
            ? 'opacity 0s ease-in-out'
            : 'opacity 1s ease-in-out',
        },
      }}
    >
      <div style={sx.loader}>
        <div style={{ ...sx.led, ...sx.one }} />
        <div style={{ ...sx.led, ...sx.two }} />
        <div style={{ ...sx.led, ...sx.three }} />
        <div style={{ ...sx.led, ...sx.four }} />
      </div>
    </div>
  )
}

export default Loader
