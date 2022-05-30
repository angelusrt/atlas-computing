import Button from "./button"

function Navbar(props){
  return(
    <div className={`nav ${props.whatPage !== "post"?"nav1":"nav2"}`}>
      <span className="left-side">
        <button 
          onClick={() => props.onFunc()}
          className="button"
        >
          <h1 className="header1">
            {props.whatPage === "post"?"<ds>":"Recentes"}
          </h1>
        </button>
        {
          props.whatPage === "home" &&
          <Button type={false} name="Filtrar"/>
        }
      </span>
      <span className="rigth-side"> 
          {/* <Button type={true} icon="Podcast" name="Podcast"/> */}
          <Button 
            type={true} 
            icon="Exclamation" 
            name ="Sobre"
            onFunc={props.setWhatPage}
          />
          {/* <Button type={true} icon="GrandFont" name ="Aum. fonte"/> */}
          <Button 
            type={true} 
            icon={props.isDT?"Moon":"Sun"} 
            name={props.isDT?"Modo claro":"Modo escuro"}
            onFunc={props.setIsDT} 
          />
      </span>
    </div>
  )
}

export default Navbar