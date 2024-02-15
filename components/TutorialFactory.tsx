import Image from 'next/image'

import { borderColor, primary, shadow } from '../modules/const'

const sx = {
  title: {
    height: '45px',
    width: '100%',
    backgroundColor: primary + 'FF',
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
  keyboardHighlight: {
    position: 'fixed' as 'fixed',
    left: '290px',
    top: '70px',
    height: 'calc(100vh - 90px)',
    width: 'calc(100vw - 320px)',
    zIndex: '-1',
    backgroundColor: '#700000' + '30',
    backdropFilter: 'blur(3px)',
    border: 'red 2px',
    borderRadius: '5px',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px #700000`,
  },
  padboardHighlight: {
    position: 'fixed' as 'fixed',
    left: '30px',
    top: '70px',
    height: 'calc(100vh - 90px)',
    width: '250px',
    zIndex: '-1',
    backgroundColor: '#700000' + '30',
    backdropFilter: 'blur(3px)',
    border: 'red 2px',
    borderRadius: '5px',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px #700000`,
  },
  ctrlHighlight: {
    position: 'fixed' as 'fixed',
    left: 'calc(50vw - 250px)',
    top: 'calc(100vh - 100px)',
    height: 'calc(100vh - 90px)',
    width: '500px',
    zIndex: '-1',
    backgroundColor: '#700000' + '30',
    border: 'red 2px',
    borderRadius: '100px',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px #700000`,
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
              <br />
              <br />
              Try waving your RIGHT hand in front of the camera!
            </span>
          </div>
        </>
      )
    case 1:
      return (
        <>
          <div style={sx.title}>
            <span>
              <h1 style={sx.titleText}>Welcome</h1>
            </span>
          </div>
          <div style={sx.text}>
            <span>
              Now try each of the 6 displayed gestures with your LEFT hand!
            </span>
          </div>
        </>
      )
    case 2:
      return (
        <>
          <div style={sx.keyboardHighlight}></div>
          <div style={sx.title}>
            <span>
              <h1 style={sx.titleText}>Notes</h1>
            </span>
          </div>
          <div style={sx.text}>
            <span>
              With your RIGHT hand you play individual notes. When a note is
              played it is shown with purple color.
            </span>
          </div>
        </>
      )
    case 3:
      return (
        <>
          <div style={sx.padboardHighlight}></div>
          <div style={sx.title}>
            <span>
              <h1 style={sx.titleText}>Chords</h1>
            </span>
          </div>
          <div style={sx.text}>
            <span>
              With your LEFT hand you play chords.
              <br />
              <br />
              Chords consist of three notes. They are displayed with green color
              on the keyboard when gestured.
            </span>
          </div>
        </>
      )
    case 4:
      return (
        <>
          <div style={sx.ctrlHighlight}></div>
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
    case 5:
      return (
        <>
          <div style={sx.ctrlHighlight}></div>
          <div style={sx.title}>
            <span>
              <h1 style={sx.titleText}>Trigger Mode</h1>
            </span>
          </div>
          <div style={sx.text}>
            <span>
              Notes are selected with the tip of your index finger. Try changing
              note trigger mode{' '}
              <Image
                src="/icons/crosshair.svg"
                width={30}
                height={30}
                alt="Crshr image."
              />{' '}
              in the control panel and see which feels best.
              <br />
              <br />
              In default trigger mode you play a note by tilting your index
              finger forward.
              <br />
              <br />
              In second trigger mode you play a note by extending your thumb.
            </span>
          </div>
        </>
      )
    case 6:
      return (
        <>
          <div style={sx.ctrlHighlight}></div>
          <div style={sx.title}>
            <span>
              <h1 style={sx.titleText}>Skeleton Mode</h1>
            </span>
          </div>
          <div style={sx.text}>
            <span>
              Your right hand feedback can be toggled with
              <Image
                src="/icons/skeleton.svg"
                width={30}
                height={30}
                alt="Skltn image."
              />{' '}
              in the control panel.
              <br />
              <br />
              Default mode displays the whole hand skeleton, second mode only
              displays the tip of your index finger.
            </span>
          </div>
        </>
      )
    case 7:
      return (
        <>
          <div style={sx.title}>
            <span>
              <h1 style={sx.titleText}>Sound</h1>
            </span>
          </div>
          <div style={sx.text}>
            <span>
              By now you should be hearing notes and chords when you gesture in
              front of the camera.
            </span>
          </div>
        </>
      )
    case 8:
      return (
        <>
          <div style={sx.title}>
            <span>
              <h1 style={sx.titleText}>Continue</h1>
            </span>
          </div>
          <div style={sx.text}>
            <span>
              You can now learn some simple melodies or move to the main part of
              the application; the improvisation module.
            </span>
          </div>
        </>
      )
    default:
      return <></>
  }
}

export default TutorialFactory
