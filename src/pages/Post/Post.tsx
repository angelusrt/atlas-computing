import { compiler } from "markdown-to-jsx"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import Link from "../../components/Link/Link"
import { IndexType } from "../../utils/types"
import { header } from "../../utils/utils"
import "./Post.css"

type PostType = {
  language: string,
  index: IndexType[] | null,
  setIndex: (index: IndexType[]) => void,
}

type DataType = {
  id: number,
  date: string,
  devs: {name: string, description: string}[],
  contents: {title: string, markdown: string}[],
  tags: {name: string}[]
}

function Post(prop: PostType) {
  const{language, index, setIndex} = prop

  const [data, setData] = useState<DataType>()
  const [markdown, setMarkdown] = useState<JSX.Element>()
  
  const mdRef = useRef<HTMLDivElement>(null!)
  const indexRef = useRef<HTMLDivElement>(null!)
  
  const location = useLocation().pathname
  
  const getPost = async () => {
    const url = `${process.env.REACT_APP_HOST}/api/post/${language}/${location.substring(6)}`

    await fetch(url, header)
      .then(res => res.json())
      .then((post: DataType[]) => {
        setData(post[0])

        const md = compiler(post[0].contents[0].markdown)
        setMarkdown(md)

        const index: IndexType[] = md.props.children
        .map((e: any): IndexType => {
          return {id: e.props.id, text: e.props.children[0]}
        }).filter((e: IndexType) => e.id != undefined)
        setIndex(index)
    }).catch(err => console.log(err))
  }
  
  useEffect(() => {getPost()},[location])

  return (
    <div className="post">
      {data && 
        <header>
          <div>
            {data.tags.map((e, i) => 
              <Link name={e.name} key={i} link={`#${e.name}`} isSelf/>
            )}
          </div>
          <h1>{data.contents[0].title}</h1>
          <h4>{new Date(data.date).toLocaleDateString('en-GB')}</h4>
        </header>
      }
      {data && markdown &&
        <main>
          <article>
            <div ref={mdRef}>{markdown}</div>
          </article>
          <aside>
            <section className="post-aside-actor">
              <h3>Autor:</h3>
              <h2>{data.devs[0].name}</h2>
              <h3>{data.devs[0].description}</h3>
            </section>
            <section className="post-aside-index">
              <h3>Índice:</h3>
              <div ref={indexRef}>
                {index && index.map((e, i) => 
                  <Link name={e.text} key={i} link={`#${e.id}`} isSelf/>
                )}
              </div>
            </section>
          </aside>
        </main> 
      }
    </div>
  )
}

export default Post