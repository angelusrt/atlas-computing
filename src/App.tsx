import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { getThemePreference } from "./utils/utils"
import { IndexType, PageEnum, ThemeEnum } from "./utils/types"

import {Nav, NavButton} from "./components/Navbar/Navbar"

import "./App.css"
import Home from "./pages/Home/Home"
import Post from "./pages/Post/Post"
import About from "./pages/About/About"

const appName = ["App App-dark", "App App-light"]
const color = ["#171717", "#f6f6f6"]

function App() {
  const [isMobile] = useState(window.innerWidth < 725)
  const [language] = useState("pt-br")
  const [theme, setTheme] = useState<ThemeEnum>(getThemePreference())
  const [page, setPage] = useState<PageEnum>(PageEnum.Home)
  const [index, setIndex] = useState<IndexType[] | null>(null)

  useEffect(() => {document.body.style.background = color[theme]}, [theme])

  return (
    <Router>
      <div className={appName[theme]}>
        <Nav 
          theme={theme} 
          page={page} 
          setTheme={() => setTheme(theme ^ 1)}
          setPage={(page) => setPage(page)}
          setIndex={() => setIndex(null)}
        />
        <NavButton
          isMobile={isMobile}
          page={page}
          index={index}
          theme={theme}
          setPage={page => setPage(page)}
          setTheme={() => setTheme(theme ^ 1)}
          setIndex={() => setIndex(null)}
        />
        <Routes>
          <Route path="/" element={
            <Home 
              language={language} 
              setPage={() => setPage(PageEnum.Post)}
            />
          }/>
          <Route path="/post/:id" element={
            <Post
              language={language}
              index={index}
              setIndex={(index) => setIndex(index)}
            />
          }/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
