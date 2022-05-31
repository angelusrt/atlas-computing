import { Link } from "react-router-dom"
import Button from "./button"

function Navbar(props){
  return(
    <div className={`nav ${props.path !== "/Post"?"nav1":"nav2"}`}>
      <span className="left-side">
        <Link to="/" className="button">
          <h1 className="header1">
            {props.path === "/Post"?"<ds>":"Recentes"}
          </h1>
        </Link>
        {
          props.path === "/" &&
          <Button type={false} name="Filtrar"/>
        }
      </span>
      <span className="rigth-side"> 
          {/* <Button type={true} icon="Podcast" name="Podcast"/> */}
          <Link to="/About">
            <Button 
              type={true} 
              icon="Exclamation" 
              name ="Sobre"
            />
          </Link>
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