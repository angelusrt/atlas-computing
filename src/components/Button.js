import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from "react-transition-group"
import Icon from './Icon'

function Button(props){
  const[isButton, setIsButton] = useState(false)

  const content = (
    <>
      <Icon name={props.icon}/>
      <h3>{props.name}</h3>
    </>
  )

  switch (props.mode) {
    case "button":
      return (
        <CSSTransition 
          classNames={
            props.icon !== undefined?
            "button-icon-anim":"button-anim"
          } 
          in={isButton} 
          timeout={500} 
        >
          <button 
            className={
              props.icon !== undefined?
              "button button-icon":"button"
            }
            onClick={() => props.onFunc()} 
            onMouseOver={() => setIsButton(true)}
            onMouseLeave={() => setIsButton(false)}
          >
            {content}
          </button>
        </CSSTransition>
      ) 
    case "link-button":
      return (
        <CSSTransition 
          classNames={
            props.icon !== undefined?
            "button-icon-anim":"button-anim"
          }  
          in={isButton} 
          timeout={500} 
        >
          <a 
            className={
              props.icon !== undefined?
              "button button-icon":"button"
            }
            target="_blank" 
            referrerPolicy='no-referrer' 
            rel='noreferrer'
            href={props.link}
            onMouseOver={() => setIsButton(true)}
            onMouseLeave={() => setIsButton(false)}
          >
            {content}
          </a>
        </CSSTransition>
      )
    case "link-button-2":
      return (
        <CSSTransition 
          classNames={
            props.icon !== undefined?
            "button-icon-anim":"button-anim"
          }  
          in={isButton} 
          timeout={500} 
        >
          <a 
            className={
              props.icon !== undefined?
              "button button-icon":"button"
            }
            referrerPolicy='no-referrer' 
            rel='noreferrer'
            href={props.link}
            onClick={() => props.onFunc()} 
            onMouseOver={() => setIsButton(true)}
            onMouseLeave={() => setIsButton(false)}
          >
            <Icon name={props.icon}/>
              <h3 className="index-text">
                {props.name}
              </h3>
          </a>
        </CSSTransition>
      )
    case "link":
      return (
        <Link to={props.path}>
          <CSSTransition 
            classNames={
              props.icon !== undefined?
              "button-icon-anim":"button-anim"
            }  
            in={isButton} 
            timeout={500} 
          >
            <button 
              className={
                props.icon !== undefined?
                "button button-icon":"button"
              }
              onClick={() => props.onFunc()} 
              onMouseOver={() => setIsButton(true)}
              onMouseLeave={() => setIsButton(false)}
            >
              {content}
            </button>
          </CSSTransition>
        </Link>
      )
    case "link2":
      return (
        <Link to={props.path}>
          <CSSTransition 
            classNames={
              props.icon !== undefined?
              "button-icon-anim":"button-anim"
            }   
            in={isButton} 
            timeout={500} 
          >
            <button 
              className={
                props.icon !== undefined?
                "button button-icon":"button"
              }
              onClick={() => props.onFunc()} 
              onMouseOver={() => setIsButton(true)}
              onMouseLeave={() => setIsButton(false)}
            >
              <h1>
              { 
                props.path === "/Post"?"at.com":
                props.path === "/About"?"Sobre":
                "Recentes"
              }
              </h1>
            </button>
          </CSSTransition>
        </Link>
      )
    case "i-button":
      return (
        <CSSTransition 
          classNames="i-button-anim" 
          in={isButton} 
          timeout={500} 
        >
          <button 
            className="button i-button"
            onClick={() => props.onFunc()} 
            onMouseOver={() => setIsButton(true)}
            onMouseLeave={() => setIsButton(false)}
          >
            <Icon name={props.icon}/>
          </button>
        </CSSTransition>
      )
  }
}

export default Button