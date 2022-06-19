import { useState } from "react"
import Button from "./Button"

function Navbar(props){
  const[isIndex, setIsIndex] = useState(false)

  const {path, isDT, setIsDT} = props
  
  return(
    !props.menu?
    <nav className={
      path.substring(0, 5) === "/post"?
      "nav-post": 
      path.substring(0, 6) === "/about"?
      "nav-about": "nav-home"
    }>
      <div className="nav-content">
        <span className="left-side">
          <Button 
            path="/" 
            pathCurrent={path}
            onFunc={props.setIsMenu}
          />
        </span>
        <span className="right-side right-side-navbar"> 
          <Button 
            path="/about"
            icon="Exclamation" 
            name ="Sobre"
          />
          <Button 
            icon={isDT?"Moon":"Sun"} 
            name={isDT?"Modo claro":"Modo escuro"}
            onFunc={setIsDT} 
          />
        </span>
      </div>
    </nav> :
    <nav>
      <span className="right-side">
        <Button 
          path="/" 
          pathCurrent={path}
          onFunc={props.setIsMenu}
        />
        <Button 
          path="/about"
          name="Sobre"
          onFunc={props.setIsMenu}
        />
        <Button 
          name={isDT?"Modo claro":"Modo escuro"}
          onFunc={() => {
            setIsDT()
            props.setIsMenu()
          }} 
        />
        {
          path.substring(0, 5) === "/post" &&
          <>
            <Button 
              name="Índice"
              onFunc={() => setIsIndex(!isIndex)}
            />
            {
              props.index && isIndex &&
              props.index.map((index, key) => 
                <Button
                  key={key}
                  name={index.title}
                  link={`#${index.title}${key}`}
                  onFunc={props.setIsMenu}
                />
              )
            }
          </>
        }
      </span> 
    </nav>
  )
}

export default Navbar