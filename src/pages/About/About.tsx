import { useEffect, useState } from "react"
import { capitalize, header, host } from "../../utils/utils"
import Link from "../../components/Link/Link"
import "./About.css"

function About() {
  const[about, setAbout] = useState<JSX.Element>()
  const[dev, setDev] = useState<JSX.Element[]>()

  const getAbout = async () => {
    return await fetch(`${host}/api/dev/`, header)
      .then(res => res.json())
      .then((data: {about: string, data: DevType[]}) => {
        setAbout(<header><p>{data.about}</p></header>)
        setDev(data.data.map((e, i) => <Dev key={i} {...e}/>))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {getAbout()},[])

  return (
    <div className="about">
      {about}
      {dev}
    </div>
  )
}

type DevType = {
  name: string,
  description: string,
  socials: {name: string, icon: string, link: string}[],
  email: string,
  telephone: string
}

const Dev = (prop: DevType) => {
  const {name, description, email, socials, telephone} = prop

  return (
    <section>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <div>
        {socials.map((e, i) => 
          <Link key={i} name={capitalize(e.name)} link={e.link}/>
        )}
        <Link key='email' name="Email" link={`mailto:${email}`}/>
        <Link key='phone' name="Telefone" link={`tel:${telephone.trim()}`}/>
      </div>
    </section> 
  )
} 

export default About