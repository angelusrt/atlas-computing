import {useState} from "react"
import Navbar from "./components/navbar"
import './App.css'

function App() {
  //Dark theme
  const[isDT, setDT] = useState(false);
  return (
    <div className={"App " + (isDT?"App-dark":"App-light")}>
      <Navbar isDT={isDT} setDT={() => setDT(!isDT)}/>
    </div>
  )
}

export default App
