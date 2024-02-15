import Background from './Background'
import ControlPanel from './ControlPanel'
import Loader from './Loader'
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
  const { loading } = useControlPanelContext()

  return (
    <div style={sx.appWrapper}>
      <Background />
      {props.children}
      <Loader style={{ opacity: loading ? '1' : '0' }} />
      <ControlPanel />
    </div>
  )
}
export default AppWrapper
