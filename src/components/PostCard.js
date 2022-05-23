function PostCard(props) {
  return (
    <div className="wraper">
      <span>
        {props.tags.map((tag, key) =>   
          <a key={key} className="subheader1">{tag}</a>
        )}
      </span>
      <h2 className="header2">{props.title}</h2>
    </div>
  )
}

export default PostCard