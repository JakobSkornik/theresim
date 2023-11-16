import Button from './Button'

import { useEffect, useState } from 'react'
import { useControlPanelContext } from '../context'
import { primary } from '../modules/const'

const sx = {
  ctrlPanel: {
    position: 'fixed' as 'fixed',
    left: 'calc(50vw - 130px)',
    height: '80px',
    width: '260px',
    padding: '10px',
    backgroundColor: primary + '90',
    backdropFilter: 'blur(3px)',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'top 0.2s ease-out',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px ${primary}`,
  },
  btn: {
    width: '65px',
    height: '60px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: '40%',
  },
  btnActive: {
    width: '65px',
    height: '60px',
    backgroundColor: 'rgba(100, 100, 100, .4)',
    borderColor: 'rgba(0, 0, 0, 0)',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px ${primary}`,
  },
  hoverContainer: {
    position: 'absolute' as 'absolute',
    left: '-75px',
    height: '200px',
    width: '500px',
    borderRadius: '30%',
    top: '-80px',
    zIndex: '-1',
  },
}

const ControlPanel = () => {
  const { playback, togglePlayback, showUI, toggleShowUI, info, toggleInfo } =
    useControlPanelContext()

  const [ctrlPanel, setCtrlPanel] = useState(true)
  useEffect(() => {
    const timeId = setTimeout(() => {
      setCtrlPanel(false)
    }, 2000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  const onTogglePlayback = () => {
    togglePlayback()
  }

  const onToggleInfo = () => {
    toggleInfo()
  }

  const onToggleHideUI = () => {
    toggleShowUI(!showUI)
  }

  const openCtrlPanel = () => {
    setCtrlPanel(true)
  }

  const closeCtrlPanel = () => {
    setCtrlPanel(false)
  }

  return (
    <div
      style={{
        ...sx.ctrlPanel,
        ...{
          top: ctrlPanel ? 'calc(100vh - 90px)' : 'calc(100vh - 4px)',
        },
      }}
      onMouseEnter={openCtrlPanel}
      onMouseLeave={closeCtrlPanel}
    >
      <div
        style={sx.hoverContainer}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      ></div>
      <Button
        style={!showUI ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="info"
        onClick={onToggleHideUI}
        icon="sunset.svg"
        iconSize={50}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={playback ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="playback"
        onClick={onTogglePlayback}
        icon="webcam.svg"
        iconSize={50}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={info ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="info"
        onClick={onToggleInfo}
        icon="info.svg"
        iconSize={50}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
    </div>
  )
}

export default ControlPanel
