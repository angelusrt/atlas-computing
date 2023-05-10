"use client"

import { useEffect, useRef, useState } from "react"
import { add } from "../../utils/utils"
import { Button } from "../Button/Button"
import "./Cookie.css"

type CookieType = {
  paragraph: string,
  button: string
}

const Cookie = (prop: CookieType) => {
  const [isToggle, setIsToggle] = useState(true)

  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if(!isToggle){
      add(ref, "--hide")
      setTimeout(() => add(ref, "--none"), 500)
    }
  }, [isToggle])
  
  return (
    <div ref={ref} className="cookie">
      <p>{prop.paragraph}</p>
      <Button onClick={() => setIsToggle(false)}>
        <h3>{prop.button}</h3>
      </Button>
    </div>
  )
}

export {Cookie}