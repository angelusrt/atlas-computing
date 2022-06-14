import { useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"

function Post(props) {
  const[data, setData] = useState()
  const[resolved, setResolved] = useState(false)
  const[path] = useState(useLocation().pathname)
  
  const onGet = async () => {
    return await fetch(`http://${props.host}/api${path}`, props.header)
    .then(res => res.json())
    .then(data => {
      setData(data)
      setResolved(true)
      props.setIndex(data.body.section)
      props.setAuthor({
        authorName: data.authorName,
        authorDescription: data.authorDescription
      })
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
            <a key={key}>{`#${tag}`}</a>
          )}
        </span>
        <h2>{data.title}</h2>
        <aside className="wrapper">
          <h2>{data.authorName}</h2>
          <h3>{data.authorDescription}</h3>
        </aside>
      </header>
      <main>
        <article>
          {
            data.body.section.map((section, key) => 
              <section key={key}>
                <h2 id={`${section.title}${key}`}>
                  {section.title}
                </h2>
                {
                  section.paragraphs.map((p, key) => 
                    <React.Fragment key={key}>
                      {
                        p.image !== undefined &&
                        p.image.map((img, key) => 
                          <img 
                            key={`a${key}`}
                            src={`http://${props.host}/api/image/${img}`} 
                            alt="..."
                          />
                        )
                      }
                      {
                        p.mode === "normal"?
                        <p key={`b${key}`}>{p.text}</p> :
                        p.mode === "code"?
                        <p 
                          key={`b${key}`} 
                          className={"code-text code-text-normal"}
                        >
                          {p.text}
                        </p> :
                        <a key={`b${key}`} href={p.text}>{p.text}</a>
                      }
                    </React.Fragment>
                  )
                }
              </section>
            )
          }
        </article>
        <aside>
          <h2>Índice</h2>
          {
            data.body.section.map((section, key) => 
              <a 
                key={key}
                href={`#${section.title}${key}`} 
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