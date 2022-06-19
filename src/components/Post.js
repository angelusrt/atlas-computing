import { Link, useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"

function Post(props) {
  const[data, setData] = useState()
  const[resolved, setResolved] = useState(false)
  let path = useLocation().pathname
  
  const onGet = async () => {
    return await fetch(`http://${props.host}/api${path}`, props.header)
    .then(res => res.json())
    .then(data => {
      setResolved(false)
      setData(data)
      setResolved(true)
      props.setIndex(data.body.section)
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {props.setPath(path)},[path])
  useEffect(() => {onGet()},[path])
  useEffect(() => {window.scroll({top:0, behavior: "smooth"})},[path])

  return (
    resolved && 
    <div className="post">
      <header className="wrapper">
        <h4>
          {
            data.date.slice(8, 10) + " " + 
            data.date.slice(5, 7) + " " +
            data.date.slice(0, 4)
          }
        </h4>
        <h1>{data.title}</h1>
        <span>
          {data.tags.map((tag, key) =>   
            <a key={key}>{`#${tag}`}</a>
          )}
        </span>
        <aside className="wrapper">
          <h2>{data.authorName}</h2>
          <h3>{data.authorDescription}</h3>
        </aside>
      </header>
      <main>
        <article>
          {
            props.postPos !== 0 && 
            props.postData[props.postPos - 1] !== undefined &&
            <section className="post-link-section last-post-link-section">
              <h3>Artigo anterior:</h3>
              <Link 
                to={`/post/${props.postData[props.postPos - 1]._id}`}
                onClick={() => props.setPostPos(props.postPos - 1)}
              >
                <h2>{props.postData[props.postPos - 1].title}</h2>
              </Link>
            </section>
          }
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
                    </React.Fragment>
                  )
                }
              </section>
            )
          }
          {
            props.postData[props.postPos + 1] !== undefined && 
            props.postPos !== props.postData.length - 1 &&
            <section className="post-link-section">
              <h3>Artigo posterior:</h3>
              <Link 
                to={`/post/${props.postData[props.postPos + 1]._id}`}
                onClick={() => props.setPostPos(props.postPos + 1)}
              >
                <h2>{props.postData[props.postPos + 1].title}</h2>
              </Link>
            </section>
          }
        </article>
        <aside>
          <section>
            <h3>Autor:</h3>
            <h2>{data.authorName}</h2>
            <h3>{data.authorDescription}</h3>
          </section>
          {
            props.postPos !== 0 && 
            props.postData[props.postPos - 1] !== undefined &&
            <section className="post-link-section">
              <h3>Artigo anterior:</h3>
              <Link 
                to={`/post/${props.postData[props.postPos - 1]._id}`}
                onClick={() => props.setPostPos(props.postPos - 1)}
              >
                <h2>{props.postData[props.postPos - 1].title}</h2>
              </Link>
            </section>
          }
          <section>
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
          </section>
        </aside>
      </main>
    </div>
  )
}

export default Post