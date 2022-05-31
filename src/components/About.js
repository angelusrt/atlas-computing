import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Button from "./Button"

function About(props) {
  const[data, setData] = useState()
  const[resolved, setResolved] = useState(false)
  
  const {setPath} = props
  
  setPath(useLocation().pathname)

  const onGet = async () => {
    return await fetch(`http://${props.host}/api/dev/`, props.header)
    .then(res => res.json())
    .then(data => {
      setData(data)
      setResolved(true)
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {onGet()},[])

  return (
    resolved &&
    <div className="about">
      <header>
        <h2 className="body-text1">{data.about}</h2>
      </header>
      {
        data.dev.map((dev, key) =>
          <section key={key}>
            <div className="wrapper">
              <h2 className="header2">{dev.authorName}</h2>
              <h3 className="subheader2">{dev.authorDescription}</h3>
            </div>
            <span className="socials">
              {
                dev.socials.map((social, key) => 
                  <Button 
                    mode="link-button"
                    isTextHidden={true}
                    key={key}
                    icon={social.iconName}
                    name={social.name}
                    link={social.link}
                  />
                )
              }
            </span>
            <h2 className="header4">Email</h2>
            <h3 className="subheader2">{dev.email}</h3>
            <h2 className="header4">Telefone</h2>
            <h3 className="subheader2">{
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