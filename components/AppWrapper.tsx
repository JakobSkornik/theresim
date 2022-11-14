import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Background from './Background'
import Container from './Container'
import ControlPanel from './ControlPanel'
import Loader from './Loader'
import Message from './Message'
import Navbar from './NavBar'
import Popup from './Popup'
import { getInformationText } from '../modules/const'
import { Props } from '../types/Props'
import { useControlPanelContext } from '../context'

const sx = {
  appWrapper: {
    height: '100vh',
    width: '100vw',
  },
  container: {
    margin: '20px',
    width: 'calc(100vw - 40px)',
    height: 'calc(100vh - 40px)',
    transition: 'margin 700ms ease-out, opacity 700ms ease',
    willChange: 'margin',
  },
}

const AppWrapper = (props: Props) => {
  const router = useRouter()
  const { fullscreen, showUI, info, toggleInfo, loading } =
    useControlPanelContext()
  const [msgOpen, setMsg] = useState(true)

  const msgText = 'You can find more information in the control panel.'

  useEffect(() => {
    const timeId = setTimeout(() => {
      setMsg(false)
    }, 2000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  const closeInfo = () => {
    toggleInfo(false)
  }

  return (
    <div style={sx.appWrapper}>
      <Background />
      <Container
        title="THERESIM"
        style={{
          ...sx.container,
          ...{
            marginLeft: fullscreen ? '105vw' : '20px',
            opacity: showUI ? '1' : '0',
          },
        }}
      >
        <Navbar />
        {props.children}
      </Container>
      <Loader style={{ opacity: loading ? '1' : '0' }} />
      <ControlPanel />
      <Message
        style={{ opacity: msgOpen && !info ? '1' : '0' }}
        text={msgText}
        icon="arrow.svg"
        iconSize={50}
      />
      <Popup
        style={{ opacity: info ? '1' : '0' }}
        text={getInformationText(router.route)}
        icon="close.svg"
        togglePopup={closeInfo}
      />
    </div>
  )
}
export default AppWrapper
