import Icon from './Icon'

function Button(props){
  return(
    <a 
      className="button"
      target="_blank" 
      referrerPolicy='no-referrer' 
      href={props.link} 
      onClick={() => props.onFunc()} 
    >
      <Icon className="icon" name={props.icon}/>
      <h3 className={
        props.type?
        "button-text":
        "button-text button-text-activated"
      }>
        {props.name}
      </h3>
    </a>
  )
}

export default Button