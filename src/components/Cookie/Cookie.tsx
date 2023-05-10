"use client"

import { useEffect, useRef } from "react"
import { add } from "../../utils/utils"
import { Button } from "../Button/Button"
import "./Cookie.css"

type CookieType = {
  paragraph: string,
  button: string,
  isCookie: boolean,
  setIsCookie: () => void
}

const Cookie = (prop: CookieType) => {
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if(!prop.isCookie){
      add(ref, "--hide")
      setTimeout(() => add(ref, "--none"), 500)
    }
  }, [prop.isCookie])
  
  return (
    <div ref={ref} className="cookie">
      <p>{prop.paragraph}</p>
      <Button onClick={prop.setIsCookie}>
        <h3>{prop.button}</h3>
      </Button>
    </div>
  )
}

export {Cookie}