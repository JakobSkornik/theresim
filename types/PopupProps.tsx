import { MouseEvent } from 'react'

export type PopupProps = {
  text: JSX.Element
  togglePopup: (event: MouseEvent<HTMLButtonElement>) => void
  style?: { [Key: string]: string }
  icon?: string
  iconSize?: number
}
