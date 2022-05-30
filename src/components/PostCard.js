function PostCard(props) {
  return (
    <div className="wrapper wrapper1" onClick={() => props.onFunc()}>
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