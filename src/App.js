import {useState, useEffect} from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import PostCard from "./components/PostCard"
import Post from "./components/Post"
import About from "./components/About"
import './App.css'

const _host = "192.168.0.115:3000"
const _header = {
  method: "GET",
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  Accept: '*/*',
  Host: _host,
}

function Home(props) {
  const[data, setData] = useState()
  const[resolved, setResolved] = useState(false)

  props.setPath(useLocation().pathname)

  const onGet = async () => {
    return await fetch(`http://${props.host}/api/post`, props.header)
    .then(res => res.json())
    .then(data => {
      setData(data.map((post, key) => (
        <PostCard 
          key={key}
          tags={post.tags} 
          title={post.title}
          onFunc={() => props.setPost(post._id)}
        />
      )))
      setResolved(true)
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {onGet()},[])

  return(
    resolved &&
    <div className="home">
      <main>{data}</main>
    </div>
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
            <Home 
              host={_host}
              header={_header} 
              setPath={(path) => setPath(path)} 
              setPost={(post) => setPost(post)}
            />
          }/>
          <Route path="/About" element={
            <About 
              host={_host}
              header={_header}  
              setPath={(path) => setPath(path)}/>
          }/>
          <Route path="/Post" element={
            <Post 
              host={_host}
              header={_header}  
              post={post} 
              setPath={(path) => setPath(path)}/>
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
