import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Button from "./Button"

function About(props) {
  const[data, setData] = useState()
  const[resolved, setResolved] = useState(false)
  const[path] = useState(useLocation().pathname)

  const onGet = async () => {
    return await fetch(`http://${props.host}/api/dev/`, props.header)
    .then(res => res.json())
    .then(data => {
      setData(data)
      setResolved(true)
    })
    .catch(err => console.log(err))
  }
  useEffect(() => {props.setPath(path)},[])
  useEffect(() => {onGet()},[])

  return (
    resolved &&
    <div className="about">
      <header><p>{data.about}</p></header>
      {
        data.dev.map((dev, key) =>
          <section key={key}>
            <div className="wrapper">
              <h2>{dev.authorName}</h2>
              <h3>{dev.authorDescription}</h3>
            </div>
            <span>
              {
                dev.socials.map((social, key) => 
                  <Button 
                    mode="link-button"
                    key={key}
                    icon={social.iconName}
                    name={social.name}
                    link={social.link}
                  />
                )
              }
            </span>
            <h2>Email</h2>
            <h3>{dev.email}</h3>
            <h2>Telefone</h2>
            <h3>{
              `${dev.telephone.slice(0,3)} 
              ${dev.telephone.slice(3,5)} 
              ${dev.telephone.slice(5)}`
            }</h3>
          </section>
        )
      }
    </div>
  )
}

export default About