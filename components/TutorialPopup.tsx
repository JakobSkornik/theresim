import Button from './Button'
import TutorialFactory from './TutorialFactory'

import { borderColor, primary, shadow, textColor } from '../modules/const'
import { useTutorialContext } from '../context'
import { useRouter } from 'next/router'

const sx = {
  container: {
    position: 'fixed' as 'fixed',
    top: '25px',
    left: 'calc(100vw - 430px)',
    width: '400px',
    backgroundColor: primary + 'EF',
    color: textColor,
    borderRadius: '2px',
    borderBottom: '1px solid ' + borderColor + '60',
    _boxShadow: `4px 4px ${shadow}, 0 0 30px 1px ${shadow}40`,
    get boxShadow() {
      return this._boxShadow
    },
    set boxShadow(value) {
      this._boxShadow = value
    },
    marginTop: '0',
    transition: 'opacity 1s',
    willChange: 'opacity',
    pointerEvents: 'none' as 'none',
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  nextBtn: {
    width: '90px',
    height: '60px',
    padding: '0',
    margin: '6px',
    color: primary + 'EF',
    borderColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: '#44F89F',
    pointerEvents: 'auto' as 'auto',
  },
}

const TutorialPopup = () => {
  const router = useRouter()
  const { stage, setStage } = useTutorialContext()

  return (
    <div style={sx.container}>
      <TutorialFactory stage={stage}></TutorialFactory>
      <div style={sx.btnWrapper}>
        {stage > 0 && (
          <Button
            style={sx.nextBtn}
            text="Back"
            value="prevStage"
            onClick={() => {
              setStage(stage - 1)
            }}
          />
        )}
        {stage < 8 && (
          <Button
            style={sx.nextBtn}
            text="Next"
            value="nextStage"
            onClick={() => {
              setStage(stage + 1)
            }}
          />
        )}
        {stage == 8 && (
          <Button
            style={sx.nextBtn}
            text="Home"
            value="home"
            onClick={() => {
              router.push('/home')
            }}
          />
        )}
        {stage == 8 && (
          <Button
            style={sx.nextBtn}
            text="Melodies"
            value="melodies"
            onClick={() => {
              router.push('/melody')
            }}
          />
        )}
        {stage == 8 && (
          <Button
            style={sx.nextBtn}
            text="Freestyle"
            value="freestyle"
            onClick={() => {
              router.push('/freestyle')
            }}
          />
        )}
      </div>
    </div>
  )
}
export default TutorialPopup
