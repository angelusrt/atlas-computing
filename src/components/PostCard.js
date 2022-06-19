import { Link } from "react-router-dom"

function PostCard(props) {
  return (
    <article className="wrapper">
      <span>
        {props.tags.map((tag, key) =>   
          <a key={key}>{`#${tag}`}</a>
        )}
      </span>
      <Link 
        to={`/post/${props.id}`} 
        onClick={() => props.setPostPos(props.postPos)}
      > 
        <h2>{props.title}</h2>
      </Link>
    </article>
  )
}

export default PostCard