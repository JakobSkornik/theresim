import Image from 'next/image'

import { borderColor, primary, shadow } from '../modules/const'

const sx = {
  title: {
    height: '45px',
    width: '100%',
    backgroundColor: primary + '90',
    color: shadow,
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    borderBottom: '1px solid ' + borderColor + '60',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleText: {
    marginLeft: '10px',
    marginTop: '0',
  },
  text: {
    fontSize: '18px',
    marginTop: '0px',
    marginLeft: '10px',
    color: shadow,
  },
}

const TutorialFactory = ({ stage }: { stage: number }) => {
  switch (stage) {
    case 0:
      return (
        <>
          <div style={sx.title}>
            <span>
              <h1 style={sx.titleText}>Welcome</h1>
            </span>
          </div>
          <div style={sx.text}>
            <span>
              Welcome to THERESIM. THERESIM is a diatonic instrument played with
              hand gestures using a webcam.
            </span>
          </div>
        </>
      )
    case 1:
      return (
        <>
          <div style={sx.title}>
            <span>
              <h1 style={sx.titleText}>Control Panel</h1>
            </span>
          </div>
          <div style={sx.text}>
            <span>
              By hovering the bottom of the screen you open the control panel.
              Control panel allows you to go back home{' '}
              <Image
                src="/icons/home.svg"
                width={30}
                height={30}
                alt="Home image."
              />
              , view background animation
              <Image
                src="/icons/sunset.svg"
                width={30}
                height={30}
                alt="Snst image."
              />
              , toggle note trigger mode{' '}
              <Image
                src="/icons/crosshair.svg"
                width={30}
                height={30}
                alt="Crshr image."
              />
              , hand feedback mode{' '}
              <Image
                src="/icons/skeleton.svg"
                width={30}
                height={30}
                alt="Skltn image."
              />{' '}
              and webcam feedback{' '}
              <Image
                src="/icons/webcam.svg"
                width={30}
                height={30}
                alt="Webcam image."
              />
              .
            </span>
          </div>
        </>
      )
    default:
      return <></>
  }
}

export default TutorialFactory
