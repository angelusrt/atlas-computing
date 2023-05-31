"use client"

import { useEffect, useRef } from "react"
import { LangType } from "../../utils/types"
import { add, remove } from "../../utils/utils"
import { Button } from "../Button/Button"
import data from "../../data/data.json"
import "./Cookie.css"

const Cookie = ({lang}: {lang: LangType}) => {
  const ref = useRef<HTMLDivElement>(null!)

  function onClick() {
    localStorage.setItem('isCookie', JSON.stringify(true))
    
    add(ref, "--hide")
    setTimeout(() => add(ref, "--none"), 500)
  }
  
  useEffect(() => {
    const isCookie = localStorage.getItem('isCookie')

    if(isCookie != "true"){
      remove(ref, "--none")
      setTimeout(() => remove(ref, "--hide"), 500)
    }
  }, [])
  
  return (
    <div ref={ref} className="cookie cookie--hide cookie--none">
      <p>{data[lang].cookie}</p>
      <Button onClick={onClick}>
        <h3>{data[lang].cookieButton}</h3>
      </Button>
    </div>
  )
}

export {Cookie}
