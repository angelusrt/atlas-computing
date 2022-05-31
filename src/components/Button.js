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
  return(
    <>
      {
        props.mode === "button"?
        <button 
          className="button"
          onClick={() => props.onFunc()} 
        >
          {content}
        </button>:
        props.mode === "link-button"? 
        <a 
          className="button"
          target="_blank" 
          referrerPolicy='no-referrer' 
          rel='noreferrer'
          href={props.link}
        >
          {content}
        </a>: 
        <Link to={props.path}>
          <button 
            className="button"
          >
            {content}
          </button>
        </Link>
      }
    </>
  )
}

export default Button