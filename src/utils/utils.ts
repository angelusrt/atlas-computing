import { HTMLRef, ThemeEnum } from "./types"

const host = process.env.REACT_APP_HOST
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

function scrollToTop() {
  window.scroll({top:0, behavior: "smooth"})
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
  host, header, 
  remove, add, scrollToTop, capitalize, getThemePreference, showModal
}