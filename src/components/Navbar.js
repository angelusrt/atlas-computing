import { Link } from "react-router-dom"
import Button from "./Button"

function Navbar(props){
  return(
    <div className={`nav ${props.path !== "/Post"?"nav1":"nav2"}`}>
      <span className="left-side">
        <Link to="/" className="button">
          <h1 className="header1">
            { 
              props.path === "/Post"?
              "<ds>":
              props.path === "/About"?
              "Sobre":
              "Recentes"
            }
          </h1>
        </Link>
        {
          props.path === "/" &&
          <Button mode="button" name="Filtrar"/>
        }
      </span>
      <span className="rigth-side"> 
          {/* <Button isTextHidden={true} icon="Podcast" name="Podcast"/> */}
          <Button 
            mode="link"
            path="/About"
            isTextHidden={true} 
            icon="Exclamation" 
            name ="Sobre"
          />
          {/* <Button isTextHidden={true} icon="GrandFont" name ="Aum. fonte"/> */}
          <Button 
            mode="button"
            isTextHidden={true} 
            icon={props.isDT?"Moon":"Sun"} 
            name={props.isDT?"Modo claro":"Modo escuro"}
            onFunc={props.setIsDT} 
          />
      </span>
    </div>
  )
}

export default Navbar