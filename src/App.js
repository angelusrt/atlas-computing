import {useState, useEffect} from "react"
import Navbar from "./components/navbar"
import PostCard from "./components/PostCard"
import Posts from "./posts.json"
import './App.css'

function App() {
  //Dark theme
  const[isDT, setDT] = useState(false)

  useEffect(()=> {
    document.body.style.background = isDT?"#171717":"#f6f6f6"
  },[isDT])
  
  return (
    <div className={"App " + (isDT?"App-dark":"App-light")}>
      <Navbar isDT={isDT} setDT={() => setDT(!isDT)}/>
      {
        Posts.posts.map((post, key) =>
          <PostCard key={key} tags={post.tags} title={post.title}/>
        )
      }
    </div>
  )
}

export default App
