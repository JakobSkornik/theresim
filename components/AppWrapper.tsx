import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Background from './Background'
import ControlPanel from './ControlPanel'
import Loader from './Loader'
import Message from './Message'
import { getInformationText } from '../modules/const'
import { Props } from '../types/Props'
import { useControlPanelContext } from '../context'

const sx = {
  appWrapper: {
    height: 'max(100vh, 560px)',
    width: 'max(100vw, 960px)',
  },
  container: {
    margin: '2vh 2vw 2vh 2vw',
    width: 'max(96vw, 940px)',
    height: 'max(96vh, 540px)',
    transition: 'margin 700ms ease-out, opacity 700ms ease',
    willChange: 'margin',
  },
}

const AppWrapper = (props: Props) => {
  const [msgOpen, setMsg] = useState(true)
  const { loading } = useControlPanelContext()

  const msgText =
    'You can find more information in the control panel. If the instrument is not loading, it is likely that the music library is downloading instruments. Wait for 2 minutes and then refresh.'

  useEffect(() => {
    const timeId = setTimeout(() => {
      setMsg(false)
    }, 10000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  return (
    <div style={sx.appWrapper}>
      <Background />
      {props.children}
      <Loader style={{ opacity: loading ? '1' : '0' }} />
      <ControlPanel />
      <Message
        style={{ opacity: msgOpen ? '1' : '0' }}
        text={msgText}
        icon="arrow.svg"
        iconSize={50}
      />
    </div>
  )
}
export default AppWrapper
