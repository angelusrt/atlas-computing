import { capitalize, getLang, header } from "../../../utils/utils"
import { ReactNode} from "react"
import Link from "../../../components/Link/Link"
import data from "../../../data/data.json"
import "./About.css"

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

const About = async ({params}: {params: {lang: string}}) => {
  const dev = await getAbout()
  const lang = getLang(params.lang)

  return (
    <div className="about">
      <header><p>{data[lang].about}</p></header>
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
