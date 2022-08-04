import React, {useState, useEffect, useRef} from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm"
import {CSSTransition} from "react-transition-group"
import {
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useLocation, 
  Outlet, 
  Link, 
  useOutletContext
} from "react-router-dom"
import Navbar from "./components/Navbar"
import Button from "./components/Button"
import PostCard from "./components/PostCard"
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
  const[resolved, setResolved] = useState(false)
  const[isPost, setIsPost] = useState(true)
  const[data, setData] = useState()
  const[pos, setPos] = useState()

  const ref = useRef()
  const location = useLocation().pathname
  const{host, header, path, lang, setPath} = props
  let lastDate

  const onGet = async () => {
    return await fetch(`http://${host}/api/post/${lang}`, header)
    .then(res => res.json())
    .then(data => {
      setResolved(false)
      setData(data)
      setResolved(true)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {setPath(location)},[location])
  useEffect(() => {setIsPost(path==="/"?false:true)},[path])
  useEffect(() => {onGet()},[])

  return(
    <div className="home">
      <CSSTransition
        classNames="main-anim"
        in={isPost} 
        timeout={500} 
      >
        <main ref={ref}>
          {
            resolved && 
            data !== null && 
            data !== undefined &&
            data.sort(
              (a,b) => 
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
            ).map((post, key) => {
              let dateContent
      
              if(lastDate !== post.date.slice(0,10)){
                dateContent = (
                  <div className="non-active-post">
                    <h3>
                      {
                        new Date(post.date).toLocaleDateString('en-GB')
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
                    pos={pos}
                    isPost={isPost}
                    activeClass={
                      ref.current !== undefined?
                      ref.current.className:""
                    }
                    id={post._id}
                    tags={post.tags} 
                    title={post.title}
                    date={post.date}
                    setPos={pos => setPos(pos)}
                    setIsPost={() => setIsPost(!isPost)}
                  />
                </React.Fragment>
              )
            })
          }
        </main>
      </CSSTransition>
      <Outlet context={[{postData:data}, pos, setPos]}/>
    </div>
  )
}

function Post(props) {
  const[data, setData] = useState()
  const[resolved, setResolved] = useState(false)
  const[indexList, setIndexList] = useState()
  const[postData, pos, setPos] = useOutletContext()

  const location = useLocation().pathname
  const ref = useRef()
  const{host, header, path, lang, setPath, setIndex} = props
  
  const onGet = async () => {
    return await fetch(
      `http://${host}/api/post/${lang}/${location.substring(6)}`, 
      header
    )
    .then(res => res.json())
    .then(data => {
      setResolved(false)
      setData(data)
      setResolved(true)
      setIndex(data.content[0].markdown)
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {setPath(location)},[location])
  useEffect(() => {onGet()},[path])
  useEffect(() => {window.scroll({top:0, behavior: "smooth"})},[location])
  useEffect(() => {
    if(ref.current){
      console.log(ref.current.children)
      setIndexList(
        [...ref.current.children]
        .filter(item => item.id !== "")
        .map((item, key) => 
          <a 
            key={key}
            href={`#${item.id}`} 
          >
            {item.id}
          </a>
        )
      )
    }
  },[ref.current])

  return (
    <CSSTransition
      classNames="post-anim"
      in={resolved} 
      timeout={500} 
    >  
      <div className="post">
        {
          resolved &&
          <>
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
              <aside className="wrapper">
                <h2>{data.authorName}</h2>
                <h3>{data.authorDescription}</h3>
              </aside>
            </header>
            <main>
              <article ref={ref}>
                {
                  pos !== 0 && 
                  postData[pos - 1] !== undefined &&
                  <section className="post-link-section last-post-link-section">
                    <h3>Artigo anterior:</h3>
                    <Link 
                      to={`/post/${postData[pos - 1]._id}`}
                      onClick={() => setPos(pos - 1)}
                    >
                      <h2>{postData[pos - 1].title}</h2>
                    </Link>
                  </section>
                }
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  components={{
                    h2: ({node, ...props}) => 
                      <h2 id={props.children} {...props}/>
                  }}
                >
                  {data.content[0].markdown}
                </ReactMarkdown>
                {
                  postData[pos + 1] !== undefined && 
                  pos !== postData.length - 1 &&
                  <section className="post-link-section">
                    <h3>Artigo posterior:</h3>
                    <Link 
                      to={`/post/${postData[pos + 1]._id}`}
                      onClick={() => setPos(pos + 1)}
                    >
                      <h2>{postData[pos + 1].title}</h2>
                    </Link>
                  </section>
                }
              </article>
              <aside>
                <section>
                  <h3>Autor:</h3>
                  <h2>{data.authorName}</h2>
                  <h3>{data.authorDescription}</h3>
                </section>
                {
                  pos !== 0 && 
                  postData[pos - 1] !== undefined &&
                  <section className="post-link-section">
                    <h3>Artigo anterior:</h3>
                    <Link 
                      to={`/post/${postData[pos - 1]._id}`}
                      onClick={() => setPos(pos - 1)}
                    >
                      <h2>{postData[pos - 1].title}</h2>
                    </Link>
                  </section>
                }
                <section>
                  <h2>Índice</h2>
                  {indexList}
                </section>
              </aside>
            </main>
          </>
        }
      </div>
    </CSSTransition>
  )
}

function About(props) {
  const[data, setData] = useState()
  const[resolved, setResolved] = useState(false)
  const[path] = useState(useLocation().pathname)

  const onGet = async () => {
    return await fetch(`http://${props.host}/api/dev/`, props.header)
    .then(res => res.json())
    .then(data => {
      setData(data)
      setResolved(true)
    })
    .catch(err => console.log(err))
  }
  useEffect(() => {props.setPath(path)},[])
  useEffect(() => {onGet()},[])

  return (
    <CSSTransition
      classNames="about-anim"
      in={resolved} 
      timeout={500} 
    >  
      <div className="about">
        {
          resolved &&
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
  //Default language 
  const[lang,setLang] = useState("pt")

  //Dark theme
  const[isDT, setIsDT] = useState(false)
  const[path, setPath] = useState("/")
  //Mobile and Menu Vars
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
              setIndex={index => setIndex(index)}
            />
          }>
            <Route path="/post/:id" element={
              <Post
                host={_host}
                header={_header} 
                path={path}
                lang={lang}
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
