import Button from "./button"

function Navbar(props){
  return(
    <div className={`nav ${props.isPost?"nav-post":"nav-home"}`}>
      <span className="left-side">
        <button 
          onClick={() => props.onFunc()}
          className="button"
        >
          <h1 className="header1">
            {props.isPost?"<ds>":"Recentes"}
          </h1>
        </button>
        {
          !props.isPost &&
          <Button type={false} name="Filtrar"/>
        }
      </span>
      <span className="rigth-side"> 
          {/* <Button type={true} icon="Podcast" name="Podcast"/> */}
          <Button type={true} icon="Exclamation" name ="Sobre"/>
          {/* <Button type={true} icon="GrandFont" name ="Aum. fonte"/> */}
          <Button 
            type={true} 
            onFunc={props.setIsDT} 
            icon={props.isDT?"Moon":"Sun"} 
            name={props.isDT?"Modo claro":"Modo escuro"}
          />
      </span>
    </div>
  )
}

export default Navbar