import {useState, useEffect} from "react"
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import Navbar from "./components/navbar"
import PostCard from "./components/PostCard"
import Post from "./components/Post"
import About from "./components/About"
import Data from "./data.json"
import './App.css'

function Home(props) {
  props.setPath(useLocation().pathname)
  return(
    <>
      {
        props.data.posts.map((post, key) =>
          <Link to="/Post" key={key}>
            <PostCard 
              tags={post.tags} 
              title={post.title}
              onFunc={() => props.setPost(post)}
            />
          </Link>
        )
      }
    </>
  )
}
function App() {
  //Dark theme
  const[isDT, setIsDT] = useState(false)
  const[post, setPost] = useState({})
  const[path, setPath] = useState("/")

  useEffect(() => {
    document.body.style.background = isDT?"#171717":"#f6f6f6"
  },[isDT])

  return (
    <Router>
      <div className={"App " + (isDT?"App-dark":"App-light")}>
        <Navbar 
          isDT={isDT} 
          path={path}
          setIsDT={() => setIsDT(!isDT)}
        />
        <Routes>
          <Route path="/" element={
            <Home data={Data} setPath={(path) => setPath(path)} setPost={(post) => setPost(post)}/>
          }/>
          <Route path="/About" element={
            <About about={Data.about} setPath={(path) => setPath(path)}/>
          }/>
          <Route path="/Post" element={
            <Post post={post} setPath={(path) => setPath(path)}/>
          }/>
        </Routes>
        {/* {
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
        } */}
      </div>
    </Router>
  )
}

export default App
