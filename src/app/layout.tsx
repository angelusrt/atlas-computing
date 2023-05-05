"use client"

import { useEffect, useState } from "react"
import { Nav, NavButton } from "../components/Navbar/Navbar"
import { ThemeEnum } from "../utils/types"
import { getThemePreference } from "../utils/utils"
import "./globals.css"

const appName = ["App App-dark", "App App-light"]
const color = ["#171717", "#f6f6f6"]

function RootLayout({children}: {children: React.ReactNode}){
  const [isMobile, setIsMobile] = useState(false)
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.Light)

  const onTheme = () => setTheme(theme ^ 1)

  useEffect(() => {
    setIsMobile(window.innerWidth < 725)
    setTheme(getThemePreference())
  }, [])
  useEffect(() => {document.body.style.background = color[theme]}, [theme])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <title>AtlasComputing - Blog de programação</title>
        <meta name="title" content="AtlasComputing - Blog de programação"/>
        <meta 
          name="description" 
          content="Explore artigos referente a desenvolvimento com react e javascript."
        />

        <link rel="icon" href="favicon.ico" />
        <link rel="apple-touch-icon" href="AtlasComputing.png" />
        <link rel="manifest" href="manifest.json" />

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://atlas-computing.vercel.app/"/>
        <meta property="og:site_name" content="AtlasComputing"/>
        <meta property="og:title" content="AtlasComputing - Blog de programação"/>
        <meta property="og:description" content="Explore artigos referente a desenvolvimento com react e javascript."/>
        <meta property="og:image" content="https://storage.googleapis.com/atlascomputing-images/AtlasComputingScreenshot.png"/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://atlas-computing.vercel.app/"/>
        <meta property="twitter:title" content="AtlasComputing - Blog de programação"/>
        <meta property="twitter:description" content="Explore artigos referente a desenvolvimento com react e javascript."/>
        <meta property="twitter:image" content="https://storage.googleapis.com/atlascomputing-images/AtlasComputingScreenshot.png"/>
      </head>
      <body className={appName[theme]}> 
        <Nav theme={theme} setTheme={onTheme}/>
        <NavButton isMobile={isMobile} theme={theme} setTheme={onTheme}/>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
// export {IndexContext}