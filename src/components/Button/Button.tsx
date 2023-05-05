import Link from 'next/link'
import { ReactNode } from 'react'
import { ButtonRef, DivRef } from '../../utils/types'
import Icon from '../Icon'
import "./Button.css"

type ButtonType = {
  children?: ReactNode,
  icon?: string,
  name?: "nav-button"
  onClick?: () => void,
  func?: any
} 

const Button = (prop: ButtonType & {buttonRef?: ButtonRef}) => {
  const {buttonRef, icon, name, children, func, onClick} = prop

  return (
    <button 
      ref={buttonRef} 
      className={"button " + name} 
      onClick={onClick}
      {...func}
    >
      {icon && <Icon name={icon}/>}
      {children}
    </button>
  )
}

const ButtonLink = ({to, children}: {to: string, children: ReactNode}) => (
  <Link href={to} className="button">
    {children}
  </Link>
)

const ButtonBlock = (prop: ButtonType & {blockRef?: DivRef}) => {
  const {blockRef, icon, name, children, func, onClick} = prop

  return (
    <div 
      ref={blockRef} 
      className={"button " + name} 
      onClick={onClick}
      {...func}
    >
      {icon && <Icon name={icon}/>}
      {children}
    </div>
  )
} 

export {Button, ButtonLink, ButtonBlock}