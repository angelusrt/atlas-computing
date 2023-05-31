"use client"

import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState} from "react"
import { Cookie } from "../../components/Cookie/Cookie"
import { Nav, NavButton } from "../../components/Navbar/Navbar"
import { ThemeEnum } from "../../utils/types"
import { getLang, getThemePreference } from "../../utils/utils"
import "./globals.css"

const appName = ["App App-dark", "App App-light"]
const color = ["#171717", "#f6f6f6"]

function RootLayout({children, params}: {children: ReactNode, params: {lang: string}}){
  const [isMobile, setIsMobile] = useState(false)
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.Light)
  const [isCookie, setIsCookie] = useState(true)
  const router = useRouter()

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

        <link rel="apple-touch-icon" href="AtlasComputing.png" />
        <link rel="icon" href="favicon.ico" />
        <link rel="manifest" href="manifest.json" />

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://blog.atlascomputing.com.br/"/>
        <meta property="og:site_name" content="AtlasComputing"/>
        <meta property="og:title" content="AtlasComputing - Blog de programação"/>
        <meta property="og:description" content="Explore artigos referente a desenvolvimento com react e javascript."/>
        <meta property="og:image" content="https://storage.googleapis.com/atlascomputing-images/AtlasComputingScreenshot.png"/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://blog.atlascomputing.com.br/"/>
        <meta property="twitter:title" content="AtlasComputing - Blog de programação"/>
        <meta property="twitter:description" content="Explore artigos referente a desenvolvimento com react e javascript."/>
        <meta property="twitter:image" content="https://storage.googleapis.com/atlascomputing-images/AtlasComputingScreenshot.png"/>
      </head>
      <body className={appName[theme]}> 
        <Nav lang={getLang(params.lang)} theme={theme} setTheme={onTheme}/>
        <NavButton 
					lang={getLang(params.lang)} 
					isMobile={isMobile} 
					theme={theme} 
          router={router}
					setTheme={onTheme}
        />
        <Cookie
          paragraph="Nós usamos cookies para melhorar sua experiência. 
            Usamos para salvar as postagens em armazenamento local, é temporário." 
          button="Aceitar"
          isCookie={isCookie}
          setIsCookie={() => setIsCookie(false)}
        />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
