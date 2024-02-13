import React, { useEffect } from 'react'
import Link from 'next/link' // Import Link from next/link
import { useControlPanelContext } from '../../context'

const sx = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  link: {
    margin: '0 20px',
    padding: '20px 40px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    textDecoration: 'none', // Remove underline from links
    color: 'black', // Style as needed
    backgroundColor: 'lightgray', // Style as needed
    border: 'none',
    borderRadius: '5px',
  },
}

const Home = () => {
  const { toggleLoading } = useControlPanelContext()

  useEffect(() => {
    toggleLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={sx.container}>
      <Link href="/tutorial" style={sx.link}>
        Tutorial
      </Link>
      <Link href="/melody" style={sx.link}>
        Melody
      </Link>
      <Link href="/freestyle" style={sx.link}>
        Freestyle
      </Link>
    </div>
  )
}

export default Home
