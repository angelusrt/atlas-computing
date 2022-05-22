import Button from "./button"

function Navbar(){
  return(
    <div className="nav">
      <span>
        <h1 className="header1">
          Recentes
        </h1>
        <Button name="Filtrar"/>
      </span>
      <span> 
          <Button icon="Podcast" name="Podcast"/>
          <Button icon="Exclamation" name ="Sobre"/>
          <Button icon="GrandFont" name ="Aumentar fonte"/>
          <Button icon="Sun" name ="Modo escuro"/>
      </span>
    </div>
  )
}

export default Navbar