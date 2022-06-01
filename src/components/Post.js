import { useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"

function Post(props) {
  const[data, setData] = useState()
  const[resolved, setResolved] = useState(false)
  const[path] = useState(useLocation().pathname)
  const {post} = props
  
  const onGet = async () => {
    return await fetch(`http://${props.host}/api/post/${post}`, props.header)
    .then(res => res.json())
    .then(data => {
      setData(data)
      setResolved(true)
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {props.setPath(path)},[])
  useEffect(() => {onGet()},[])

  return (
    resolved && 
    <div className="post">
      <header className="wrapper">
        <span>
          {data.tags.map((tag, key) =>   
            <a key={key} className="subheader1">{tag}</a>
          )}
        </span>
        <h2 className="header2">{data.title}</h2>
        <aside className="wrapper">
          <h2 className="header2">{data.authorName}</h2>
          <h3 className="subheader2">{data.authorDescription}</h3>
        </aside>
      </header>
      <main>
        <article>
          {
            data.body.section.map((section, key) => 
              <section key={key}>
                <h2 
                  className="header2" 
                  id={`${section.title}${key}`}
                >
                  {section.title}
                </h2>
                {
                  section.paragraphs.map((p, key) => 
                    p.mode === "normal"?
                    <p key={key} className={"body-text1"}>
                      {p.text}
                    </p> :
                    p.mode === "code"?
                    <p key={key} className={"code-text code-text-normal"}>
                      {p.text}
                    </p> :
                    <a key={key} href={p.text} className="link-text">
                      {p.text}
                    </a>
                  )
                }
              </section>
            )
          }
        </article>
        <aside>
          <h2 className="header3">Índice</h2>
          {
            data.body.section.map((section, key) => 
              <a 
                key={key}
                href={`#${section.title}${key}`} 
                className="index-text"
              >
                {section.title}
              </a>
            )
          }
        </aside>
      </main>
    </div>
  )
}

export default Post