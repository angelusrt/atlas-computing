import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from "react-transition-group"
import Icon from './Icon'

function ButtonWrapper(props) {
  return(
    <button 
      className={props.buttonName}
      onClick={() => props.onFunc!==undefined?props.onFunc():null} 
      onTouchStart={() => props.setIsButton(true)}
      onTouchEnd={() => props.setIsButton(false)}
      onMouseOver={() => props.setIsButton(true)}
      onMouseLeave={() => props.setIsButton(false)}
    >
      <Icon name={props.icon}/>
      {props.name!== undefined && <h3>{props.name}</h3>}
      {
        props.path === "/" &&
        <h1>
        { 
          props.pathCurrent.substring(0, 5) === "/post"?
          "AtCom": 
          props.pathCurrent.substring(0, 6) === "/about"?
          "Sobre": "Recentes"
        }
        </h1>
      }
    </button>
  )
}

function Button(props){
  const[isButton, setIsButton] = useState(false)

  const transName=(
    props.icon===undefined?"button-anim":"button-icon-anim"
  )
  const buttonName=(
    props.icon===undefined?"button":
    props.icon==="Home"?"button button-icon i-button":"button button-icon"
  )

  return(
    props.path!==undefined?
    <Link to={props.path}>
      <CSSTransition 
        classNames={transName}
        in={isButton} 
        timeout={500} 
      >
        <ButtonWrapper
          buttonName={buttonName}
          icon={props.icon}
          name={props.name}
          path={props.path}
          pathCurrent={props.pathCurrent}
          onFunc={props.onFunc}
          setIsButton={(state) => setIsButton(state)}
        />
      </CSSTransition>
    </Link>:
    <CSSTransition 
      classNames={transName}
      in={isButton} 
      timeout={500} 
    >
      {
        props.link === undefined && props.onFunc !== undefined?
        <ButtonWrapper
          buttonName={buttonName}
          icon={props.icon}
          name={props.name}
          path={props.path}
          pathCurrent={props.pathCurrent}
          onFunc={props.onFunc}
          setIsButton={(state) => setIsButton(state)}
        />:
        props.link !== undefined && props.onFunc === undefined? 
        <a 
          className={buttonName}
          referrerPolicy='no-referrer' 
          rel='noreferrer'
          href={props.link}
          target="_blank"
          onTouchStart={() => setIsButton(true)}
          onTouchEnd={() => setIsButton(false)}
          onMouseOver={() => setIsButton(true)}
          onMouseLeave={() => setIsButton(false)}
        >
          <Icon name={props.icon}/>
          <h3>{props.name}</h3>
        </a>:
        <a 
          className={buttonName}
          referrerPolicy='no-referrer' 
          rel='noreferrer'
          href={props.link}
          onTouchStart={() => setIsButton(true)}
          onTouchEnd={() => setIsButton(false)}
          onMouseOver={() => setIsButton(true)}
          onMouseLeave={() => setIsButton(false)}
          onClick={() => props.onFunc()}
        >
          <h3 className='index-text'>{props.name}</h3>
        </a>
      }
    </CSSTransition>
  )
}

export default Button