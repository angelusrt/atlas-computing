import Button from "./button"

function Navbar(){
  return(
    <div className="nav">
      <span className="left-side">
        <h1 className="header1">
          Recentes
        </h1>
        <Button type={false} name="Filtrar"/>
      </span>
      <span className="rigth-side"> 
          {/* <Button type={true} icon="Podcast" name="Podcast"/> */}
          <Button type={true} icon="Exclamation" name ="Sobre"/>
          <Button type={true} icon="GrandFont" name ="Aum. fonte"/>
          <Button type={true} icon="Sun" name ="Tema dark"/>
      </span>
    </div>
  )
}

export default Navbar