import { ReactNode } from 'react'

export type ContainerProps = {
  title: string
  children: ReactNode
  icon?: string
  style?: { [Key: string]: string }
}
