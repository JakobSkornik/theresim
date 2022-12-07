import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

import { borderColor, primary, shadow } from '../modules/const'
import { ContainerProps } from '../types'

const sx = {
  title: {
    height: '5vh',
    backgroundColor: primary,
    borderTopLeftRadius: '2px',
    borderTopRightRadius: '2px',
    borderBottom: '1px solid ' + borderColor + '60',
    paddingLeft: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: primary + 'B0',
    borderRadius: '2px',
    border: '1px solid ' + borderColor + '60',
    boxShadow: `1vw 1vh ${shadow}, 0 0 10px 2px rgba(3, 255, 161, 0.2)`,
  },
  icon: {
    // margin: '5px 10px 10px 20px',
    // filter: `drop-shadow(4px 4px ${shadow})`,
  },
  header: {
    fontSize: '3.5vh',
    letterSpacing: '5px',
    color: shadow,
  },
}

const animations = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const Container = (props: ContainerProps) => {
  return (
    <div style={{ ...props.style, ...sx.container }}>
      <div style={sx.title}>
        <span>
          <h1 style={sx.header}>{props.title}</h1>
        </span>
        <span>
          {props.icon && (
            <Image
              src={`/icons/${props.icon}`}
              alt="TitleBarIcon"
              width={30}
              height={30}
              style={sx.icon}
            />
          )}
        </span>
      </div>
      {props.children}
    </div>
  )
}

export default Container
