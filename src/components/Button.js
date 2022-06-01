import { Link } from 'react-router-dom'
import Icon from './Icon'

function Button(props){
  const content = (
    <>
      <Icon className="icon" name={props.icon}/>
      <h3 className={
        props.isTextHidden?
        "button-text":
        "button-text button-text-activated"
      }>
        {props.name}
      </h3>
    </>
  )

  switch (props.mode) {
    case "button":
      return (
        <button 
          className="button"
          onClick={() => props.onFunc()} 
        >
          {content}
        </button>
      ) 
    case "link-button":
      return (
        <a 
          className="button"
          target="_blank" 
          referrerPolicy='no-referrer' 
          rel='noreferrer'
          href={props.link}
        >
          {content}
        </a>
      )
    case "link":
      return (
        <Link to={props.path}>
          <button 
            className="button"
          >
            {content}
          </button>
        </Link>
      )
    case "i-button":
      return (
        <button 
          className="button i-button"
          onClick={() => props.onFunc()} 
        >
          <Icon className="icon" name={props.icon}/>
        </button>
      )
  }
}

export default Button