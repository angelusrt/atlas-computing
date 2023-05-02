import { Link } from 'react-router-dom'
import { ButtonRef } from '../../utils/types'
import Icon from '../Icon'
import "./Button.css"

type ButtonType = {
  buttonRef?: ButtonRef, 
  children?: any,
  icon?: string,
  name?: "nav-button"
  onClick?: () => void,
  func?: any
}

const Button = (prop: ButtonType) => {
  const {buttonRef, icon, name, children, onClick, func} = prop

  return (
    <button 
      ref={buttonRef} 
      className={name} 
      onClick={onClick}
      {...func}
    >
      {icon && <Icon name={icon}/>}
      {children}
    </button>
  )
}

type ButtonLinkType = ButtonType & {to: string}

const ButtonLink = (prop: ButtonLinkType) => (
  <Link to={prop.to}>
    <Button {...prop}/>
  </Link>
)

export {Button, ButtonLink}