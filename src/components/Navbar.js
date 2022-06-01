import { Link } from "react-router-dom"
import Button from "./Button"

function Navbar(props){
  const {path, isDT, setIsDT} = props
  
  return(
    <nav className={`${path === "/Post"&&"nav-post"}`}>
      <span className="left-side">
        <Link to="/" className="button header1">
          { 
            path === "/Post"?"<ds>":
            path === "/About"?"Sobre":
            "Recentes"
          }
        </Link>
        {
          path === "/" &&
          <Button mode="button" name="Filtrar"/>
        }
      </span>
      <span className="right-side"> 
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
            icon={isDT?"Moon":"Sun"} 
            name={isDT?"Modo claro":"Modo escuro"}
            onFunc={setIsDT} 
          />
      </span>
    </nav>
  )
}

export default Navbar