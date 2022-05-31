import { useLocation } from "react-router-dom"
import React from "react"

function Post(props) {
  const {post, setPath} = props

  setPath(useLocation().pathname)

  return (
    <div className="post">
      <div className="wrapper wrapper2">
        <span>
          {post.tags.map((tag, key) =>   
            <a key={key} className="subheader1">{tag}</a>
          )}
        </span>
        <h2 className="header2">{post.title}</h2>
        <div className="wrapper wrapper3">
          <h2 className="header2">{post.author}</h2>
          <h3 className="subheader2">{post.description}</h3>
        </div>
      </div>
      <div className="body-wrapper">
        <section>
          {
            post.body.section.map((section, key) => 
              <React.Fragment key={key}>
                <h2 
                  className="header2" 
                  id={`${section.header}${key}`}
                >
                  {section.header}
                </h2>
                {
                  section.type === "normal"?
                  <p className={"body-text1"}>
                    {section.text}
                  </p> :
                  section.type === "code"?
                  <p className={"code-text code-text-normal"}>
                    {section.text}
                  </p> :
                  <div className="link-text-wrapper">
                    {
                      section.text.map((text, key) =>
                        <a key={key} href={text} className="link-text">
                          {text}
                        </a>
                      )
                    }
                  </div>
                }
              </React.Fragment>
            )
          }
        </section>
        <aside>
          <h2 className="header3">Índice</h2>
          {
            post.body.section.map((section,key) => 
              <a 
                key={key}
                href={`#${section.header}${key}`} 
                className="index-text"
              >
                {section.header}
              </a>
            )
          }
        </aside>
      </div>
    </div>
  )
}

export default Post