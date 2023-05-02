import { useEffect, useRef, useState } from "react"
import { IndexType, PageEnum, ThemeEnum } from "../../utils/types"
import { scrollToTop, add, remove } from "../../utils/utils"
import { Button, ButtonLink } from "../Button/Button"
import Link from "../Link/Link"
import "./Navbar.css"

type NavType = {
  page: PageEnum,
  theme: ThemeEnum,
  setTheme: () => void,
  setPage: (page: PageEnum) => void,
  setIndex: () => void
}

const name = ["nav-home","nav-post", "nav-about"]
const title = ["Recentes", "AtCom", "Sobre"]
const themeIcon = ["Sun", "Moon"]
const themeText = ["Modo Claro", "Modo Escuro"]

function Nav(prop: NavType){
  const { page, theme, setTheme, setPage, setIndex } = prop
  const { Home, About } = PageEnum

  function changePage(page: PageEnum) {
    scrollToTop()
    setIndex()
    setPage(page)
  }
  
  return(
    <nav className={name[page]}>
      <span className="left-side">
        <ButtonLink to="/" onClick={() => changePage(Home)}>
          <h1>{title[page]}</h1>
        </ButtonLink>
      </span>
      <span className="right-side"> 
        <ButtonLink 
          icon="Exclamation" to="/about" onClick={() => changePage(About)}
        >
          <h3>Sobre</h3>
        </ButtonLink>
        <Button icon={themeIcon[theme]} onClick={setTheme}>
          <h3>{themeText[theme]}</h3>
        </Button>
      </span>
    </nav> 
  )
}

type NavButtonType = NavType & {index: IndexType[] | null, isMobile: boolean}

const NavButton = (prop: NavButtonType) => {
  const { page, theme, index, isMobile, setTheme, setPage, setIndex } = prop
  const { Home, About } = PageEnum

  const [isToggle, setToggle] = useState(false)
  const [time , setTime] = useState<NodeJS.Timeout>()
  
  const buttonRef = useRef<HTMLButtonElement>(null!)
  const dropdownRef = useRef<HTMLDivElement>(null!)

  function getFunc() {
    if(isMobile)
      return { 
        onClick: () => setToggle(s => !s),
        onMouseLeave: () => setToggle(false)
      }
    else
      return { 
        onMouseEnter: () => setToggle(true),
        onMouseLeave: () => setToggle(false)
      } 
  }

  function changePage(page: PageEnum) {
    scrollToTop()
    setIndex()
    setPage(page)
  }

  useEffect(() => {
    if(time) clearTimeout(time)

    if(isToggle){
      add(buttonRef, "--hover")

      remove(dropdownRef, "--none")
      setTime(setTimeout(() => add(dropdownRef, "--show"), 10))
    }
    else{
      remove(buttonRef, "--hover")

      remove(dropdownRef, "--show")
      setTime(setTimeout(() => add(dropdownRef, "--none"), 500))
    }
  }, [isToggle])

  return (
    <Button 
      buttonRef={buttonRef}
      name="nav-button" 
      icon="Home" 
      func={getFunc()}
    >
      <div ref={dropdownRef} className="nav-dropdown">
        {
          page != Home &&
          <ButtonLink to="/" onClick={() => changePage(Home)}>
            <h3>Home</h3>
          </ButtonLink>
        }
        {
          page !== About &&
          <ButtonLink to="/About" onClick={() => changePage(About)}>
            <h3>Sobre</h3>
          </ButtonLink>
        }
        <Button onClick={setTheme}>
          <h3>{themeText[theme]}</h3>
        </Button>
        {index && index.map((e, i) => 
          <Link 
            isSelf
            key={i} 
            name={e.text} 
            link={`#${e.id}`} 
          />
        )}
      </div> 
    </Button>
  )
}

export { Nav, NavButton }