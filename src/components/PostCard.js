import { Link } from "react-router-dom"

function PostCard(props) {
  return (
    <article className="wrapper" onClick={() => props.onFunc()}>
      <span>
        {props.tags.map((tag, key) =>   
          <a key={key}>{`#${tag}`}</a>
        )}
      </span>
      <Link to="/Post">
        <h2>{props.title}</h2>
      </Link>
    </article>
  )
}

export default PostCard