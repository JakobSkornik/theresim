import React from 'react'

import { ButtonProps } from '../types/ButtonProps'

const sx = {
  button: {
    padding: '3px 10px 10px 10px',
    marginLeft: '15px',
    boxShadow: '8px 8px black',
    fontSize: '30px',
    borderRadius: '10px',
    border: '3px solid black',
    color: 'black',
    outline: 'none'
  },
}

const Button = (props: ButtonProps) => {
  return (
    <button
      value={props.value}
      type="button"
      style={{ ...props.style, ...sx.button }}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default Button
