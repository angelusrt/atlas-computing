import Button from "./button"

function Navbar(){
  return(
    <div className="nav">
      <span>
        <h1 className="header1">
          Recentes
        </h1>
        <Button/>
      </span>
      <span> 
          <Button name="casa"/>
          <Button/>
          <Button/>
          <Button name ="modo escuro"/>
      </span>
    </div>
  )
}

export default Navbar