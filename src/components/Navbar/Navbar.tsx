"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { ThemeEnum } from "../../utils/types"
import { add, getEnumFromPath, remove } from "../../utils/utils"
import { Button, ButtonBlock, ButtonLink } from "../Button/Button"
import Link from "../Link/Link"
import Icon from "../Icon"
import data from "../../data/data.json"
import "./Navbar.css"

type NavType = {
  language: "pt-br" | "en-us",
  theme: ThemeEnum,
  setTheme: () => void,
}

const themeIcon = ["Sun", "Moon"]

function Nav({ language, theme, setTheme }: NavType){
  const path = getEnumFromPath(usePathname())
  
  return(
    <nav>
      <span className="left-side">
        <ButtonLink to="/">
          <h1>{data[language].titles[path]}</h1>
        </ButtonLink>
      </span>
      <span className="right-side"> 
        <ButtonLink to="/about">
          <Icon name="Exclamation"/>
          <h3>{data[language].titles[2]}</h3>
        </ButtonLink>
        <Button icon={themeIcon[theme]} onClick={setTheme}>
          <h3>{data[language].themes[theme]}</h3>
        </Button>
      </span>
    </nav> 
  )
}

type NavButtonType = NavType & {isMobile: boolean}

const NavButton = ({ language, theme, isMobile, setTheme }: NavButtonType) => {
  const [isToggle, setToggle] = useState(false)
  const [time , setTime] = useState<NodeJS.Timeout>()
  const [index, setIndex] = useState<{href: string, text: string}[]>()
  
  const pathname = usePathname()

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

  useEffect(() => {
    if(pathname.startsWith("/post")){
      const wrapper = document.getElementById("index-wrapper")
      const items = []
      if(wrapper && wrapper.children){
        for (let i = 0; i < wrapper.children.length; i++)
          items.push({
            href: wrapper.children[i].getAttribute("href") || "",
            text: wrapper.children[i].children[0].innerHTML
          })
          
        setIndex(items)
      } 
    }
  },[pathname])

  useEffect(() => {
    if(time) clearTimeout(time)

    if(isToggle){
      remove(dropdownRef, "--none")
      add(buttonRef, "--hover")
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
      <div ref={dropdownRef} className="nav-dropdown nav-dropdown--none">
        {
          pathname !== "/" &&
          <ButtonLink to="/">
            <h3>Home</h3>
          </ButtonLink>
        }
        {
          pathname !== "/about" &&
          <ButtonLink to="/about">
            <h3>{data[language].titles[2]}</h3>
          </ButtonLink>
        }
        <ButtonBlock onClick={setTheme}>
          <h3>{data[language].themes[theme]}</h3>
        </ButtonBlock>
        {pathname.startsWith("/post") && index && index.map((e, i) => 
          <Link isSelf key={i} name={e.text} link={e.href}/>
        )}
      </div> 
    </Button>
  )
}

export { Nav, NavButton }