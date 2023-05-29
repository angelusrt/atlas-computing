import { capitalize, header } from "../../utils/utils"
import Link from "../../components/Link/Link"
import "./About.css"
import { ReactNode, useContext } from "react"
import { langDic } from "../../utils/types"
import { langContext } from "../layout"

type DevType = {
  name: string,
  description: string,
  socials: {name: string, link: string}[],
  email: string,
  telephone: string
}

const getAbout = async () => {
  let about: ReactNode[] = ['']

  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/dev/`, header)
    .then(res => res.json())
    .then((data: {about: string, data: DevType[]}) => {
      about = data.data.map((e, i) => <Dev key={i} {...e}/>)
    }).catch(err => console.log(err))

  return about
}

const about: [string, string, string] = [
  `O blog do Atlas Computing trata de assuntos como programação, design, tecnologia e afins. 
  Ele foi criado com o intuito de se desafiar a aprender diversos aspectos da tecnologia 
  assim como imagem e escrita. Tem como contribuintes, além de outros:`,
  `Atlas Computing blog deals with subjects like programming, design, technology and alike.
  It was created with the intent of challenging myself to learn the various aspects of technology
  as well as image and writing. It has as contributors, not limited to, but including:`,
  `Atlas Computing blog handelt mit theme wie programming, design, technologie und so weite.
  Es war bildet mit der wünsche auf herausforderung meinselbst zu lernen die viele gesichte auf 
  technologie sowie bild und schreibung. Es hat wie verfasserer, besonders:`
]

const About = async () => {
  const dev = await getAbout()

  const lang = useContext(langContext)

  return (
    <div className="about">
      <header><p>{about[lang]}</p></header>,
      {dev}
    </div>
  )
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
