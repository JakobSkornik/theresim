import React, { useEffect } from 'react'
import Link from 'next/link' // Import Link from next/link

import { primary } from '../../modules/const'
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
    margin: '55vh 20px 0 0',
    padding: '20px 40px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: primary + '90',
    backdropFilter: 'blur(3px)',
    border: 'none',
    borderRadius: '5px',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px ${primary}`,
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
