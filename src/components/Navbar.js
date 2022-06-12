import { useState } from "react"
import Button from "./Button"

function Navbar(props){
  const[isIndex, setIsIndex] = useState(false)
  const[isAuthor, setIsAuthor] = useState(false)

  const {path, isDT, setIsDT} = props
  
  return(
    !props.menu?
    <nav className={path === "/post"?"nav-post":null}>
      <span className="left-side">
        <Button 
          path="/" 
          pathCurrent={path}
          onFunc={props.setIsMenu}
        />
        {/* {
          path === "/" &&
          <Button mode="button" name="Filtrar"/>
        } */}
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
    </nav> :
    <nav className={path === "/post"?"nav-post":null}>
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
          props.path.substring(0, 5) === "/post" &&
          <>
            <Button 
              name="Índice"
              onFunc={() => {
                setIsIndex(!isIndex)
                setIsAuthor(false)
              }}
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
            <Button 
              name="Autor"
              onFunc={() => {
                setIsAuthor(!isAuthor)
                setIsIndex(false)
              }}
            />
            {
              props.author && isAuthor &&
              <section className="wrapper">
                <h2>
                  {props.author.authorName}
                </h2>
                <h3>
                  {props.author.authorDescription}
                </h3>
              </section>
            }
          </>
        }
      </span> 
    </nav>
  )
}

export default Navbar