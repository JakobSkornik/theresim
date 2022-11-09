import Image from 'next/image'
import React from 'react'

import { blue, tintedWhite } from '../modules/const'
import { MessageProps } from '../types'

const sx = {
  container: {
    position: 'fixed' as 'fixed',
    top: 'calc(100vh - 275px)',
    left: 'calc(50vw - 150px)',
    width: '300px',
    height: '175px',
    backgroundColor: tintedWhite,
    boxShadow: '8px 8px black',
    borderRadius: '10px',
    border: '3px solid black',
    marginTop: '0',
    transition: 'opacity 0.5s',
    pointerEvents: 'none' as 'none',
  },
  title: {
    height: '45px',
    width: '100%',
    backgroundColor: blue,
    color: 'black',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    borderBottom: '3px solid black',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: '20px',
    whiteSpace: 'pre-wrap' as 'pre-wrap',
  },
  icon: {
    position: 'fixed' as 'fixed',
    top: 'calc(100vh - 165px)',
    left: 'calc(50vw - 45px)',
    margin: '5px 10px 10px 20px',
    filter: 'drop-shadow(4px 4px rgba(0, 0, 0, 1))',
  },
}

const Message = (props: MessageProps) => {
  return (
    <div style={{ ...props.style, ...sx.container }}>
      <div style={sx.title}>
        <span>
          <h1>Info</h1>
        </span>
      </div>
      <span style={sx.text}>{props.text}</span>
      {props.icon && (
        <span>
          <Image
            src={`/icons/${props.icon}`}
            alt="MsgIcon"
            width={props.iconSize ?? 30}
            height={props.iconSize ?? 30}
            style={sx.icon}
          />
        </span>
      )}
    </div>
  )
}

export default Message
