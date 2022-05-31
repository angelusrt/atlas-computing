import React from "react"
import { useLocation } from "react-router-dom"
import Button from "./Button"

function About(props) {
  const {about, setPath} = props

  setPath(useLocation().pathname)

  return (
    <div className="about">
      <h2 className="body-text1">{about.text}</h2>
      {
        about.dev.map((dev, key) =>
          <React.Fragment key={key}>
            <div className="wrapper wrapper4">
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
          </React.Fragment>
        )
      }
    </div>
  )
}

export default About