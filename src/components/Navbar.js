import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "./Button"

function Navbar(props){
  const[isIndex, setIsIndex] = useState(false)
  const[isAuthor, setIsAuthor] = useState(false)

  const {path, isDT, setIsDT} = props
  
  return(
    !props.menu?
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
        <Button 
          mode="link"
          path="/About"
          isTextHidden={true} 
          icon="Exclamation" 
          name ="Sobre"
        />
        <Button 
          mode="button"
          isTextHidden={true} 
          icon={isDT?"Moon":"Sun"} 
          name={isDT?"Modo claro":"Modo escuro"}
          onFunc={setIsDT} 
        />
      </span>
  </nav> :
  <nav className={`${path === "/Post"&&"nav-post"}`}>
    <span className="right-side">
      <Link 
        to="/" 
        className="button header1" 
        onClick={props.setIsMenu}
      >
        { 
          path === "/Post"?"<ds>":
          path === "/About"?"Sobre":
          "Recentes"
        }
      </Link>
      <Button 
        mode="link"
        path="/About"
        isTextHidden={true} 
        icon="Exclamation" 
        name ="Sobre"
        onFunc={props.setIsMenu}
      />
      <Button 
        mode="button"
        isTextHidden={true} 
        icon={isDT?"Moon":"Sun"} 
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
            isTextHidden={true} 
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
            isTextHidden={true} 
            name="Autor"
            onFunc={() => {
              setIsAuthor(!isAuthor)
              setIsIndex(false)
            }}
          />
          {
            props.author && isAuthor &&
            <section className="wrapper">
              <h2 className="header2">
                {props.author.authorName}
              </h2>
              <h3 className="subheader2">
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