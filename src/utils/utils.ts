import { HTMLRef, PageEnum, ThemeEnum } from "./types"

const header: RequestInit = {
  method: "GET",
  keepalive: true,    
  referrer: "",
  referrerPolicy: "origin",   
}

function remove(ref: HTMLRef, mod: string) {
  ref.current.classList.remove(ref.current.classList[0] + mod)
}

function add(ref: HTMLRef, mod: string) {
  ref.current.classList.add(ref.current.classList[0] + mod)
}

function capitalize(text: string): string {
  return text[0].toUpperCase() + text.slice(1)
}

function getThemePreference(): ThemeEnum {
  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches

  if(prefersDarkTheme)
    return ThemeEnum.Dark
  else 
    return ThemeEnum.Light
}

function getEnumFromPath(pathname: string): PageEnum {
  if(pathname === "/")
    return PageEnum.Home
  else if(pathname.startsWith("/post"))
    return PageEnum.Post
  else if(pathname === "/about")
    return PageEnum.About
  else 
    return PageEnum.Home
}

function showModal(ref: HTMLRef, isHidden: boolean) {
  const overflow = ["auto", "hidden"]
  const height = ["auto", "100%"]
  
  if(isHidden)
    remove(ref, "--none")
  else 
    add(ref, "--none")
  
  document.body.style.overflow = overflow[+isHidden]
  document.body.style.height = height[+isHidden]   
}

export {
  header, remove, add, capitalize, getThemePreference, showModal, getEnumFromPath
}