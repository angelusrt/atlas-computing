import { compiler } from "markdown-to-jsx"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import Link from "../../components/Link/Link"
import { DivRef, IndexType } from "../../utils/types"
import { header, host } from "../../utils/utils"
import "./Post.css"

type PostType = {
  language: string,
  setIndex: (index: IndexType[]) => void,
}

type PostDataType = {
  id: number,
  date: string,
  devs: {name: string, description: string}[],
  contents: {title: string, markdown: string}[],
  tags: {name: string, id: number}[]
}

function Post(prop: PostType) {
  const{language, setIndex } = prop

  const [postHeader, setPostHeader] = useState<JSX.Element>()
  const [postMain, setPostMain] = useState<JSX.Element>()
  
  const markdownRef = useRef<HTMLDivElement>(null!)
  const indexRef = useRef<HTMLDivElement>(null!)
  
  const location = useLocation().pathname
  
  const getPost = async () => {
    const url = `${host}/api/post/${language}/${location.substring(6)}`

    await fetch(url, header)
      .then(res => res.json())
      .then(async (post: PostDataType[]) => {
        const {date, contents, devs, id, tags} = post[0]

        setPostHeader(
          <PostHeader 
            date={date}
            title={contents[0].title}
            tags={tags}
          />
        )

        const markdown = compiler(post[0].contents[0].markdown)

        const index: IndexType[] = markdown.props.children
          .map((e: any): IndexType => {return {id: e.props.id, text: e.props.children[0]}})
          .filter((e: IndexType) => e.id != undefined)

        setIndex(index)

        setPostMain(
          <PostMain
            indexRef={indexRef}
            markdownRef={markdownRef}
            description={post[0].devs[0].description}
            name={post[0].devs[0].name}
            markdown={markdown}
            index={index}
          />
        )
    })
  }
  
  useEffect(() => {getPost()},[location])

  return (
    <div className="post">
      {postHeader}
      {postMain}
    </div>
  )
}

type PostHeaderType = {
  tags: {name: string}[],
  title: string,
  date: string,
}

const PostHeader = (prop: PostHeaderType) => {
  const { date, tags, title } = prop
  
  return (
    <header>
      <div>
        {tags.map((e, i) => 
          <Link name={e.name} key={i} link={`#${e.name}`} isSelf/>
        )}
      </div>
      <h1>{title}</h1>
      <h4>{new Date(date).toLocaleDateString('en-GB')}</h4>
    </header>
  )
}

type PostMainType = {
  markdownRef: DivRef,
  indexRef: DivRef,
  markdown: any,
  name: string,
  description: string,
  index: IndexType[],
}

const PostMain = (prop: PostMainType) => {
  const {markdownRef, indexRef, description, index, markdown, name} = prop

  return (
    <main>
      <article>
        <div ref={markdownRef}>{markdown}</div>
      </article>
      <aside>
        <section className="post-aside-actor">
          <h3>Autor:</h3>
          <h2>{name}</h2>
          <h3>{description}</h3>
        </section>
        <section className="post-aside-index">
          <h3>Índice:</h3>
          <div ref={indexRef}>
            {index.map((e, i) => 
              <Link name={e.text} key={i} link={`#${e.id}`} isSelf/>
            )}
          </div>
        </section>
      </aside>
    </main>
  )
}

export default Post