import React from "react"

function Post(props) {
  const {post} = props
  return (
    <div className="post">
      <div className="wraper">
        <span>
          {post.tags.map((tag, key) =>   
            <a key={key} className="subheader1">{tag}</a>
          )}
        </span>
        <h2 className="header2">{post.title}</h2>
        {/* <div className="wraper">
          <h2 className="header2">{post.author}</h2>
          <h3 className="subheader2">{post.description}</h3>
        </div> */}
      </div>
      {
        post.body.section.map((section, key) => 
          <React.Fragment key={key}>
            <h2 
              className="header2" 
              id={section.id}
            >
              {section.header}
            </h2>
            <p className="body-text">
              {section.text}
            </p>
          </React.Fragment>
        )
      }
    </div>
  )
}

export default Post