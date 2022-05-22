import Icon from './Icon'

function Button(props){
  return(
    <button className="button">
      <Icon className="icon" name={props.icon}/>
      <h3 className="button-text">{props.name}</h3>
    </button>
  )
}

export default Button