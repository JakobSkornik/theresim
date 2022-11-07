import Image from 'next/image'
import React from 'react'

import { tintedWhite, yellow } from '../modules/const'
import { ContainerProps } from '../types'

const sx = {
  title: {
    height: '45px',
    backgroundColor: yellow,
    color: 'black',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    borderBottom: '3px solid black',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: tintedWhite,
    marginTop: '0',
    boxShadow: '8px 8px black',
    borderRadius: '10px',
    border: '3px solid black',
  },
  icon: {
    margin: '5px 10px 10px 20px',
  },
}

const Container = (props: ContainerProps) => {
  return (
    <div style={{ ...props.style, ...sx.container }}>
      <div style={sx.title}>
        <span>
          <h1 style={{ marginLeft: '10px' }}>{props.title}</h1>
        </span>
        <span>
          {props.icon && (
            <Image
              src={props.icon}
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
