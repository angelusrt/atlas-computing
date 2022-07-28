import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function PostCard(props) {
  const[active, setActive] = useState(false)

  useEffect(() => {if(!props.isPost) setActive(false)},[props.isPost])

  return (
    <article className={
      active && props.isPost?
      "wrapper active-post":"wrapper non-active-post"
    }>
      <span>
        {props.tags.map((tag, key) =>   
          <a key={key}>{`#${tag}`}</a>
        )}
      </span>
      <Link 
        to={`/post/${props.id}`} 
        onClick={() => {
          setActive(true)
          props.setPos(props.pos)
          props.setIsPost()
        }}
      > 
        <h2>{props.title}</h2>
      </Link>
      <h4>
        {
          props.date.slice(8, 10) + " " + 
          props.date.slice(5, 7) + " " +
          props.date.slice(0, 4)
        }
      </h4>
    </article>
  )
}

export default PostCard