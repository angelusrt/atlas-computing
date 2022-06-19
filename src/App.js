import React, {useState, useEffect} from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Button from "./components/Button"
import PostCard from "./components/PostCard"
import Post from "./components/Post"
import About from "./components/About"
import './App.css'
import { CSSTransition } from "react-transition-group"

const _host = "192.168.0.115:3000"
const _header = {
  method: "GET",
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  Accept: '*/*',
  Host: _host,
}

function Menu(props) {
  return(
    <CSSTransition
      classNames="menu-anim"
      in={props.isMenu} 
      timeout={500}
      unmountOnExit
    >
      <header className="menu" onClick={(e) => {
        e.clientX > (0.65 * window.innerWidth + 6 + 40) &&
        props.setIsMenu()
      }}>
        <Navbar 
          menu={true}
          isDT={props.isDT} 
          path={props.path}
          index={props.index}
          setIsDT={() => props.setIsDT(!props.isDT)}
          setIsMenu={props.setIsMenu}
        />
      </header>
    </CSSTransition>
  )
}

function Home(props) {
  const[data, setData] = useState()
  const[resolved, setResolved] = useState(false)
  const[path] = useState(useLocation().pathname)

  const onGet = async () => {
    let lastDate
    return await fetch(`http://${props.host}/api/post`, props.header)
    .then(res => res.json())
    .then(data => {
      setData(data.sort((a,b) => 
      a.date - b.date).reverse().map((post, key) => {
        let dateContent

        if(lastDate !== post.date.slice(0,10)){
          dateContent = (
            <div>
              <h3>
                {
                  post.date.slice(8, 10) + " " + 
                  post.date.slice(5, 7) + " " +
                  post.date.slice(0, 4)
                }
              </h3>
              <hr/>
            </div>
          )
          lastDate = post.date.slice(0,10)
        }
        return (
          <React.Fragment key={key}>
            {dateContent}
            <PostCard 
              postPos={key}
              id={post._id}
              tags={post.tags} 
              title={post.title}
              setPostPos={props.setPostPos}
            />
          </React.Fragment>
        )
      }))
      props.setPostData(data)
      setResolved(true)
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {props.setPath(path)},[])
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
  const[path, setPath] = useState("/")
  //Mobile and Menu Vars
  const[isMenu, setIsMenu] = useState(false)
  const[index, setIndex] = useState()
  const[postData, setPostData] = useState([])
  const[postPos, setPostPos] = useState()

  useEffect(() => {
    document.body.style.background = isDT?"#171717":"#f6f6f6"
  },[isDT])

  useEffect(() => {
    if(isMenu){
      document.body.style.overflow = "hidden"
      document.body.style.height = "100%"
    } else {
      document.body.style.overflow = "auto"
      document.body.style.height = "auto"
    }
  },[isMenu])
  
  return (
    <Router>
      <div className={isDT?"App App-dark":"App"}>
        <Navbar 
          menu={false}
          isDT={isDT} 
          path={path}
          setIsDT={() => setIsDT(!isDT)}
        />
        <Button
          icon="Home"
          onFunc={() => setIsMenu(!isMenu)}
        />
        <Menu 
          isDT={isDT} 
          isMenu={isMenu}
          path={path}
          index={index}
          setIsDT={() => setIsDT(!isDT)}
          setIsMenu={() => setIsMenu(false)}
        />
        <Routes>
          <Route path="/" element={
            <Home 
              host={_host}
              header={_header} 
              setPath={path => setPath(path)} 
              setPostData={arr => setPostData(arr)}
              setPostPos={pos => setPostPos(pos)}
            />
          }/>
          <Route path="/about" element={
            <About 
              host={_host}
              header={_header}  
              setPath={path => setPath(path)}
            />
          }/>
          <Route path="/post/:id" element={
            <Post 
              host={_host}
              header={_header} 
              postData={postData} 
              postPos={postPos}
              setPath={path => setPath(path)}
              setIndex={index => setIndex(index)}
              // setPostData={arr => setPostData(arr)}
              setPostPos={pos => setPostPos(pos)}
            />
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
