import { compiler } from "markdown-to-jsx"
import { ReactNode } from "react"
import Link from "../../../components/Link/Link"
import { IndexType } from "../../../utils/types"
import { header } from "../../../utils/utils"
import "./Post.css"

type DataType = {
  id: number,
  date: string,
  devs: {name: string, description: string}[],
  contents: {title: string, markdown: string}[],
  tags: {name: string}[]
}

type PostType = {
  data: DataType, 
  markdown: ReactNode, 
  index: IndexType[]
}

const getPost = async (language: string, id: string) => { 
  const url = `${process.env.NEXT_PUBLIC_HOST}/api/post/${language}/${id}`
  
  const data: PostType = {data: null!, markdown: '', index: null!}

  await fetch(url, header)
    .then(res => res.json())
    .then((post: DataType[]) => {
      data.data = post[0]

      const md = compiler(post[0].contents[0].markdown)
      data.markdown = md

      const index: IndexType[] = md.props.children
      .map((e: any): IndexType => {
        return {id: e.props.id, text: e.props.children[0]}
      }).filter((e: IndexType) => e.id != undefined)
      data.index = index
  }).catch(err => console.log(err))

  return data
}

const Post = async (prop: {params: {id: string}}) => {
  const {data, markdown, index} = await getPost("pt-br", prop.params.id)

  return (
    <div className="post">
      {data && data.tags && data.contents[0] && data.date && 
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
      {data && data.devs[0] && markdown &&
        <main>
          <article>
            <div>{markdown}</div>
          </article>
          <aside>
            <section className="post-aside-actor">
              <h3>Autor:</h3>
              <h2>{data.devs[0].name}</h2>
              <h3>{data.devs[0].description}</h3>
            </section>
            <section className="post-aside-index">
              <h3>Índice:</h3>
              <div id="index-wrapper">
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