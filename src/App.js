import {useState, useEffect} from "react"
import Navbar from "./components/navbar"
import PostCard from "./components/PostCard"
import Post from "./components/Post"
import About from "./components/About"
import Data from "./data.json"
import './App.css'

function App() {
  //Dark theme
  const[isDT, setIsDT] = useState(false)

  const[whatPage, setWhatPage] = useState("")
  const[post, setPost] = useState({})

  useEffect(()=> {
    document.body.style.background = isDT?"#171717":"#f6f6f6"
  },[isDT])

  return (
    <div className={"App " + (isDT?"App-dark":"App-light")}>
      <Navbar 
        isDT={isDT} 
        whatPage={whatPage}
        setIsDT={() => setIsDT(!isDT)}
        setWhatPage={() => setWhatPage("about")}
        onFunc={() => setWhatPage("home")}
      />
      {
        whatPage==="post"?
        <Post post={post}/> :
        whatPage==="about"?
        <About about={Data.about}/> :
        Data.posts.map((post, key) =>
          <PostCard 
            key={key} 
            tags={post.tags} 
            title={post.title}
            onFunc={() => {
              setWhatPage("post")
              setPost(post)
            }}
          />
        )
      }
    </div>
  )
}

export default App
