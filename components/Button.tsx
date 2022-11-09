import Image from 'next/image'
import React from 'react'

import { ButtonProps } from '../types'

const sx = {
  button: {
    padding: '3px 10px 10px 10px',
    marginLeft: '15px',
    fontSize: '30px',
    borderRadius: '10px',
    border: '3px solid black',
    color: 'black',
    outline: 'none',
  },
  icon: {
    margin: '5px 10px 10px 20px',
    filter: 'drop-shadow(4px 4px rgba(0, 0, 0, 1))',
  },
}

const Button = (props: ButtonProps) => {
  return (
    <button
      value={props.value}
      type="button"
      style={{ ...sx.button, ...props.style }}
      onClick={props.onClick}
    >
      {props.icon && (
        <span>
          <Image
            src={`/icons/${props.icon}`}
            alt="BtnIcon"
            width={props.iconSize ?? 30}
            height={props.iconSize ?? 30}
            style={sx.icon}
          />
        </span>
      )}
      <span>{props.text}</span>
    </button>
  )
}

export default Button
