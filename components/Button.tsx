import Image from 'next/image'
import React from 'react'
import { borderColor, shadow } from '../modules/const'

import { ButtonProps } from '../types'

const sx = {
  button: {
    fontSize: '20px',
    borderRadius: '2px',
    border: '1px solid ' + borderColor + '60',
    color: shadow,
    outline: 'none'
  },
  icon: {},
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
