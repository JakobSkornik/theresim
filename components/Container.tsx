import React from 'react'

const sx = {
  title: {
    position: 'absolute' as 'absolute',
    backgroundColor: 'white',
    color: 'black',
    left: '30px',
    top: '-30px',
    padding: '10px',
  },
  container: {
    marginTop: '0',
  },
  children: {},
}

const Container = (props: any) => {
  return (
    <div className="nes-container" style={{ ...props.style, ...sx.container }}>
      <div style={sx.title}>
        <h2>{props.title}</h2>
      </div>
      {props.children}
    </div>
  )
}

export default Container
