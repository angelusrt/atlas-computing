import Icon from './Icon'

function Button(props){
  return(
    <button onClick={() => props.onFunc()} className="button">
      <Icon className="icon" name={props.icon}/>
      <h3 className={
        props.type?
        "button-text":
        "button-text button-text-activated"
      }>
        {props.name}
      </h3>
    </button>
  )
}

export default Button