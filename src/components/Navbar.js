import { useState } from "react"
import Button from "./Button"

function Navbar(props){
  const[isIndex, setIsIndex] = useState(false)
  const[isAuthor, setIsAuthor] = useState(false)

  const {path, isDT, setIsDT} = props
  
  return(
    !props.menu?
    <nav className={path === "/Post"?"nav-post":null}>
      <span className="left-side">
        <Button 
          mode="link2"
          path="/" 
          onFunc={props.setIsMenu}
        />
        {
          path === "/" &&
          <Button mode="button" name="Filtrar"/>
        }
      </span>
      <span className="right-side right-side-navbar"> 
        <Button 
          mode="link"
          path="/About"
          icon="Exclamation" 
          name ="Sobre"
        />
        <Button 
          mode="button"
          icon={isDT?"Moon":"Sun"} 
          name={isDT?"Modo claro":"Modo escuro"}
          onFunc={setIsDT} 
        />
      </span>
  </nav> :
  <nav className={path === "/Post"?"nav-post":null}>
    <span className="right-side">
      <Button 
        mode="link2"
        path="/" 
        onFunc={props.setIsMenu}
      />
      <Button 
        mode="link"
        path="/About"
        name="Sobre"
        onFunc={props.setIsMenu}
      />
      <Button 
        mode="button"
        name={isDT?"Modo claro":"Modo escuro"}
        onFunc={() => {
          setIsDT()
          props.setIsMenu()
        }} 
      />
      {
        props.path === "/Post" &&
        <>
          <Button 
            mode="button"
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
                mode="link-button-2"
                name={index.title}
                link={`#${index.title}${key}`}
                onFunc={props.setIsMenu}
              />
            )
          }
          <Button 
            mode="button"
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