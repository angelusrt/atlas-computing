import React, {useState, useEffect, useRef} from "react"
import {compiler} from 'markdown-to-jsx'
import {CSSTransition} from "react-transition-group"
import {
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useLocation, 
  Outlet, 
  useOutletContext
} from "react-router-dom"
import Navbar from "./components/Navbar"
import Button from "./components/Button"
import PostCard from "./components/PostCard"
import './App.css'

const _host = "atlas-computing-359718.uc.r.appspot.com"
const _header = {
  method: "GET",
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  Accept: '*/*',
  Host: "atlas-computing-359718.uc.r.appspot.com",
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
  const[isPost, setIsPost] = useState(true)
  const[isExited, setIsExited] = useState(false)
  const[currentData, setCurrentData] = useState()
  const{host, header, lang, path, setPath} = props
  const location = useLocation().pathname
  let lastDate

  const onGet = async () => {
    return await fetch(`https://${host}/api/post/${lang}`, header)
    .then(res => res.json())
    .then(data => {
      setData( data.sort((a,b) => 
        (
          b.date.substring(0, 4) +
          b.date.substring(5, 7) +
          b.date.substring(8, 10) +
          b.date.substring(11, 13) +
          b.date.substring(14, 16) +
          b.date.substring(17, 19)
        ) - (
          a.date.substring(0, 4) +
          a.date.substring(5, 7) +
          a.date.substring(8, 10) +
          a.date.substring(11, 13) +
          a.date.substring(14, 16) +
          a.date.substring(17, 19)
        )
      ))
    }).catch(err => console.log(err))
  }

  useEffect(() => {onGet()},[])
  useEffect(() => {setIsPost(path==="/"?false:true)},[path])
  useEffect(() => {setPath(location)},[location])
  
  return(
    <div className="home">
      <CSSTransition
        classNames="main-anim"
        in={isPost}
        timeout={500} 
        onEntered={() => setIsExited(true)}
        onExited={() => setIsExited(false)}
      >
        <main>
          {
            data && 
            data != undefined &&
            data.map((post, key) => {
              let dateContent
      
              if(lastDate !== post.date.slice(0,10)){
                dateContent = (
                  <div className="non-active-post">
                    <h3>
                      {
                        new Date(post.date)
                        .toLocaleDateString('pt-br', {dateStyle:"medium"})
                      }
                    </h3>
                  </div>
                )
                lastDate = post.date.slice(0,10)
              }

              return (
                <React.Fragment key={key}>
                  {dateContent}
                  <PostCard 
                    isPost={isPost}
                    id={post._id}
                    tags={post.tags} 
                    title={post.title}
                    date={post.date}
                    setIsPost={() => setIsPost(!isPost)}
                    setCurrentData={() => setCurrentData(post)}
                  />
                </React.Fragment>
              )
            })
          }
        </main>
      </CSSTransition>
      <Outlet context={[currentData, isExited, setIsExited]}/>
    </div>
  )
}

function Post(props) {
  const[currentData, isExited, setIsExited] = useOutletContext()
  const[data, setData] = useState(
    currentData != undefined ? 
    {
      tags: currentData.tags,
      content: [{
        title: currentData.title
      }],
      date: currentData.date
    }: undefined
  )
  const[resolved, setResolved] = useState(false)
  const[markdown, setMarkdown] = useState()
  const location = useLocation().pathname
  const refIndex = useRef()
  const ref = useRef()
  const{
    host, header, lang, index, path, setIndex, setPath
  } = props
  
  const onGet = async () => {
    return await fetch(
      `https://${host}/api/post/${lang}/${location.substring(6)}`, 
      header
    )
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  }
  
  useEffect(() => {onGet()},[])
  useEffect(() => {setPath(location)},[location])
  useEffect(() => {
    window.scroll({top:0, behavior: "smooth"})
  },[path])
  useEffect(() => {
    if (
      currentData != undefined && isExited 
      && data.content[0].markdown != undefined
    ){
      setMarkdown(compiler(data.content[0].markdown))
    } else if(currentData === undefined && data != undefined) {
      setMarkdown(compiler(data.content[0].markdown))
      setIsExited(true)
    }
  },[isExited, data])
  useEffect(() => {
    if(ref.current && markdown)
      setIndex(
        [...ref.current.children[0].children]
        .filter(item => item.id !== "")
        .map(item => {return{id:item.id, content: item.textContent}})
      )
  },[ref.current, markdown])
  useEffect(() => {
    if(refIndex.current && markdown) setResolved(true)
  },[refIndex.current, markdown])

  return (
    <CSSTransition
      in={resolved && isExited}
      timeout={500} 
    >  
      {
        state =>
        <div className={`post post-anim-${state}`}>
          {
            data != undefined &&
            <header className="wrapper">
                <span>
                  {data.tags.map((tag, key) =>   
                    <a key={key}>{`#${tag}`}</a>
                  )}
                </span>
                <h1>{data.content[0].title}</h1>
                <h4>
                  {
                    new Date(data.date).toLocaleDateString('en-GB')
                  }
                </h4>
                {
                  data.content[0].markdown != undefined &&
                  <aside className="wrapper">
                    <h2>{data.authorName}</h2>
                    <h3>{data.authorDescription}</h3>
                  </aside>
                }
            </header>
          }
          {
            data != undefined && 
            data.content[0].markdown != undefined &&
            <main>
              <article>
                <div ref={ref}>
                  {markdown}
                </div>
              </article>
              <aside>
                <section>
                  <h3>Autor:</h3>
                  <h2>{data.authorName}</h2>
                  <h3>{data.authorDescription}</h3>
                </section>
                <section>
                  <h2>Índice</h2>
                  <div ref={refIndex}>
                    {
                      index &&
                      index.map((item, key) => 
                        <a 
                          key={key}
                          href={`#${item.id}`} 
                        >
                          {item.content}
                        </a>
                      )
                    }
                  </div>
                </section>
              </aside>
            </main>
          }
        </div>
      }
    </CSSTransition>
  )
}

function About(props) {
  const[data, setData] = useState()
  let path = useLocation().pathname

  const onGet = async () => {
    return await fetch(`https://${props.host}/api/dev/`, props.header)
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {props.setPath(path)},[])
  useEffect(() => {onGet()},[])

  return (
    <CSSTransition
      classNames="about-anim"
      in={data != undefined} 
      timeout={500} 
    >  
      <div className="about">
        {
          data &&
          <>
            <header><p>{data.about}</p></header>
            {
              data.dev.map((dev, key) =>
                <section key={key}>
                  <h2>{dev.authorName}</h2>
                  <h3>{dev.authorDescription}</h3>
                  <span>
                    {
                      dev.socials.map((social, key) => 
                        <Button 
                          key={key}
                          icon={social.iconName}
                          name={social.name}
                          link={social.link}
                        />
                      )
                    }
                  </span>
                  <h2>Email</h2>
                  <h3>{dev.email}</h3>
                  <h2>Telefone</h2>
                  <h3>{
                    `${dev.telephone.slice(0,3)} 
                    ${dev.telephone.slice(3,5)} 
                    ${dev.telephone.slice(5)}`
                  }</h3>
                </section>
              )
            }
          </>
        }
      </div>
    </CSSTransition>
  )
}

function App() {
  const[lang,setLang] = useState("pt")
  const[isDT, setIsDT] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches?true:false
  )
  const[path, setPath] = useState("/")
  const[isMenu, setIsMenu] = useState(false)
  const[index, setIndex] = useState()

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
              path={path}
              lang={lang}
              setPath={path => setPath(path)}
            />
          }>
            <Route path="/post/:id" element={
              <Post
                host={_host}
                header={_header} 
                path={path}
                lang={lang}
                index={index}
                setPath={path => setPath(path)}
                setIndex={index => setIndex(index)}

              />
            }/>
          </Route>
          <Route path="/about" element={
            <About 
              host={_host}
              header={_header} 
              setPath={path => setPath(path)} 
            />
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
