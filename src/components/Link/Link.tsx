import "./Link.css"

type LinkType = {
  isSelf?: boolean,
  name: string,
  link: string,
  onClick?: () => void
}

const Link = (prop: LinkType) => {
  const {isSelf, link, name, onClick} = prop
  
  return (
    <a 
      className="link"
      referrerPolicy='no-referrer' 
      rel='noreferrer'
      href={link}
      target={isSelf ? "_self" : "_blank"}
      onClick={onClick}
    >
      <h3>{name}</h3>
    </a> 
  )
}

export default Link