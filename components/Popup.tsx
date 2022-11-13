import { blue, borderColor, primary, shadow, textColor, tintedWhite } from '../modules/const'
import { PopupProps } from '../types/PopupProps'
import Button from './Button'

const sx = {
  container: {
    position: 'fixed' as 'fixed',
    top: '75px',
    left: 'calc(100vw - 440px)',
    width: '400px',
    backgroundColor: primary + 'EF',
    color: textColor,
    borderRadius: '2px',
    borderBottom: '1px solid ' + borderColor + '60',
    boxShadow: `4px 4px ${shadow}, 0 0 100px 10px rgba(3, 255, 161, 0.2)`,
    marginTop: '0',
    transition: 'opacity 1s',
    pointerEvents: 'none' as 'none',
  },
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
  },
  text: {
    fontSize: '20px',
    marginTop: '0px',
    marginLeft: '10px',
    color: shadow,
  },
  closeBtn: {
    width: '60px',
    padding: '0',
    margin: '6px',
    borderColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    pointerEvents: 'all' as 'all',
  },
}

const Popup = (props: PopupProps) => (
  <div style={{ ...props.style, ...sx.container }}>
    <div style={sx.title}>
      <span>
        <h1 style={sx.titleText}>Info</h1>
      </span>
      {props.icon && (
        <Button
          style={sx.closeBtn}
          text=""
          value="closeInfo"
          onClick={props.togglePopup}
          icon={props.icon}
        />
      )}
    </div>
    <div style={sx.text}>{props.text}</div>
  </div>
)
export default Popup
